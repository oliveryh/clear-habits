--! Previous: sha1:41076200262081a6bf4bfc9e5a0810cfd14238be
--! Hash: sha1:89d947ca441d7135deb6fd8df83de9a4566e478d

-- Enter migration here
ALTER TABLE app_public.projects
ADD COLUMN IF NOT EXISTS target_min_time_per_week int,
ADD COLUMN IF NOT EXISTS target_max_time_per_week int;
ALTER TABLE app_public.projects DROP CONSTRAINT IF EXISTS max_greater_than_min;
ALTER TABLE app_public.projects ADD CONSTRAINT max_greater_than_min CHECK(target_max_time_per_week >= target_min_time_per_week)
