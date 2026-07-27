-- Seeding Data in Users
INSERT INTO users
(first_name, last_name, email, password_hash, role, phone_number)
VALUES
('Sarah', 'Ali', 'sarah@nexaudit.com', 'hashed_password', 'Audit Manager', '03001234567'),
('Ahmed', 'Khan', 'ahmed@nexaudit.com', 'hashed_password', 'Auditor', '03007654321');

INSERT INTO clients
(company_name, email, location, phone_number, industry)
VALUES
(
'ABC Manufacturing Ltd',
'contact@abc.com',
'Lahore',
'03001112222',
'Manufacturing'
);

INSERT INTO audit_templates
(name, description, audit_type, version)
VALUES
(
'Financial Statement Audit',
'Standard financial audit process',
'Financial',
1
);

INSERT INTO template_tasks
(template_id, title, description, priority, order_number)
VALUES
(
1,
'Verify Cash',
'Review bank statements and cash records',
'High',
1
),
(
1,
'Verify Inventory',
'Check inventory records',
'Medium',
2
);

INSERT INTO audits
(
client_id,
template_id,
manager_id,
audit_year,
audit_type,
start_date,
due_date,
priority,
description
)
VALUES
(
1,
1,
1,
2026,
'Financial',
'2026-08-01',
'2026-09-01',
'High',
'Annual financial audit'
);


INSERT INTO tasks
(
audit_id,
template_task_id,
title,
description,
assigned_auditor_id,
priority,
status,
start_date,
due_date
)
VALUES
(
1,
1,
'Verify Cash',
'Review bank statements and cash records',
2,
'High',
'Not Started',
'2026-08-01',
'2026-08-10'
),
(
1,
2,
'Verify Inventory',
'Check inventory records',
2,
'Medium',
'Not Started',
'2026-08-01',
'2026-08-15'
);