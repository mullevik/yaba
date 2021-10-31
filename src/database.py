import os
import sqlite3
from typing import List
from dataclasses import asdict, dataclass
import datetime


CREATE_SCRIPT = """
CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    timestamp TIMESTAMP,
    description TEXT, 
    amount INTEGER
);
CREATE TABLE IF NOT EXISTS labels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
);
CREATE TABLE IF NOT EXISTS transactions_labels (
    transaction_id INTEGER REFERENCES transactions(id),
    label_id INTEGER REFERENCES labels(id),
    PRIMARY KEY (transaction_id, label_id)
);
"""

DUMMY_TRANSACTION_ITEMS = [
    (datetime.datetime.now(), "first", 100),
    (datetime.datetime.now(), "second", 100),
    (datetime.datetime.now(), "third", 50),
    (datetime.datetime.now(), "fourth", -120),
    (datetime.datetime.now(), "fifth", -100),
]

DUMMY_LABEL_ITEMS = [
    ("one",),
    ("two",),
    ("three",)
]

DUMMY_TRANSACTION_LABEL_ITEMS = [
    (1, 1),
    (1, 2),
    (2, 2)
]

@dataclass
class Transaction:
    id: int
    timestamp: datetime.datetime
    description: str
    amount: int


@dataclass
class Label:
    id: int
    name: str


@dataclass
class NewTransaction:
    timestamp: datetime.datetime
    description: str
    amount: int


class Database:

    connection: sqlite3.Connection

    @staticmethod
    def _connect(db_file_path: str) -> sqlite3.Connection:
        connection = sqlite3.connect(db_file_path, detect_types=sqlite3.PARSE_DECLTYPES | sqlite3.PARSE_COLNAMES)
        with connection as conn:
            cursor = conn.cursor()
            cursor.executescript(CREATE_SCRIPT)
        return connection

    def _fill_with_something_if_empty(self):

        if self.get_transactions():
            return

        with self.connection as conn:
            cursor = conn.cursor()
            cursor.executemany("INSERT INTO transactions(timestamp, description, amount) VALUES (?,?,?)", DUMMY_TRANSACTION_ITEMS)
            cursor.executemany("INSERT INTO labels(name) VALUES (?)", DUMMY_LABEL_ITEMS)
            cursor.executemany("INSERT INTO transactions_labels(transaction_id, label_id) VALUES (?,?)", DUMMY_TRANSACTION_LABEL_ITEMS)            
            conn.commit()

    def __init__(self) -> None:

        app_path = os.path.dirname(os.path.abspath(__file__))
        database_file_path = os.path.join(app_path, 'transactions.db')

        self.connection = self._connect(database_file_path)
        self._fill_with_something_if_empty()

    def get_transactions(self) -> List[Transaction]:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM transactions ORDER BY timestamp DESC")
            results = cursor.fetchall()
            return [Transaction(*result) for result in results]
    
    def get_labels(self) -> List[Label]:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM labels")
            results = cursor.fetchall()
            return [Label(*result) for result in results]
    
    def get_labels_for_transaction(self, transaction: Transaction) -> List[Label]:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT labels.id, labels.name FROM labels LEFT JOIN transactions_labels tl ON labels.id = tl.label_id WHERE tl.transaction_id = ?", (transaction.id,))
            results = cursor.fetchall()
            return [Label(*result) for result in results]

    def add_transaction(self, transaction: NewTransaction) -> None:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO transactions(timestamp, description, amount) VALUES (?, ?,?)", tuple(asdict(transaction).values()))
            conn.commit()