--! Previous: -
--! Hash: sha1:a43eff45ef34668865849c004f78929d9cd24092

-- Enter migration here
drop schema if exists app_public cascade;
create schema app_public;

drop schema if exists app_private cascade;
create schema app_private;

drop function if exists app_public.me;
drop function if exists app_public.sign_in;
drop function if exists app_public.sign_up;
drop type if exists app_public.jwt_token;
drop extension "pgcrypto";

drop table if exists app_public.categories;

create table app_public.person (
    id serial primary key,
    username text not null check (char_length(username) < 80),
    created_at timestamp default now()
);

create table app_private.person_account (
    person_id integer primary key references app_public.person(id) on delete cascade,
    email text not null unique check (email ~* '^.+@.+\..+$'),
    password_hash text not null
);

create extension "pgcrypto";

create type app_public.jwt_token as (
    role text,
    person_id integer,
    exp bigint
);

create function app_public.sign_up(
    username text,
    email text,
    password text
) returns app_public.jwt_token as $$
declare
    person app_public.person;
    account app_private.person_account;
begin
     insert into app_public.person (username) values
    (username)
    returning * into person;

     insert into app_private.person_account (person_id, email, password_hash) values
    (person.id, email, crypt(password, gen_salt('bf')));

    select a.* into account
    from app_private.person_account as a
    where a.email = $2;

    if account.password_hash = crypt(password, account.password_hash) then
        return ('app_person', account.person_id, extract(epoch from (now() + interval '2 days')))::app_public.jwt_token;
    else
        return null;
    end if;
end;
$$ language plpgsql strict security definer;

comment on function app_public.sign_up(text, text, text) is 'Registers a single user and creates an account in our forum.';

create function app_public.sign_in(
    email text,
    password text
) returns app_public.jwt_token as $$
declare
    account app_private.person_account;
begin
    select a.* into account
    from app_private.person_account as a
    where a.email = $1;

    if account.password_hash = crypt(password, account.password_hash) then
        return ('app_person', account.person_id, extract(epoch from (now() + interval '2 days')))::app_public.jwt_token;
    else
        return null;
    end if;
end;
$$ language plpgsql strict security definer;

comment on function app_public.sign_in(text, text) is 'Creates a JWT jwt_token that will securely identify a person and give them certain permissions. This jwt_token expires in 2 days.';

create function app_public.me() returns app_public.person as $$
    select *
    from app_public.person
    where id = nullif(current_setting('jwt.claims.person_id', true), '')::integer
$$ language sql stable;

comment on function app_public.me() is 'Gets the person who was identified by our JWT.';

CREATE OR REPLACE FUNCTION hex_to_int(hexval varchar) RETURNS integer AS $$
DECLARE
  result  int;
BEGIN
EXECUTE 'SELECT x''' || hexval || '''::int' INTO result;
  RETURN result;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;

create function app_public.hex_to_high_contrast(hex_code text)
RETURNS boolean AS $$
    DECLARE
        long_hex text;
        rgb_r int;
        rgb_g int;
        rgb_b int;
        is_white int;
    BEGIN
        IF (length(hex_code) = 4) THEN
            long_hex := REGEXP_REPLACE(hex_code, '^#?([a-f\d])([a-f\d])([a-f\d])$', '\1\1\2\2\3\3');
        ELSE
            long_hex := hex_code;
        END IF;

        rgb_r := hex_to_int(substring(long_hex from 2 for 2));
        rgb_g := hex_to_int(substring(long_hex from 4 for 2));
        rgb_b := hex_to_int(substring(long_hex from 6 for 2));

        IF (ROUND((rgb_r * 299 + rgb_g * 587 + rgb_b * 114) / 1000) > 125) THEN
            return true;
        ELSE
            return false;
        END IF;
    END
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE FUNCTION app_public.current_user_id() RETURNS INTEGER AS $$
  SELECT NULLIF(current_setting('jwt.claims.person_id', TRUE), '')::INTEGER;
$$ LANGUAGE SQL IMMUTABLE;

create table app_public.categories (
    id serial primary key,
    description text not null CONSTRAINT description_is_not_empty CHECK (description <> ''),
    color text CONSTRAINT color_hex_format check(color ~ '^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$') default '#333',
    color_contrast boolean GENERATED ALWAYS AS (app_public.hex_to_high_contrast(color)) STORED,
    created_at timestamptz NOT NULL DEFAULT now(),
    person_id int not null default current_setting('jwt.claims.person_id', true)::integer
        references app_public.person on delete cascade
);

comment on table app_public.categories is E'@omit create';
comment on column app_public.categories.id is E'@omit update';
comment on column app_public.categories.color_contrast is E'@omit update';
comment on column app_public.categories.created_at is E'@omit update';
comment on column app_public.categories.person_id is E'@omit update';

create function app_public.create_category(
    description text,
    color text
) returns app_public.categories AS $$
INSERT INTO app_public.categories (description, color, person_id)
VALUES (description, color, app_public.current_user_id())
RETURNING *;
$$ language sql volatile set search_path from current;

create or replace function owns_category(int) returns boolean as $$
select exists (
    select 1
    from app_public.categories
    where id = $1
    and person_id = app_public.current_user_id()
);
$$ language sql;

create table app_public.projects (
    id serial primary key,
    description text not null CONSTRAINT description_is_not_empty CHECK (description <> ''),
    created_at timestamptz NOT NULL DEFAULT now(),
    person_id int not null default current_setting('jwt.claims.person_id', true)::integer
        references app_public.person on delete cascade,
    category_id int not null
        references app_public.categories on delete cascade
    constraint person_owns_category check (owns_category(category_id))
);

comment on table app_public.projects is E'@omit create';
comment on column app_public.projects.id is E'@omit update';
comment on column app_public.projects.created_at is E'@omit update';
comment on column app_public.projects.person_id is E'@omit update';

create function app_public.create_project(
    description text,
    category_id int
) returns app_public.projects AS $$
INSERT INTO app_public.projects (description, category_id, person_id)
VALUES (description, category_id, app_public.current_user_id())
RETURNING *;
$$ language sql volatile set search_path from current;

create or replace function owns_project(int) returns boolean as $$
begin
    if $1 IS null then
        return true;
    else
        return exists (
            select 1
            from app_public.projects
            where id = $1
            and person_id = app_public.current_user_id()
        );
    end if;
end;
$$ language plpgsql;

create table app_public.tasks (
    id serial primary key,
    description text not null CONSTRAINT description_is_not_empty CHECK (description <> ''),
    complete boolean not null default false,
    created_at timestamptz NOT NULL DEFAULT now(),
    person_id int not null default current_setting('jwt.claims.person_id', true)::integer
        references app_public.person on delete cascade,
    project_id int
        references app_public.projects on delete cascade
    constraint person_owns_project check (owns_project(project_id))
);

comment on table app_public.tasks is E'@omit create';

create function app_public.create_task(
    description text,
    project_id int
) returns app_public.tasks AS $$
INSERT INTO app_public.tasks (description, project_id, person_id)
VALUES (description, project_id, app_public.current_user_id())
RETURNING *;
$$ language sql volatile set search_path from current;

create or replace function owns_task(int) returns boolean as $$
begin
    if $1 IS null then
        return true;
    else
        return exists (
            select 1
            from app_public.tasks
            where id = $1
            and person_id = app_public.current_user_id()
        );
    end if;
end;
$$ language plpgsql;

create table app_public.entries (
    id serial primary key,
    description text CONSTRAINT description_is_not_empty CHECK (description <> ''),
    complete boolean not null default false,
    created_at timestamptz NOT NULL DEFAULT now(),
    date text not null default 'backlog' CONSTRAINT date_is_not_empty CHECK (date <> ''),
    list_order int default 0,
    timer_started_at timestamptz default NULL,
    timer_estimated_time int NOT NULL default 0,
    timer_tracked_time int NOT NULL default 0,
    timer_active boolean NOT NULL default false,
    person_id int not null default current_setting('jwt.claims.person_id', true)::integer
        references app_public.person on delete cascade,
    task_id int not null
        references app_public.tasks on delete cascade
    constraint person_owns_task check (owns_task(task_id))
);

comment on table app_public.entries is E'@omit create';
comment on column app_public.entries.id is E'@omit update';
comment on column app_public.entries.created_at is E'@omit update';
comment on column app_public.entries.person_id is E'@omit update';
comment on column app_public.entries.timer_active is E'@omit update';
comment on column app_public.entries.timer_started_at is E'@omit update';

create function app_public.create_entry(
    description text,
    task_id int,
    date text default 'backlog',
    timer_estimated_time int default 0,
    timer_tracked_time int default 0
) returns app_public.entries AS $$
INSERT INTO app_public.entries (description, task_id, date, person_id, timer_estimated_time, timer_tracked_time)
VALUES (description, task_id, date, app_public.current_user_id(), timer_estimated_time, timer_tracked_time)
RETURNING *;
$$ language sql volatile set search_path from current;

create function app_public.start_entry(
    id int
) returns app_public.entries AS $$
DECLARE
    entry app_public.entries;
BEGIN
    SELECT a.* INTO entry
    FROM app_public.entries as a
    where a.id = $1;

    if entry IS NULL then
        RAISE EXCEPTION 'You do not have permission to update this entry';
    end if;

    if entry.timer_active = false then
        UPDATE app_public.entries
        SET
            timer_active = true,
            timer_started_at = now()
        WHERE app_public.entries.id = $1
        RETURNING * into entry;
    end if;

    RETURN entry;
END;
$$ language plpgsql;

create function app_public.stop_entry(
    id int
) returns app_public.entries AS $$
DECLARE
    entry app_public.entries;
BEGIN
    SELECT a.* INTO entry
    FROM app_public.entries as a
    where a.id = $1;

    if entry.timer_active = true then
        UPDATE app_public.entries
        SET
            timer_active = false,
            timer_started_at = null,
            timer_tracked_time = EXTRACT(EPOCH FROM (now() - entry.timer_started_at))
        WHERE app_public.entries.id = $1
        RETURNING * into entry;
    end if;

    RETURN entry;
END;
$$ language plpgsql;

create function app_public.complete_entry(
    id int
) returns app_public.entries AS $$
DECLARE
    entry app_public.entries;
    num_task_entries int;
BEGIN

    SELECT a.* INTO entry
    FROM app_public.entries as a
    where a.id = $1;

    if entry IS NULL then
        RAISE EXCEPTION 'You do not have permission to update this entry';
    end if;

    if entry.timer_active = true then
        UPDATE app_public.entries
        SET
            timer_active = false,
            timer_started_at = null,
            timer_tracked_time = EXTRACT(EPOCH FROM (now() - entry.timer_started_at))
        WHERE app_public.entries.id = $1
        RETURNING * into entry;
    end if;

    if ((entry.timer_tracked_time = 0) OR ((entry.timer_tracked_time = null) AND (entry.timer_estimated_time != 0))) then
        UPDATE app_public.entries
        SET
            timer_tracked_time = entry.timer_estimated_time
        WHERE app_public.entries.id = $1
        RETURNING * into entry;
    end if;

    UPDATE app_public.entries
    SET
        complete = true
    WHERE app_public.entries.id = $1
    RETURNING * into entry;

    SELECT COUNT(*) INTO num_task_entries
    FROM app_public.entries as a
    where a.task_id = entry.task_id;

    if num_task_entries = 1 then
        UPDATE app_public.tasks
        SET
            complete = true
        WHERE app_public.tasks.id = entry.task_id;
    end if;

    RETURN entry;
END;
$$ language plpgsql;


create function app_public.restart_entry(
    id int
) returns app_public.entries AS $$
DECLARE
    entry app_public.entries;
BEGIN

    UPDATE app_public.entries
    SET
        complete = false
    WHERE app_public.entries.id = $1
    RETURNING * into entry;

    if entry IS NULL then
        RAISE EXCEPTION 'You do not have permission to update this entry';
    end if;

    UPDATE app_public.tasks
    SET
        complete = false
    WHERE app_public.tasks.id = entry.task_id;

    RETURN entry;
END;
$$ language plpgsql;

create function app_public.create_entry_with_task(
    description text,
    project_id int,
    date text default 'backlog',
    timer_estimated_time int default 0
) returns app_public.entries AS $$
DECLARE
    task app_public.tasks;
    entry app_public.entries;
BEGIN
    INSERT INTO app_public.tasks (description, project_id, person_id)
    VALUES (description, project_id, app_public.current_user_id())
    RETURNING * into task;

    INSERT INTO app_public.entries (date, task_id, person_id, timer_estimated_time)
    VALUES (date, task.id, app_public.current_user_id(), timer_estimated_time)
    RETURNING * into entry;

    RETURN entry;
END;
$$ language plpgsql;

create type app_public.entry_order as (
    id int,
    date text,
    list_order int
);

create function app_public.reorder_entries(
    entry_orders app_public.entry_order[]
) returns app_public.entries[] AS $$
DECLARE
    x app_public.entry_order;
    return_entries app_public.entries[];
    current_entry app_public.entries;
BEGIN
    FOREACH x IN ARRAY $1
    LOOP
        UPDATE app_public.entries
        SET
            list_order = x.list_order,
            date = x.date
        WHERE app_public.entries.id = x.id
        RETURNING * INTO current_entry;
        return_entries := array_append(return_entries, current_entry);
    END LOOP;
    RETURN return_entries;
END;
$$ language plpgsql;

create view app_public.stats as (
    SELECT
        c.id AS category_id,
        c.description AS category_description,
        p.id AS project_id,
        p.description AS project_description,
        t.id AS task_id,
        t.description AS task_description,
        e.id AS entry_id,
        e.description AS entry_description,
        e.date AS entry_date,
        CASE
            WHEN e.date = 'backlog' THEN 'backlog'
            ELSE to_char(TO_DATE(e.date,'YYYY-MM-DD'), 'IYYY-IW')
        END AS entry_week_number,
        e.timer_tracked_time AS entry_timer_tracked_time,
        e.person_id AS person_id
    FROM
        app_public.categories AS c
    LEFT JOIN
        app_public.projects AS p
    ON
        p.category_id = c.id
    LEFT JOIN
        app_public.tasks AS t
    ON
        t.project_id = p.id
    LEFT JOIN
        app_public.entries AS e
    ON
        e.task_id = t.id
    WHERE e.person_id = app_public.current_user_id()
);

grant app_anonymous to app_postgraphile;
grant app_person to app_postgraphile;
grant usage on schema app_public to app_anonymous;
grant usage on schema app_public to app_person;


grant select on table app_public.person to app_person;

grant select, insert, update on table app_public.categories to app_person;
grant usage on sequence app_public.categories_id_seq to app_person;

grant select, insert, update, delete on table app_public.projects to app_person;
grant usage on sequence app_public.projects_id_seq to app_person;

grant select, insert, update on table app_public.tasks to app_person;
grant usage on sequence app_public.tasks_id_seq to app_person;

grant select, insert, update, delete on table app_public.entries to app_person;
grant usage on sequence app_public.entries_id_seq to app_person;

grant select on table app_public.stats to app_person;

ALTER TABLE app_public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_public.entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY manage_own_categories ON app_public.categories FOR ALL USING (person_id = app_public.current_user_id());
CREATE POLICY manage_own_projects ON app_public.projects FOR ALL USING (person_id = app_public.current_user_id());
CREATE POLICY manage_own_tasks ON app_public.tasks FOR ALL USING (person_id = app_public.current_user_id());
CREATE POLICY manage_own_entries ON app_public.entries FOR ALL USING (person_id = app_public.current_user_id());
