"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import functools
import os
import time
from datetime import date

import jwt
import reflex as rx
import sqlalchemy
from dotenv import load_dotenv

from clearhabits.models import Entries

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")


class Auth(rx.State):
    """
    Stores the JWT token in the local storage and provides methods to check the password and set the token.
    """

    form_data: dict = {}
    id_token_json: str = rx.LocalStorage()

    def check_password(self, data: dict) -> None:
        """
        Takes a dictionary in the form of {"email": str, "password": str} and then attempts to sign in.

        On a successful sign in, the JWT token is stored in the local storage.
        """
        with rx.session() as session:
            jwt_response = session.exec(
                sqlalchemy.func.app_public.sign_in(
                    data["email"],
                    data["password"],
                )
            ).first()
            jwt_string = jwt_response[0]
            if not jwt_string:
                return rx.toast("Invalid credentials")
            _, person_id, expiry = (
                jwt_string.replace(")", "").replace("(", "").split(",")
            )
            person_id = int(person_id)
            expiry = int(expiry)
            self.set_token(person_id, expiry)
            return rx.redirect("/")

    def set_token(self, person_id: int, expiry: int) -> None:
        """Sets the JWT token in the local storage."""
        self.id_token_json = jwt.encode(
            {
                "person_id": person_id,
                "exp": expiry,
            },
            JWT_SECRET,
            algorithm="HS256",
        )

    @rx.var(cache=True)
    def tokeninfo(self) -> dict:
        if not self.id_token_json:
            return {}
        return jwt.decode(self.id_token_json, JWT_SECRET, algorithms=["HS256"])

    @rx.var
    def token_is_valid(self) -> bool:
        try:
            return bool(
                self.tokeninfo and int(self.tokeninfo.get("exp", 0)) > time.time()
            )
        except Exception:
            return False



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
