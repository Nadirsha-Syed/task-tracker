# TaskFlow - Full-Stack Task Management System

A production-ready, full-stack Task Management application built with **React (Vite + Tailwind CSS)** and a **Node.js / Express / MongoDB** backend. Includes secure JWT authentication, CRUD workflows, real-time analytics aggregation, multi-criteria filtering, search, sorting, and dark mode.

---

## Features

- **Authentication & Security**: Secure User Registration and Login using JSON Web Tokens (JWT) and Bcrypt password hashing.
- **Task Management (CRUD)**: Create, view, update, delete, and toggle task completion states.
- **Search, Filter & Sort**:
  - Full-text search by title.
  - Multi-status filter (`Todo`, `In Progress`, `Done`).
  - Priority filter (`Low`, `Medium`, `High`).
  - Sort by creation time or due date (Ascending / Descending).
- **Task Analytics**: Real-time aggregated statistics displaying total tasks, completed count, pending count, and percentage completion rate.
- **UI & Experience**: Fully responsive interface built with Tailwind CSS, supporting dark/light mode toggling, loading indicators, and paginated task lists.

---

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt.js

---

## Project Structure

```text
task-tracker/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # Route business logic (auth, tasks)
│   │   ├── middleware/      # Auth verification & global error handler
│   │   ├── models/          # Mongoose schemas (User, Task)
│   │   ├── routes/          # Express API routes
│   │   └── app.js           # Express app setup & middleware
│   ├── .env
│   ├── package.json
│   └── server.js            # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/      # Modular UI components (Navbar, Modal, TaskCard, etc.)
│   │   ├── services/        # Axios instance & interceptors
│   │   ├── App.jsx          # Root dashboard state controller
│   │   ├── main.jsx         # Entry mount
│   │   └── index.css        # Tailwind CSS imports
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── .gitignore
└── README.md