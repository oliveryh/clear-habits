import sqlalchemy
from dotenv import load_dotenv
from fasthtml.common import *
from sqlmodel import Session, create_engine, select

from models import Entries, Tasks, Projects, Categories
from alpine_assets import alpine_scripts, get_dynamic_dropdown

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
SUB_PATH = os.getenv("SUB_PATH")

if SUB_PATH is None:
    raise ValueError("SUB_PATH is not set")


def get_path(original_path: str) -> str:
    if SUB_PATH == "":
        return original_path
    return f"/{SUB_PATH}{original_path}"


engine = create_engine(DB_URL)

global stored_entries


def entries(category_id=None):
    with Session(engine) as session:
        entries = session.exec(
            select(Entries)
            .options(
                sqlalchemy.orm.joinedload(Entries.task)
                .joinedload(Tasks.project)
                .joinedload(Projects.category)
            )
            .order_by(Entries.id)
            .where(Entries.person_id == CHOSEN_USER_ID)
            .where(Entries.date == str(datetime.now().date()))
        ).all()
        if category_id:
            return {
                entry.id: entry
                for entry in entries
                if entry.task.project.category.id == category_id
            }
        return {entry.id: entry for entry in entries}


def categories():
    with Session(engine) as session:
        return {
            project.id: project
            for project in session.exec(
                select(Categories)
                .order_by(Categories.description)
                .where(Categories.person_id == CHOSEN_USER_ID)
            ).all()
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
            .options(
                sqlalchemy.orm.joinedload(Entries.task)
                .joinedload(Tasks.project)
                .joinedload(Projects.category)
            )
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
            .options(
                sqlalchemy.orm.joinedload(Entries.task)
                .joinedload(Tasks.project)
                .joinedload(Projects.category)
            )
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
            Div(
                Div(
                    Ul(
                        Li(
                            entry.task.project.category.description,
                        ),
                        Li(
                            entry.task.project.description,
                        ),
                    ),
                    cls="breadcrumbs",
                ),
                cls="badge",
            ),
            Div(entry.task.description, cls="font-bold"),
            Div(entry.description, cls="text-sm"),
            Div(
                Form(
                    Button(
                        I(data_lucide="play")
                        if not entry.timer_active
                        else I(data_lucide="pause"),
                        entry.timer_summary,
                        cls="btn btn-sm",
                    ),
                    hx_put=get_path(f"/entries/toggle-timer/{entry.id}"),
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
                    hx_put=get_path(f"/entries/toggle-completition/{entry.id}"),
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

@rt("/entries")
async def post(filter_category: int):
    return Div(
        *[
            entry_component(entry)
            for _, entry in entries(category_id=filter_category).items()
        ],
        id="entries",
        cls="grid grid-cols-1 gap-4 max-w-lg mx-auto mb-4",
    )

@rt("/")
def get():
    navbar = Div(
        A("ClearHabits", cls="btn btn-ghost text-xl"),
        cls="navbar bg-base-100 ",
    )
    dropdown = Div(
        Form(
            Select(
                *(
                    [Option("All", value="")]
                    + [
                        Option(category.description, value=category.id)
                        for category in categories().values()
                    ]
                ),
                id="filter_category",
                cls="select select-bordered w-full max-w-xs",
                hx_post=get_path("/entries"),
                hx_trigger="change",
                hx_target="#entries",
                hx_swap="outerHTML",
            ),
            cls="grid grid-cols-1 gap-4 max-w-lg mx-auto mb-4",
        ),
    )
    # Altenative Alpine.js dropdown that doesn't work
    dropdown_section = get_dynamic_dropdown(
        [
            {"label": category.description, "value": category.id}
            for category in categories().values()
        ]
    )
    todolist = Div(
        *[entry_component(entry) for _, entry in entries().items()],
        cls="grid grid-cols-1 gap-4 max-w-lg mx-auto mb-4",
        id="entries",
    )
    contents = Main(navbar, dropdown, todolist)
    icon_script = Script(
        """
        lucide.createIcons();
        document.addEventListener('htmx:afterRequest', function(evt) {
            lucide.createIcons();
        });
        """
    )
    return Title("FastHTML"), contents, icon_script
