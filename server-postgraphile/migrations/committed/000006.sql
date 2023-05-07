--! Previous: sha1:c3328f267398c856acbb61b964c50a6c408d80d9
--! Hash: sha1:41076200262081a6bf4bfc9e5a0810cfd14238be

-- Enter migration here
grant select, insert, update, delete on table app_public.categories to app_person;
