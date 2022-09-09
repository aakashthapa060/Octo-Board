CREATE TABLE projects (
	project_id UUID NOT NULL PRIMARY KEY,
	project_name VARCHAR(100) NOT NULL,
	project_description VARCHAR(500),
	project_status VARCHAR(2) NOT NULL,
	project_created DATE NOT NULL DEFAULT CURRENT_DATE,
	superuser_uuid UUID REFERENCES users(user_id)
)

INSERT INTO projects (project_id, project_name, project_status, superuser_uuid)
VALUES (uuid_generate_v4(), 'Project Management System', 'NS', '2553f58b-4ddf-4184-be18-1a0f204fa365');


ALTER TABLE projects ADD CONSTRAINT project_status_constraint CHECK (project_status = 'NS' OR project_status = 'OG' OR project_status = 'DN');