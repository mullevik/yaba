import os
import sqlite3
from typing import List
from dataclasses import asdict, dataclass
import datetime


CREATE_SCRIPT = "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, timestamp TIMESTAMP, description TEXT, amount INTEGER)"

DUMMY_TRANSACTION_ITEMS = [
    (datetime.datetime.now(), "first", 100),
    (datetime.datetime.now(), "second", 100),
    (datetime.datetime.now(), "third", 50),
    (datetime.datetime.now(), "fourth", -120),
    (datetime.datetime.now(), "fifth", -100),
]

@dataclass
class Transaction:
    id: int
    timestamp: datetime.datetime
    description: str
    amount: int


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
            cursor.execute(CREATE_SCRIPT)
        return connection

    def _fill_with_something_if_empty(self):

        if self.get_transactions():
            return

        with self.connection as conn:
            cursor = conn.cursor()
            cursor.executemany("INSERT INTO transactions(timestamp, description, amount) VALUES (?, ?,?)", DUMMY_TRANSACTION_ITEMS)
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

    def add_transaction(self, transaction: NewTransaction) -> None:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO transactions(timestamp, description, amount) VALUES (?, ?,?)", tuple(asdict(transaction).values()))
            conn.commit()
