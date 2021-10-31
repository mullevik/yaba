import dataclasses
import datetime
from typing import cast
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.recycleview import RecycleView
from kivy.uix.popup import Popup

from database import Database, NewTransaction

class TransactionHistory(RecycleView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.update()


    def update(self) -> None:
        app = cast(MainApp, App.get_running_app())
        self.data = [{"text": str(dataclasses.asdict(t))} for t in app.database.get_transactions()]


class YetAnotherBudgetApp(BoxLayout):
    pass

class NewTransactionPopup(Popup):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    
    def on_add_item(self) -> None:
        app = cast(MainApp, App.get_running_app())

        amount = self.ids.amount.text
        description = self.ids.description.text

        app.database.add_transaction(NewTransaction(datetime.datetime.now(), description, amount))

        history: TransactionHistory = app.root.ids.history
        history.update()

        super().dismiss()  # close popup




class MainApp(App):

    database: Database

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.database = Database()


    def build(self):
        return YetAnotherBudgetApp()


if __name__ == '__main__':
    MainApp().run()
