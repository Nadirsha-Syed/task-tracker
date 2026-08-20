# TaskFlow - Full-Stack Task Management System

A production-ready full-stack Task Management application built with **React (Vite + Tailwind CSS)** and a **Node.js / Express / MongoDB** backend. The platform provides secure user authentication, complete task lifecycle management, multi-criteria filtering, full-text search, sorting, pagination, and real-time aggregated analytics with dark mode support.

---

##  Live Demo & Repository
- **Live Deployment:**  [https://task-tracker-one-murex-32.vercel.app/]
- **GitHub Repository:** [https://github.com/Nadirsha-Syed/task-tracker]

---

##  Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide React / Custom SVG Icons, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt.js

---

##  Setup Steps

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI)
- [Git](https://git-scm.com/)

---

### Step 1: Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/task-tracker.git](https://github.com/YOUR_USERNAME/task-tracker.git)
cd task-tracker

```

---

### Step 2: Backend Configuration & Startup

1. Navigate to the backend directory:
```bash
cd backend

```


2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the `backend/` root directory:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tasktracker
JWT_SECRET=supersecretjwtkey_987213
NODE_ENV=development

```


4. Start the backend development server:
```bash
npm run dev

```


*The backend API will run on `http://localhost:5000`.*

---

### Step 3: Frontend Configuration & Startup

1. Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend

```


2. Install dependencies:
```bash
npm install

```


3. Start the Vite development server:
```bash
npm run dev

```


*The frontend client will run on `http://localhost:5173`.*

---

##  API Endpoints

**Base URL:** `http://localhost:5000/api`

### 1. Authentication

| Method | Endpoint | Description | Request Body | Access |
| --- | --- | --- | --- | --- |
| `POST` | `/auth/register` | Register a new user | `{ "name": "...", "email": "...", "password": "..." }` | Public |
| `POST` | `/auth/login` | Authenticate user & issue JWT | `{ "email": "...", "password": "..." }` | Public |

---

### 2. Task Management

> **Note:** All task endpoints require the HTTP header: `Authorization: Bearer <jwt_token>`

| Method | Endpoint | Description | Query / Request Body | Access |
| --- | --- | --- | --- | --- |
| `GET` | `/tasks` | Get paginated, filtered & sorted tasks | Query Params: `search`, `status`, `priority`, `sortBy`, `order`, `page`, `limit` | Private |
| `POST` | `/tasks` | Create a new task | Body: `{ "title": "...", "description": "...", "status": "Todo", "priority": "Medium", "dueDate": "..." }` | Private |
| `GET` | `/tasks/analytics` | Fetch aggregated task metrics | None | Private |
| `PUT` | `/tasks/:id` | Update task details or mark complete | Body: `{ "title": "...", "status": "Done", ... }` | Private |
| `DELETE` | `/tasks/:id` | Delete a specific task | None | Private |

#### Query Parameters for `GET /tasks`:

* `search` *(string)*: Regex-based case-insensitive title search.
* `status` *(string)*: Filter by `Todo`, `In Progress`, or `Done`.
* `priority` *(string)*: Filter by `Low`, `Medium`, or `High`.
* `sortBy` *(string)*: Sort field (e.g., `createdAt`, `dueDate`).
* `order` *(string)*: Sort direction (`asc` or `desc`).
* `page` *(number)*: Page number (Default: `1`).
* `limit` *(number)*: Items per page (Default: `6`).

#### Sample Response (`GET /tasks/analytics`):

```json
{
  "totalTasks": 12,
  "completedTasks": 8,
  "pendingTasks": 4,
  "completionRate": 67
}

```

---

##  Design Decisions

1. **Compound Indexing for Query Optimization:**
Indexed `{ userId: 1, status: 1 }` and `{ userId: 1, priority: 1 }` in MongoDB. Because every task query filters by user ownership first, these compound indexes allow logarithmic index scans rather than full collection scans.
2. **Database Aggregation Pipeline for Analytics:**
Calculated metrics (`totalTasks`, `completedTasks`, `pendingTasks`, `completionRate`) directly on the database engine using MongoDB's `$group` and `$match` pipeline. This eliminates the need to fetch raw task arrays into Node.js runtime memory.
3. **Stateless JWT Flow with Axios Interceptors:**
Employed token-based authorization. On the client, a centralized Axios interceptor attaches the bearer token to all outgoing requests, while the server verifies access via a reusable `protect` middleware.
4. **Component Decoupling & Maintainability:**
Structured the React frontend into isolated single-responsibility components (`Navbar`, `AuthForm`, `AnalyticsCards`, `TaskControls`, `TaskCard`, `TaskModal`, `Pagination`) to avoid large single-file codebases and simplify testing.
5. **Server-Side Filtering, Sorting & Pagination:**
Offloaded search, filtering, and pagination logic to database queries rather than handling them in-memory in the browser. This ensures minimal bandwidth usage and stable performance as task volume grows.

```

```
