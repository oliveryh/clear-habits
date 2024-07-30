import sqlalchemy
import uvicorn
from dotenv import load_dotenv
from fasthtml.common import *
from sqlmodel import Field, Session, SQLModel, create_engine, select, update

from models import Entries, Tasks

load_dotenv()

# import logging

# logging.basicConfig()
# logger = logging.getLogger("sqlalchemy.engine")
# logger.setLevel(logging.DEBUG)


import os

CHOSEN_USER_ID = os.getenv("CHOSEN_USER_ID")

headers = (
    Script(src="https://cdn.tailwindcss.com"),
    Link(
        rel="stylesheet",
        href="https://cdn.jsdelivr.net/npm/daisyui@4.11.1/dist/full.min.css",
    ),
    Script(
        src="https://unpkg.com/lucide@latest",
    ),
)


DB_URL = os.getenv("DB_URL")

engine = create_engine(DB_URL)

global stored_entries


def entries():
    with Session(engine) as session:
        stored_entries = {
            entry.id: entry
            for entry in session.exec(
                select(Entries)
                .options(
                    sqlalchemy.orm.joinedload(Entries.task).joinedload(Tasks.project)
                )
                .order_by(Entries.id)
                .where(Entries.person_id == CHOSEN_USER_ID)
                .where(Entries.date == str(datetime.now().date()))
            ).all()
        }

        return stored_entries


def projects():
    with Session(engine) as session:
        return {
            project.id: project
            for project in session.exec(select(Projects).order_by(Projects.id)).all()
        }


# Note use FastHTMLWithLiveReload in dev
app = FastHTML(hdrs=headers)
rt = app.route


def authenticate_session(session: Session) -> None:
    session.exec(
        sqlalchemy.text(f"set local jwt.claims.person_id to {CHOSEN_USER_ID};")
    )


from datetime import datetime, timezone


def toggle_timer(id):
    with Session(engine) as session:
        authenticate_session(session)
        statement = (
            select(Entries)
            .options(sqlalchemy.orm.joinedload(Entries.task).joinedload(Tasks.project))
            .where(Entries.id == id)
        )
        new_entry = session.exec(statement).one()
        if new_entry.timer_active:
            new_entry.timer_tracked_time = new_entry.timer_tracked_time + int(
                (
                    datetime.now(timezone.utc) - new_entry.timer_started_at
                ).total_seconds()
            )
            new_entry.timer_active = False
            new_entry.timer_started_at = None
        else:
            new_entry.timer_started_at = datetime.now(timezone.utc)
            new_entry.timer_active = True
        session.add(new_entry)
        session.commit()
        session.refresh(new_entry)
    return entry_component(new_entry)


def toggle_complete(id):
    with Session(engine) as session:
        authenticate_session(session)
        statement = (
            select(Entries)
            .options(sqlalchemy.orm.joinedload(Entries.task).joinedload(Tasks.project))
            .where(Entries.id == id)
        )
        new_entry = session.exec(statement).one()
        new_entry.complete = not new_entry.complete
        session.add(new_entry)
        session.commit()
        session.refresh(new_entry)
    return entry_component(new_entry)


def entry_component(entry: Entries):
    return Div(
        Div(
            Div(entry.task.project.description, cls="badge"),
            Div(entry.task.description, cls="font-bold"),
            Div(entry.task.description),
            Div(
                Form(
                    Button(
                        I(data_lucide="play")
                        if not entry.timer_active
                        else I(data_lucide="pause"),
                        entry.timer_summary,
                        cls="btn btn-sm",
                    ),
                    hx_put=f"/entries/toggle-timer/{entry.id}",
                    hx_swap="outerHTML",
                    target_id=f"entry-{entry.id}",
                ),
                Form(
                    Button(
                        I(data_lucide="x")
                        if entry.complete
                        else I(data_lucide="check"),
                        cls="btn btn-sm",
                    ),
                    hx_put=f"/entries/toggle-completition/{entry.id}",
                    hx_swap="outerHTML",
                    target_id=f"entry-{entry.id}",
                ),
                cls="flex flex-row justify-between",
            ),
            cls="card-body p-4",
        ),
        id=f"entry-{entry.id}",
        cls="card bg-neutral shadow-lg",
    )


@rt("/entries/toggle-timer/{id}")
async def put(id: int):
    return toggle_timer(id)


@rt("/entries/toggle-completition/{id}")
async def put(id: int):
    return toggle_complete(id)


@rt("/")
def get():
    navbar = Div(
        A("ClearHabits", cls="btn btn-ghost text-xl"),
        cls="navbar bg-base-100 ",
    )
    todolist = Div(
        *[entry_component(entry) for _, entry in entries().items()],
        cls="grid grid-cols-1 gap-4 max-w-lg mx-auto",
    )
    contents = Main(navbar, todolist)
    icon_script = Script(
        """
        lucide.createIcons();
        document.addEventListener('htmx:afterRequest', function(evt) {
            lucide.createIcons();
        });
        """
    )
    return Title("FastHTML"), contents, icon_script
