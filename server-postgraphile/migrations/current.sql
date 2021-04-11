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
    create_at timestamp default now()
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
    create_at timestamptz NOT NULL DEFAULT now(),
    person_id int not null default current_setting('jwt.claims.person_id', true)::integer
        references app_public.person on delete cascade,
    category_id int not null
        references app_public.categories on delete cascade
    constraint person_owns_category check (owns_category(category_id))
);

comment on table app_public.projects is E'@omit create';

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
    create_at timestamptz NOT NULL DEFAULT now(),
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

grant app_anonymous to app_postgraphile;
grant app_person to app_postgraphile;
grant usage on schema app_public to app_anonymous;
grant usage on schema app_public to app_person;


grant select on table app_public.person to app_person;

grant select, insert, update on table app_public.categories to app_person;
grant usage on sequence app_public.categories_id_seq to app_person;

grant select, insert, update on table app_public.projects to app_person;
grant usage on sequence app_public.projects_id_seq to app_person;

grant select, insert, update on table app_public.tasks to app_person;
grant usage on sequence app_public.tasks_id_seq to app_person;

ALTER TABLE app_public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY manage_own_categories ON app_public.categories FOR ALL USING (person_id = app_public.current_user_id());
CREATE POLICY manage_own_projects ON app_public.projects FOR ALL USING (person_id = app_public.current_user_id());
CREATE POLICY manage_own_tasks ON app_public.tasks FOR ALL USING (person_id = app_public.current_user_id());