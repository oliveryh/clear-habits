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


def login() -> rx.Component:
    def form_field(label: str, placeholder: str, type: str, name: str) -> rx.Component:
        return rx.form.field(
            rx.flex(
                rx.form.label(label),
                rx.form.control(
                    rx.input(placeholder=placeholder, type=type),
                    as_child=True,
                ),
                direction="column",
                spacing="1",
            ),
            name=name,
            width="100%",
        )

    return rx.card(
        rx.flex(
            rx.hstack(
                rx.badge(
                    rx.icon(tag="mail-plus", size=32),
                    color_scheme="blue",
                    radius="full",
                    padding="0.65rem",
                ),
                rx.vstack(
                    rx.heading(
                        "Login",
                        size="4",
                        weight="bold",
                    ),
                    rx.text(
                        "Enter your credentials to use the app",
                        size="2",
                    ),
                    spacing="1",
                    height="100%",
                ),
                height="100%",
                spacing="4",
                align_items="center",
                width="100%",
            ),
            rx.form.root(
                rx.flex(
                    rx.flex(
                        form_field(
                            "Email",
                            "user@reflex.dev",
                            "email",
                            "email",
                        ),
                        form_field("Password", "Password", "password", "password"),
                        spacing="3",
                        flex_direction=[
                            "column",
                            "row",
                            "row",
                        ],
                    ),
                    rx.form.submit(
                        rx.button("Submit"),
                        as_child=True,
                    ),
                    direction="column",
                    spacing="2",
                    width="100%",
                ),
                on_submit=lambda form_data: Auth.check_password(form_data),
                reset_on_submit=False,
            ),
            width="100%",
            direction="column",
            spacing="4",
        ),
        size="3",
    )


def require_auth(page) -> rx.Component:
    @functools.wraps(page)
    def _auth_wrapper() -> rx.Component:
        return rx.cond(
            Auth.is_hydrated,
            rx.cond(Auth.token_is_valid, page(), login()),
            rx.spinner(),
        )

    return _auth_wrapper


@rx.page(on_load=QueryEntries.get_entries())
@require_auth
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
app.add_page(login)
