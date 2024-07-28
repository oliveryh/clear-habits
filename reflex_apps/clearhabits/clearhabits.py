"""Welcome to Reflex! This file outlines the steps to create a basic app."""

from datetime import date

import reflex as rx
import sqlalchemy

from clearhabits.models import Entries


class QueryEntries(rx.State):
    entries: list[Entries] = []

    def get_entries(self) -> None:
        # today in the form of "YYYY-MM-DD"
        today = date.today().isoformat()
        with rx.session() as session:
            self.entries = session.exec(
                Entries.select()
                .options(sqlalchemy.orm.selectinload(Entries.task))
                .where(Entries.date == today)
            ).all()


def render_entry(entry: Entries) -> rx.Component:
    return rx.card(
        rx.text(entry.task.description, font_weight="bold"),
        rx.text(entry.description),
        rx.text(entry.date),
    )


@rx.page(on_load=QueryEntries.get_entries())
def index() -> rx.Component:
    return rx.container(
        rx.color_mode.button(position="top-right"),
        rx.heading("ClearHabits", size="5", margin_bottom="10px"),
        rx.grid(
            rx.foreach(QueryEntries.entries, lambda entry: render_entry(entry)),
            spacing="5",
        ),
    )


app = rx.App()
app.add_page(index)
