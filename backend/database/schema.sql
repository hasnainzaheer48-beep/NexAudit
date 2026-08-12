DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS audits;
DROP TABLE IF EXISTS template_tasks;
DROP TABLE IF EXISTS audit_templates;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS users;




CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash TEXT NOT NULL,
	role VARCHAR(20) NOT NULL,
	phone_number VARCHAR(20),
	is_active BOOLEAN DEFAULT TRUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
	id SERIAL PRIMARY KEY,
	company_name VARCHAR(100) NOT NULL,
	email VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	phone_number VARCHAR(20),
	industry VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE audit_templates(
	id SERIAL PRIMARY KEY,
	name varchar(100) not null,
	description varchar(255),
	audit_type varchar(50) not null, 
	version int not null,
	is_active boolean default true, 
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE template_tasks (
    id SERIAL PRIMARY KEY,

    template_id INT REFERENCES audit_templates(id) ON DELETE CASCADE,

    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),

    priority VARCHAR(50) DEFAULT 'Medium' NOT NULL
	CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    order_number INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	UNIQUE (template_id, order_number)
);

CREATE TABLE audits (
	id SERIAL PRIMARY KEY,
	client_id INTEGER NOT NULL REFERENCES clients(id),
	template_id INTEGER NOT NULL REFERENCES audit_templates(id),
	manager_id INTEGER NOT NULL REFERENCES users(id),

	audit_year INT NOT NULL,
	audit_type VARCHAR(50) NOT NULL,

	start_date DATE NOT NULL ,
	due_date DATE NOT NULL,

	priority VARCHAR(30) NOT NULL,
	CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
	status VARCHAR(30) DEFAULT 'Draft' NOT NULL,
	CHECK (status IN('Draft', 'In Progress', 'Finished')),


	description VARCHAR(300) ,

	is_archived BOOLEAN DEFAULT FALSE,
	archived_at TIMESTAMP,
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,

    audit_id INT NOT NULL REFERENCES audits(id),
    template_task_id INT NOT NULL REFERENCES template_tasks(id),

    title VARCHAR(100) NOT NULL,
    description VARCHAR(300),

    assigned_auditor_id INT REFERENCES users(id),

    priority VARCHAR(30) NOT NULL DEFAULT 'Medium',
	CHECK (priority IN ('Low', 'Medium', 'High', 'Critical')),
    status VARCHAR(30) NOT NULL DEFAULT 'Draft',
	CHECK (status IN('Draft', 'In Progress', 'Finished')),

    start_date DATE ,
    due_date DATE ,
    completed_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,

    task_id INT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id),
    
    content VARCHAR(300) not null,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	is_deleted BOOLEAN DEFAULT false,
	deleted_at TIMESTAMP
);

CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    audit_id INT NOT NULL REFERENCES audits(id),
    task_id INT REFERENCES tasks(id),
    uploaded_by INT NOT NULL REFERENCES users(id),
    original_name VARCHAR(255) NOT NULL,
    stored_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(300) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size INT NOT NULL,
    description TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	is_deleted BOOLEAN DEFAULT false,
	deleted_at TIMESTAMP,
	deleted_by INT REFERENCES users(id);
);

CREATE TABLE activity_logs(
    id SERIAL PRIMARY KEY,

    entity_id INT NOT NULL,
	entity_type VARCHAR(100) NOT NULL,
	CHECK (
    entity_type IN (
        'User',
        'Client',
        'Audit Template',
        'Template Task',
        'Audit',
        'Task'
    )),
    changed_by INT NOT NULL REFERENCES users(id),

    action VARCHAR(100) NOT NULL,
	CHECK (action IN('Created','Updated','Deleted','Assigned Auditor','Status Updated','Completed','Archived','Restored', 'Deactivated')),

	old_value JSONB,
	new_value JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);