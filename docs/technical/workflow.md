# NexAudit V1 Workflow

## Overview

NexAudit V1 gonna be built in a logical order where each module depends on the
previous one.

## 1. Users

Create and manage users of the system.

Roles include: - Manager - Auditor - Administrator

**Status:**  Completed

------------------------------------------------------------------------

## 2. Clients

Create companies that will be audited.

Example: - ABC Manufacturing - XYZ Bank - Tech Solutions Ltd.

**Status:**  Completed

------------------------------------------------------------------------

## 3. Audit Templates

Reusable audit blueprints.

Examples: - Financial Audit - Inventory Audit - IT Security Audit

**Status:**  Completed

------------------------------------------------------------------------

## 4. Template Tasks

Each audit template contains a predefined checklist.

Example:

1.  Verify Cash
2.  Verify Inventory
3.  Review Receivables
4.  Fixed Assets
5.  Bank Reconciliation

These tasks are reused whenever a new audit is created.

**Status:**  Completed

------------------------------------------------------------------------

## 5. Create Audit

The user creates a new audit by selecting:

-   Client
-   Audit Template
-   Manager
-   Audit Year
-   Audit Type
-   Start Date
-   Due Date
-   Priority
-   Status
-   Description

This creates the audit record.

**Status:**  Next

------------------------------------------------------------------------

## 6. Automatically Generate Audit Tasks

After an audit is created:

-   Load all Template Tasks belonging to the selected Audit Template.
-   Create real Audit Tasks for the new audit.

Example:

Template: - Verify Cash - Inventory - Fixed Assets

Generated Audit: - Verify Cash - Inventory - Fixed Assets

These are now independent tasks assigned to this audit.

------------------------------------------------------------------------

## 7. Assign Tasks

The manager assigns generated audit tasks to auditors.

Example:

-   Verify Cash → Ahmed
-   Inventory → Sarah

------------------------------------------------------------------------

## 8. Perform Audit

Auditors work through their assigned tasks.

Typical task status:

-   Draft
-   In Progress
-   Completed

------------------------------------------------------------------------

## 9. Upload Documents

Attach supporting evidence to tasks.

Examples:

-   Cash Count.pdf
-   Invoice.xlsx
-   Photos.zip

------------------------------------------------------------------------

## 10. Comments

Team members communicate through task comments.

Example:

Manager: \> Need additional bank statement.

Auditor: \> Uploaded.

------------------------------------------------------------------------

## 11. Complete Audit

When every task is complete, the audit status becomes:

-   Completed

------------------------------------------------------------------------

## 12. Archive Audit

Completed audits are archived instead of deleted.

This preserves historical records while keeping the active dashboard
clean.

------------------------------------------------------------------------

# Overall Workflow Am Gonna Follow

``` text
Users
    ↓
Clients
    ↓
Audit Templates
    ↓
Template Tasks
    ↓
Create Audit
    ↓
Generate Audit Tasks
    ↓
Assign Tasks
    ↓
Perform Audit
    ↓
Comments & Documents
    ↓
Complete Audit
    ↓
Archive Audit
```

## Current Progress

-    ~~Users API~~
-    ~~Clients API~~
-    ~~Audit Templates API~~
-    ~~Template Tasks API~~
-    Audits API
-    Audit Tasks API
-    Comments API
-    Documents API
-    Authentication & Authorization
-    React Frontend
-    Deployment (SaaS)
