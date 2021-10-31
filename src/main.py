import datetime
from typing import Any, List, cast
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.recycleview import RecycleView
from kivy.uix.recycleview.views import RecycleDataViewBehavior
from kivy.uix.popup import Popup

from database import Database, Label, NewTransaction, Transaction

class TransactionHistory(RecycleView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.update()


    def update(self) -> None:
        app = cast(MainApp, App.get_running_app())        

        self.data = [{"data": t} for t in app.database.get_transactions()]


class TransactionItem(RecycleDataViewBehavior, BoxLayout):
    ''' Add selection support to the Label '''

    def refresh_view_attrs(self, rv: RecycleView, index: int, data: Any):
        ''' Catch and handle the view changes '''
        app = cast(MainApp, App.get_running_app())
        
        transaction = cast(Transaction, data["data"])
        self.ids.amount.text = str(transaction.amount)
        self.ids.description.text = transaction.description

        labels = app.database.get_labels_for_transaction(transaction)
        self.ids.labels.text = str([l.name for l in labels])
        return super().refresh_view_attrs(rv, index, data)



class YetAnotherBudgetApp(BoxLayout):
    pass

class NewTransactionPopup(Popup):

    labels: List[Label]

    def __init__(self, **kwargs):
        app = cast(MainApp, App.get_running_app())
        self.labels = app.database.get_labels()
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
