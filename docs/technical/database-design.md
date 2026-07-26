# Tables


## User (Person)

id<br>
first_name<br>
last_name<br>
email<br>
password_hash<br>
role<br>
phone_number<br>
is_active<br>
created_at<br>
updated_at<br>

## Client (Company)

client_id<br>
client_name<br>
email<br>
location<br>
phone_number<br>
industry<br>
created_at<br>
updated_at<br>

## Audit

id\
client_id\
template_id\
manager_id

audit_year\
audit_type

start_date\
due_date

priority\
status

description

is_archived\
archived_at

created_at\
updated_at

## Comments

id\
task_id\
user_id

content

created_at\
edited_at

## Documents

id\
task_id\
uploaded_by

file_name\
file_path

uploaded_at

## Tasks

id\
audit_id\
id

title\
description

assigned_user_id

status\
priority

started_at\
due_date\
completed_at

created_at\
updated_at

## Audit Template

id\
name\
description\
audit_type\
version\
is_active\
created_at\
updated_at

## Task Template

id\
template_id\
title\
description\
order_number\
priority