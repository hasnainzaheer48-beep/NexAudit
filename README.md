# NexAudit

A web application for audit firms to manage clients, audit engagements, team assignments, and supporting evidence in one place. Managers spin up an audit from a reusable template, the system generates the task checklist, auditors work through their tasks (status updates, comments, document uploads), and every change is recorded in an activity log.

Version 1 focuses on **engagement management**.

## Features

- **Role-based access control** – three roles (`ADMIN`, `MANAGER`, `AUDITOR`) with route-level permissions on the API and role-gated pages in the UI.
- **JWT authentication** – email/password login, bcrypt-hashed passwords, tokens valid for 1 day, deactivated users cannot sign in.
- **Client management** – company records with industry, location, and contact details.
- **Audit templates** – reusable checklists (template + ordered template tasks with priorities). Templates and tasks can be versioned, deactivated, or archived.
- **Automatic task generation** – creating an audit copies every non-archived task from its template into the audit, inside a single DB transaction.
- **Audit lifecycle** – `Draft → In Progress → Finished`, priorities from `Low` to `Critical`, start/due dates, progress tracking per audit, and archiving.
- **Task workflow** – managers assign auditors; auditors update task status and upload evidence.
- **Document uploads** – PDF, PNG, JPEG, Word, and Excel files up to 10 MB, attached to an audit task, with open/download and soft delete.
- **Comments** – discussion per task; only the author can edit or soft-delete a comment.
- **Activity log** – every create/update/assign/status change/archive is stored with old and new values (JSONB) and the user who made it.
- **Role-specific dashboards** – stats, overdue and upcoming work for admins, managers, and auditors.

## Roles

| Capability | Admin | Manager | Auditor |
| --- | :---: | :---: | :---: |
| Manage users (create, edit, deactivate, delete) | ✅ | – | – |
| Manage clients | ✅ | view | – |
| Manage audit templates & template tasks | ✅ | ✅ | – |
| View all audits | ✅ | – | – |
| Create / edit / delete audits | – | ✅ | – |
| Archive audits | ✅ | ✅ | – |
| Assign auditors to tasks | – | ✅ | – |
| Update task status | – | – | ✅ |
| Upload documents to a task | – | – | ✅ |
| View own audits / tasks | – | ✅ | ✅ |
| View activity logs | ✅ | ✅ | – |

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, Axios, Lucide icons |
| Backend | Node.js 22, Express 5, JWT, bcrypt, Multer |
| Database | PostgreSQL 18, `pg`, `node-pg-migrate` |
| Infrastructure | Docker, Docker Compose, Nginx (serves the SPA and proxies `/api`) |

## Project Structure

```
nexaudit/
├── backend/
│   ├── migrations/         # node-pg-migrate migrations (schema)
│   ├── src/
│   │   ├── config/         # env validation, Postgres pool
│   │   ├── controllers/    # request handlers
│   │   ├── middlewares/    # auth, roles, uploads, validation, error handler
│   │   ├── routes/         # Express routers, one per resource
│   │   ├── utils/          # activity logger, change diffing
│   │   └── server.js
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── api/            # Axios instance (adds the Bearer token)
│   │   ├── components/     # UI, dashboards, tables, forms, modals
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # data-fetching hooks
│   │   └── App.jsx         # routes
│   ├── nginx.conf.template
│   └── Dockerfile
├── docs/
│   ├── business/           # vision, pricing, target customer
│   ├── technical/          # Postman collection
│   └── notes/              # design notes (Obsidian vault)
└── compose.yml
```

## Getting Started

### Prerequisites

- Docker and Docker Compose (for the containerized setup), **or**
- Node.js 22+ and a local PostgreSQL instance (for development)

### Option A – Docker Compose

1. **Create the Postgres volume.** `compose.yml` declares it as external:

   ```bash
   docker volume create nexaudit-postgres-data
   ```

2. **Create a root `.env`** (read by Compose for the Postgres container):

   ```env
   POSTGRES_PASSWORD=choose-a-strong-password
   ```

3. **Create `backend/.env`** (see [Environment Variables](#environment-variables)). Inside Compose the database host is the service name:

   ```env
   DB_HOST=postgres
   DB_PORT=5432
   DB_DATABASE=nexaudit
   DB_USER=postgres
   DB_PASSWORD=choose-a-strong-password
   DATABASE_URL=postgres://postgres:choose-a-strong-password@postgres:5432/nexaudit
   JWT_SECRET=a-long-random-string
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start everything:**

   ```bash
   docker compose up --build
   ```

   Compose starts Postgres, runs the migrations (`migrate` service), then starts the backend and the frontend.

| Service | URL |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Postgres (from host) | `localhost:5433` |

5. **Create the first admin user** – see [Creating the first admin](#creating-the-first-admin).

### Option B – Local development

1. **Database.** Create an empty Postgres database (for example `nexaudit`).

2. **Backend:**

   ```bash
   cd backend
   npm install
   ```

   Create `backend/.env`:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=nexaudit
   DB_USER=postgres
   DB_PASSWORD=your-password
   DATABASE_URL=postgres://postgres:your-password@localhost:5432/nexaudit
   JWT_SECRET=a-long-random-string
   FRONTEND_URL=http://localhost:5173
   ```

   Then run the migrations, create the upload folder, and start the server:

   ```bash
   npm run migrate up
   mkdir -p public/docs
   npm run dev          # nodemon, http://localhost:3000
   ```

3. **Frontend** (new terminal):

   ```bash
   cd frontend
   npm install
   echo "VITE_API_URL=http://localhost:3000" > .env
   npm run dev          # Vite, http://localhost:5173
   ```

### Creating the first admin

There is no public sign-up; users are created by an admin through `POST /api/users`. To bootstrap the first admin, generate a bcrypt hash and insert the row directly.

```bash
# from backend/, after npm install
node -e "require('bcrypt').hash('YourPassword123', 10).then(console.log)"
```

```sql
INSERT INTO users (first_name, last_name, email, password_hash, role)
VALUES ('Admin', 'User', 'admin@example.com', '<paste-hash-here>', 'ADMIN');
```

With Docker: `docker compose exec postgres psql -U postgres -d nexaudit`, then run the `INSERT` above. After that, sign in at the frontend and create managers and auditors from the **Users** page.

## Environment Variables

**Backend** (`backend/.env`) – the server refuses to start if any required variable is missing.

| Variable | Required | Description |
| --- | :---: | --- |
| `DB_HOST` | ✅ | Postgres host |
| `DB_PORT` | ✅ | Postgres port |
| `DB_DATABASE` | ✅ | Database name |
| `DB_USER` | ✅ | Database user |
| `DB_PASSWORD` | ✅ | Database password |
| `JWT_SECRET` | ✅ | Secret used to sign JWTs |
| `FRONTEND_URL` | ✅ | Allowed CORS origin |
| `PORT` | – | API port (default `3000`) |
| `DATABASE_URL` | for migrations | Connection string read by `node-pg-migrate` |

**Frontend**

| Variable | Description |
| --- | --- |
| `VITE_API_URL` | API base URL, required at build/dev time. `/` in Docker (Nginx proxies `/api`), `http://localhost:3000` in local dev. |

**Compose (root `.env`)**

| Variable | Description |
| --- | --- |
| `POSTGRES_PASSWORD` | Password for the Postgres container |

## Database

Migrations live in `backend/migrations` and are run with `npm run migrate up` (`npm run migrate:create <name>` to add one).

Core tables: `users`, `clients`, `audit_templates`, `template_tasks`, `audits`, `tasks`, `comments`, `documents`, `activity_logs`.

```
audit_templates ─< template_tasks
clients ─< audits >─ audit_templates      audits >─ users (manager)
audits ─< tasks >─ users (assigned auditor)
tasks ─< comments        tasks ─< documents
activity_logs ── entity_type / entity_id + changed_by → users
```

## API Overview

All routes are prefixed with `/api` and, except `POST /api/auth/login`, require an `Authorization: Bearer <token>` header. A Postman collection is included at [`docs/technical/NexAudit API.postman_collection.json`](docs/technical/NexAudit%20API.postman_collection.json).

| Resource | Base path |
| --- | --- |
| Auth | `/api/auth` (`POST /login`, `GET /me`) |
| Users | `/api/users` |
| Clients | `/api/clients` |
| Audit templates | `/api/audit-templates` |
| Template tasks | `/api/template-tasks` |
| Audits | `/api/audits` (includes `/:id/progress`, `/:id/complete`, `/archive/:id`) |
| Tasks | `/api/tasks` (includes `/:taskId/documents`, `/:taskId/comments`, `/:id/assign`, `/:id/status`) |
| Documents | `/api/documents` (`/:id/open`, `/:id/download`, `/:id/delete`) |
| Comments | `/api/comments` (`/:commentId/edit`, `/:commentId/delete`) |
| Activity logs | `/api/activity-logs` |
| Dashboard | `/api/dashboard/{admin,manager,auditor}/...` |

## Notes

- **Uploads** are stored on disk in `backend/public/docs`. That folder is not committed, so create it before the first upload, and mount a volume there in Docker if files should survive container rebuilds.
- `backend/database/seed.sql` predates the current migrations (for example, its `documents` insert uses columns that no longer exist), so use the migrations and the admin bootstrap above rather than that file.
- Role permissions are defined in the route files via the `requireRole` middleware.
