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


create table app_public.categories (
    id serial primary key,
    description text not null,
    color text check(color ~ '^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'),
    created_at timestamptz NOT NULL DEFAULT now(),
    person_id int not null default current_setting('jwt.claims.person_id', true)::integer
        references app_public.person on delete cascade
);

grant app_anonymous to app_postgraphile;
grant app_person to app_postgraphile;
grant usage on schema app_public to app_anonymous;
grant usage on schema app_public to app_person;
grant usage on sequence app_public.categories_id_seq to app_person;

grant select on table app_public.person to app_person;
grant select, insert on table app_public.categories to app_person;