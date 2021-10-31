import os
import sqlite3
from typing import List
from dataclasses import asdict, dataclass


CREATE_SCRIPT = "CREATE TABLE IF NOT EXISTS transactions (id INTEGER PRIMARY KEY AUTOINCREMENT, description TEXT, amount INTEGER)"

DUMMY_TRANSACTION_ITEMS = [
    ("first", 100),
    ("second", 100),
    ("third", 50),
    ("fourth", -120),
    ("fifth", -100),
]

@dataclass
class Transaction:
    id: int
    description: str
    amount: int


@dataclass
class NewTransaction:
    description: str
    amount: int


class Database:

    connection: sqlite3.Connection

    @staticmethod
    def _connect(db_file_path: str) -> sqlite3.Connection:
        connection = sqlite3.connect(db_file_path)
        with connection as conn:
            cursor = conn.cursor()
            cursor.execute(CREATE_SCRIPT)
        return connection

    def _fill_with_something_if_empty(self):

        if self.get_transactions():
            return

        with self.connection as conn:
            cursor = conn.cursor()
            cursor.executemany("INSERT INTO transactions(description, amount) VALUES (?,?)", DUMMY_TRANSACTION_ITEMS)
            conn.commit()

    def __init__(self) -> None:

        app_path = os.path.dirname(os.path.abspath(__file__))
        database_file_path = os.path.join(app_path, 'transactions.db')

        self.connection = self._connect(database_file_path)
        self._fill_with_something_if_empty()

    def get_transactions(self) -> List[Transaction]:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM transactions")
            results = cursor.fetchall()
            return [Transaction(*result) for result in results]

    def add_transaction(self, transaction: NewTransaction) -> None:
        with self.connection as conn:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO transactions(description, amount) VALUES (?,?)", tuple(asdict(transaction).values()))
            conn.commit()
