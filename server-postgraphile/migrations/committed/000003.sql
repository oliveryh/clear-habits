--! Previous: sha1:71dede8fbd68e20fedc30ec568e11b956c02eef7
--! Hash: sha1:c87e0162f00466837923ed881d48f9a1ba28f801

-- Enter migration here
drop view if exists app_public.stats;

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
        e.timer_estimated_time AS entry_timer_estimated_time,
        e.complete AS entry_complete,
        e.created_at AS entry_created_at,
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

grant select on table app_public.stats to app_person;
