-- USERS
INSERT INTO users
(first_name,last_name,email,password_hash,role,phone_number)
VALUES

('Ahmed','Khan','ahmed@nexaudit.com',
'$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llv5sYx4rGZQZ9QzQ6J3S',
'ADMIN',
'+92-300-1111111'),

('Sara','Ali','sara@nexaudit.com',
'$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llv5sYx4rGZQZ9QzQ6J3S',
'MANAGER',
'+92-300-2222222'),

('Usman','Raza','usman@nexaudit.com',
'$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llv5sYx4rGZQZ9QzQ6J3S',
'AUDITOR',
'+92-300-3333333'),

('Fatima','Noor','fatima@nexaudit.com',
'$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llv5sYx4rGZQZ9QzQ6J3S',
'AUDITOR',
'+92-300-4444444');


-- CLIENTS

INSERT INTO clients
(company_name,email,location,phone_number,industry)
VALUES

('TechNova Solutions',
'contact@technova.com',
'Lahore',
'+92-321-5551111',
'Technology'),

('GreenFields Industries',
'info@greenfields.com',
'Islamabad',
'+92-321-5552222',
'Manufacturing'),

('Alpha Healthcare',
'admin@alphahealth.com',
'Karachi',
'+92-321-5553333',
'Healthcare');



-- AUDIT TEMPLATES

INSERT INTO audit_templates
(name,description,audit_type,version)
VALUES

(
'Annual Financial Audit',
'Complete financial statement verification',
'Financial',
1
),

(
'Compliance Audit',
'Review company compliance controls',
'Compliance',
1
);



-- TEMPLATE TASKS

INSERT INTO template_tasks
(template_id,title,description,priority,order_number)
VALUES

(1,
'Review Financial Statements',
'Verify balance sheet and income statement',
'High',
1),

(1,
'Verify Revenue Records',
'Check revenue transactions and supporting documents',
'Critical',
2),

(1,
'Bank Reconciliation Review',
'Verify bank balances and reconciliations',
'Medium',
3),


(2,
'Review Compliance Policies',
'Check internal policies against regulations',
'High',
1),

(2,
'Test Internal Controls',
'Evaluate effectiveness of company controls',
'Medium',
2);



-- AUDITS

INSERT INTO audits
(client_id,template_id,manager_id,audit_year,audit_type,start_date,due_date,priority,status,description)
VALUES

(
1,
1,
2,
2026,
'Financial',
'2026-01-10',
'2026-03-10',
'High',
'In Progress',
'Annual financial audit for TechNova'
),

(
2,
2,
2,
2026,
'Compliance',
'2026-02-01',
'2026-04-01',
'Medium',
'Draft',
'Compliance audit for GreenFields'
);



-- TASKS


INSERT INTO tasks
(audit_id,template_task_id,title,description,assigned_auditor_id,priority,status,start_date,due_date)
VALUES

(
1,
1,
'Review Financial Statements',
'Verify balance sheet and income statement',
3,
'High',
'In Progress',
'2026-01-10',
'2026-02-01'
),

(
1,
2,
'Verify Revenue Records',
'Check revenue transactions',
4,
'Critical',
'Draft',
'2026-01-15',
'2026-02-15'
),

(
1,
3,
'Bank Reconciliation Review',
'Verify bank records',
3,
'Medium',
'Finished',
'2026-01-20',
'2026-02-20'
);



-- COMMENTS

INSERT INTO comments
(task_id,user_id,content)
VALUES

(
1,
3,
'Initial review completed. Waiting for supporting documents.'
),

(
2,
4,
'Revenue samples requested from client.'
);



-- DOCUMENTS

INSERT INTO documents
(task_id,uploaded_by,file_name,file_path)
VALUES

(
1,
3,
'financial_statement.pdf',
'/uploads/financial_statement.pdf'
),

(
2,
4,
'revenue_report.xlsx',
'/uploads/revenue_report.xlsx'
);



-- ACTIVITY LOGS

INSERT INTO activity_logs
(entity_id, entity_type, changed_by, action, old_value, new_value)
VALUES

(
    1,
    'Audit',
    2,
    'Created',
    NULL,
    '{"status":"Draft","priority":"High"}'
),


(
    1,
    'Audit',
    2,
    'Completed',
    '{"status":"In Progress"}',
    '{"status":"Finished"}'
),


(
    5,
    'Task',
    2,
    'Assigned Auditor',
    '{"assigned_auditor_id":null}',
    '{"assigned_auditor_id":4}'
),


(
    5,
    'Task',
    4,
    'Status Updated',
    '{"status":"Draft"}',
    '{"status":"In Progress"}'
),

(
    5,
    'Task',
    4,
    'Status Updated',
    '{"status":"In Progress"}',
    '{"status":"Finished"}'
),


(
    2,
    'Client',
    2,
    'Updated',
    '{"phone_number":"03001234567"}',
    '{"phone_number":"03111234567"}'
),

(
    1,
    'Audit Template',
    2,
    'Updated',
    '{"version":1}',
    '{"version":2}'
),


(
    7,
    'User',
    1,
    'Archived',
    '{"is_active":true}',
    '{"is_active":false}'
);