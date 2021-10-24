--! Previous: sha1:a43eff45ef34668865849c004f78929d9cd24092
--! Hash: sha1:71dede8fbd68e20fedc30ec568e11b956c02eef7

-- Enter migration here
create or replace function app_public.stop_entry(
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
            timer_tracked_time = EXTRACT(EPOCH FROM (now() - entry.timer_started_at)) + timer_tracked_time
        WHERE app_public.entries.id = $1
        RETURNING * into entry;
    end if;

    RETURN entry;
END;
$$ language plpgsql;
