--! Previous: sha1:c87e0162f00466837923ed881d48f9a1ba28f801
--! Hash: sha1:644bfc96733e0e30edb46c4b78bd40a7469bdc9f

-- Enter migration here
ALTER TABLE app_public.projects
ADD COLUMN IF NOT EXISTS target_days int;
