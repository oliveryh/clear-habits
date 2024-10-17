TRUNCATE app_public.person RESTART IDENTITY CASCADE;

DO $$
DECLARE
	user1 int;
	user1_category int;
	user1_category_2 int;
	user1_project int;
	user1_project_2 int;
	user1_task int;
	user1_entry int;
	user1_entry_two int;
	user1_task_complete int;
	user1_entry_complete int;

	user2 int;
	user2_category int;
	user2_project int;
	user2_task int;
	user2_entry int;
	user2_task_complete int;
	user2_entry_complete int;
BEGIN

	BEGIN
		SELECT a.person_id into user2 FROM app_public.sign_up('user2', 'hello@user2.com', 'password') as a;

		-- -- Log in as User 2
		PERFORM (SELECT * FROM set_config('role', 'app_person', true));
		PERFORM (SELECT * FROM set_config('jwt.claims.person_id', user2::text, true));
		
		INSERT INTO app_public.categories (person_id, description) VALUES (user2, 'Category 1') RETURNING id into user2_category;
		INSERT INTO app_public.projects (person_id, category_id, description) VALUES (user2, user2_category, 'Project 1') RETURNING id into user2_project;
		INSERT INTO app_public.tasks (person_id, project_id, description) VALUES (user2, user2_project, 'Task 1') RETURNING id into user2_task;
		INSERT INTO app_public.entries (person_id, task_id, description) VALUES (user2, user2_task, 'Entry 1') RETURNING id into user2_entry;

	END;

	BEGIN
		SELECT a.person_id into user1 FROM app_public.sign_up('user1', 'hello@user1.com', 'password') as a;

		-- Log in as User 1
		PERFORM (SELECT * FROM set_config('role', 'app_person', true));
		PERFORM (SELECT * FROM set_config('jwt.claims.person_id', user1::text, true));

		INSERT INTO app_public.categories (person_id, description) VALUES (user1, 'Category 1') RETURNING id into user1_category;
		INSERT INTO app_public.categories (person_id, description) VALUES (user1, 'Category 2') RETURNING id into user1_category_2;
		INSERT INTO app_public.projects (person_id, category_id, description) VALUES (user1, user1_category, 'Project 1') RETURNING id into user1_project;
		INSERT INTO app_public.projects (person_id, category_id, description) VALUES (user1, user1_category_2, 'Project 2') RETURNING id into user1_project_2;
		INSERT INTO app_public.tasks (person_id, project_id, description) VALUES (user1, user1_project, 'Task 1') RETURNING id into user1_task;
		INSERT INTO app_public.entries (person_id, task_id, description, timer_estimated_time, date) VALUES (user1, user1_task, 'Entry 1', 3600, '2024-08-01') RETURNING id into user1_entry;
		INSERT INTO app_public.entries (person_id, task_id, description, timer_estimated_time, date) VALUES (user1, user1_task, 'Entry 2', 7200, '2024-08-01') RETURNING id into user1_entry_two;

		INSERT INTO app_public.tasks (person_id, project_id, description) VALUES (user1, user1_project_2, 'Task Complete') RETURNING id into user1_task_complete;
		INSERT INTO app_public.entries (person_id, task_id, description, timer_estimated_time, date) VALUES (user1, user1_task_complete, 'Entry With Estimated Time', 60, '2024-08-01') RETURNING id into user1_entry_complete;

		INSERT INTO app_public.tasks (person_id, project_id, description) VALUES (user1, user1_project, 'Task Complete') RETURNING id into user1_task_complete;
		INSERT INTO app_public.entries (person_id, task_id, description) VALUES (user1, user1_task_complete, 'Entry Complete') RETURNING id into user1_entry_complete;

		INSERT INTO app_public.tasks (person_id, project_id, description, complete) VALUES (user1, user1_project, 'Task Complete', true) RETURNING id into user1_task_complete;
		INSERT INTO app_public.entries (person_id, task_id, description, complete) VALUES (user1, user1_task_complete, 'Entry Complete', true) RETURNING id into user1_entry_complete;

		INSERT INTO app_public.tasks (person_id, project_id, description) VALUES (user1, user1_project, 'Task Complete') RETURNING id into user1_task_complete;
		INSERT INTO app_public.entries (person_id, task_id, description) VALUES (user1, user1_task_complete, 'Entry Complete') RETURNING id into user1_entry_complete;

		INSERT INTO app_public.tasks (person_id, project_id, description) VALUES (user1, user1_project, 'Task Complete') RETURNING id into user1_task_complete;
		INSERT INTO app_public.entries (person_id, task_id, description, timer_started_at, timer_active) VALUES (user1, user1_task_complete, 'Started Entry', now() - interval '1 hour', true) RETURNING id into user1_entry_complete;

	END;

	
	
END;
$$;

