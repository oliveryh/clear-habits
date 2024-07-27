--! Previous: sha1:89d947ca441d7135deb6fd8df83de9a4566e478d
--! Hash: sha1:5c411c4a948e7cb7def21bdcb740c1594c1eb584

-- Enter migration here
drop view if exists app_public.recent_tasks;

create view app_public.recent_tasks as (
    SELECT DISTINCT ON (project_id, description)
        project_id,
        description,
        latest_max_entry_timer_estimated_time
    FROM
        (
            SELECT DISTINCT ON (t.id)
                t.project_id AS project_id,
                t.id AS task_id,
                t.description AS description,
                e.timer_estimated_time AS latest_max_entry_timer_estimated_time,
                e.date AS latest_max_entry_date
            FROM
                app_public.tasks AS t
            JOIN
                app_public.entries AS e
            ON
                e.task_id = t.id
            WHERE
                e.date <> 'backlog'
                AND e.date > to_char(date_trunc('day', NOW() - interval '2 month'), 'YYYY-MM-DD')
                AND e.person_id = app_public.current_user_id()
            ORDER BY
                t.id, e.timer_estimated_time DESC
        ) AS x
    ORDER BY
        project_id, description, latest_max_entry_date DESC
);

grant select on table app_public.recent_tasks to app_person;
