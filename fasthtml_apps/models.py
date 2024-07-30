from datetime import datetime
from typing import List, Optional

from pydantic import computed_field
from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    Computed,
    DateTime,
    ForeignKeyConstraint,
    Integer,
    PrimaryKeyConstraint,
    Table,
    Text,
    text,
)
from sqlalchemy.orm import mapped_column
from sqlmodel import Field, Relationship, SQLModel


class Person(SQLModel, table=True):
    __table_args__ = (
        CheckConstraint("char_length(username) < 80", name="person_username_check"),
        PrimaryKeyConstraint("id", name="person_pkey"),
        {"schema": "app_public"},
    )

    id: Optional[int] = Field(
        default=None, sa_column=mapped_column("id", Integer, primary_key=True)
    )
    username: str = Field(sa_column=mapped_column("username", Text))
    created_at: Optional[datetime] = Field(
        default=None,
        sa_column=mapped_column("created_at", DateTime, server_default=text("now()")),
    )

    categories: List["Categories"] = Relationship(back_populates="person")
    projects: List["Projects"] = Relationship(back_populates="person")
    tasks: List["Tasks"] = Relationship(back_populates="person")
    entries: List["Entries"] = Relationship(back_populates="person")


class Categories(SQLModel, table=True):
    __table_args__ = (
        CheckConstraint(
            "color ~ '^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'::text",
            name="color_hex_format",
        ),
        CheckConstraint("description <> ''::text", name="description_is_not_empty"),
        ForeignKeyConstraint(
            ["person_id"],
            ["app_public.person.id"],
            ondelete="CASCADE",
            name="categories_person_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="categories_pkey"),
        {"comment": "@omit create", "schema": "app_public"},
    )

    id: Optional[int] = Field(
        default=None,
        sa_column=mapped_column(
            "id", Integer, primary_key=True, comment="@omit update"
        ),
    )
    description: str = Field(sa_column=mapped_column("description", Text))
    created_at: datetime = Field(
        sa_column=mapped_column(
            "created_at",
            DateTime(True),
            server_default=text("now()"),
            comment="@omit update",
        )
    )
    person_id: int = Field(
        sa_column=mapped_column(
            "person_id",
            Integer,
            server_default=text(
                "(current_setting('jwt.claims.person_id'::text, true))::integer"
            ),
            comment="@omit update",
        )
    )
    color: Optional[str] = Field(
        default=None,
        sa_column=mapped_column("color", Text, server_default=text("'#333'::text")),
    )
    color_contrast: Optional[bool] = Field(
        default=None,
        sa_column=mapped_column(
            "color_contrast",
            Boolean,
            Computed("app_public.hex_to_high_contrast(color)", persisted=True),
            comment="@omit update",
        ),
    )

    person: Optional["Person"] = Relationship(back_populates="categories")
    projects: List["Projects"] = Relationship(back_populates="category")


class Projects(SQLModel, table=True):
    __table_args__ = (
        CheckConstraint("description <> ''::text", name="description_is_not_empty"),
        CheckConstraint("owns_category(category_id)", name="person_owns_category"),
        CheckConstraint(
            "target_max_time_per_week >= target_min_time_per_week",
            name="max_greater_than_min",
        ),
        ForeignKeyConstraint(
            ["category_id"],
            ["app_public.categories.id"],
            ondelete="CASCADE",
            name="projects_category_id_fkey",
        ),
        ForeignKeyConstraint(
            ["person_id"],
            ["app_public.person.id"],
            ondelete="CASCADE",
            name="projects_person_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="projects_pkey"),
        {"comment": "@omit create", "schema": "app_public"},
    )

    id: Optional[int] = Field(
        default=None,
        sa_column=mapped_column(
            "id", Integer, primary_key=True, comment="@omit update"
        ),
    )
    description: str = Field(sa_column=mapped_column("description", Text))
    created_at: datetime = Field(
        sa_column=mapped_column(
            "created_at",
            DateTime(True),
            server_default=text("now()"),
            comment="@omit update",
        )
    )
    person_id: int = Field(
        sa_column=mapped_column(
            "person_id",
            Integer,
            server_default=text(
                "(current_setting('jwt.claims.person_id'::text, true))::integer"
            ),
            comment="@omit update",
        )
    )
    category_id: int = Field(sa_column=mapped_column("category_id", Integer))
    target_days: Optional[int] = Field(
        default=None, sa_column=mapped_column("target_days", Integer)
    )
    target_min_time_per_week: Optional[int] = Field(
        default=None, sa_column=mapped_column("target_min_time_per_week", Integer)
    )
    target_max_time_per_week: Optional[int] = Field(
        default=None, sa_column=mapped_column("target_max_time_per_week", Integer)
    )

    category: Optional["Categories"] = Relationship(back_populates="projects")
    person: Optional["Person"] = Relationship(back_populates="projects")
    tasks: List["Tasks"] = Relationship(back_populates="project")


class Tasks(SQLModel, table=True):
    __table_args__ = (
        CheckConstraint("description <> ''::text", name="description_is_not_empty"),
        CheckConstraint("owns_project(project_id)", name="person_owns_project"),
        ForeignKeyConstraint(
            ["person_id"],
            ["app_public.person.id"],
            ondelete="CASCADE",
            name="tasks_person_id_fkey",
        ),
        ForeignKeyConstraint(
            ["project_id"],
            ["app_public.projects.id"],
            ondelete="CASCADE",
            name="tasks_project_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="tasks_pkey"),
        {"comment": "@omit create", "schema": "app_public"},
    )

    id: Optional[int] = Field(
        default=None, sa_column=mapped_column("id", Integer, primary_key=True)
    )
    description: str = Field(sa_column=mapped_column("description", Text))
    complete: bool = Field(
        sa_column=mapped_column("complete", Boolean, server_default=text("false"))
    )
    created_at: datetime = Field(
        sa_column=mapped_column(
            "created_at", DateTime(True), server_default=text("now()")
        )
    )
    person_id: int = Field(
        sa_column=mapped_column(
            "person_id",
            Integer,
            server_default=text(
                "(current_setting('jwt.claims.person_id'::text, true))::integer"
            ),
        )
    )
    project_id: Optional[int] = Field(
        default=None, sa_column=mapped_column("project_id", Integer)
    )

    person: Optional["Person"] = Relationship(back_populates="tasks")
    project: Optional["Projects"] = Relationship(back_populates="tasks")
    entries: List["Entries"] = Relationship(back_populates="task")


class Entries(SQLModel, table=True):
    __table_args__ = (
        CheckConstraint("date <> ''::text", name="date_is_not_empty"),
        CheckConstraint("description <> ''::text", name="description_is_not_empty"),
        CheckConstraint("owns_task(task_id)", name="person_owns_task"),
        ForeignKeyConstraint(
            ["person_id"],
            ["app_public.person.id"],
            ondelete="CASCADE",
            name="entries_person_id_fkey",
        ),
        ForeignKeyConstraint(
            ["task_id"],
            ["app_public.tasks.id"],
            ondelete="CASCADE",
            name="entries_task_id_fkey",
        ),
        PrimaryKeyConstraint("id", name="entries_pkey"),
        {"comment": "@omit create", "schema": "app_public"},
    )

    id: Optional[int] = Field(
        default=None,
        sa_column=mapped_column(
            "id", Integer, primary_key=True, comment="@omit update"
        ),
    )
    complete: bool = Field(
        sa_column=mapped_column("complete", Boolean, server_default=text("false"))
    )
    created_at: datetime = Field(
        sa_column=mapped_column(
            "created_at",
            DateTime(True),
            server_default=text("now()"),
            comment="@omit update",
        )
    )
    date: str = Field(
        sa_column=mapped_column("date", Text, server_default=text("'backlog'::text"))
    )
    timer_estimated_time: int = Field(
        sa_column=mapped_column(
            "timer_estimated_time", Integer, server_default=text("0")
        )
    )
    timer_tracked_time: int = Field(
        sa_column=mapped_column("timer_tracked_time", Integer, server_default=text("0"))
    )
    timer_active: bool = Field(
        sa_column=mapped_column(
            "timer_active",
            Boolean,
            server_default=text("false"),
            comment="@omit update",
        )
    )
    person_id: int = Field(
        sa_column=mapped_column(
            "person_id",
            Integer,
            server_default=text(
                "(current_setting('jwt.claims.person_id'::text, true))::integer"
            ),
            comment="@omit update",
        )
    )
    task_id: int = Field(sa_column=mapped_column("task_id", Integer))
    description: Optional[str] = Field(
        default=None, sa_column=mapped_column("description", Text)
    )
    list_order: Optional[int] = Field(
        default=None,
        sa_column=mapped_column("list_order", Integer, server_default=text("0")),
    )
    timer_started_at: Optional[datetime] = Field(
        default=None,
        sa_column=mapped_column(
            "timer_started_at", DateTime(True), comment="@omit update"
        ),
    )

    @computed_field
    @property
    def timer_summary(self) -> str:
        """
        Given the current time stored in seconds in timer_tracked_time and the estimated time in timer_estimated_time,
        return a string summarizing the time spent on the task in the format "HH:MM:SS / HH:MM:SS"
        """
        timer_tracked_time_hhmmss = str(
            datetime.utcfromtimestamp(self.timer_tracked_time).strftime("%H:%M:%S")
        )
        timer_estimated_time_hhmmss = str(
            datetime.utcfromtimestamp(self.timer_estimated_time).strftime("%H:%M:%S")
        )
        return f"{timer_tracked_time_hhmmss} / {timer_estimated_time_hhmmss}"

    person: Optional["Person"] = Relationship(back_populates="entries")
    task: Optional["Tasks"] = Relationship(back_populates="entries")
