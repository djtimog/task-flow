# TaskFlow

A full-stack project and task management app built with React and Node.js/Express.

Live demo → https://task-flow-dpj4.onrender.com/

---

## Tech Stack

**Frontend<TYPESCRIPT>:** React, TypeScript, Tailwind CSS, Redux Toolkit, React Query, React Hook Form, Zod, shadcn/ui

**Backend<JAVASCRIPT>:** Node.js, Express, MongoDB, Mongoose, JWT authentication

---

## Getting Started

### Prerequisites
- Node.js 22+
- MongoDB URI
- Docker (optional)

### Local Development

1. Clone the repo:
   ```bash
   git clone https://github.com/djtimog/task-flow
   cd task-flow
   ```

2. Set up the backend:
   ```bash
   cd backend
   cp .env.example .env   # fill in your MONGO_URI and JWT_SECRET
   npm install
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Running with Docker

```bash
cd backend
npm run docker
```

The app will be available at http://localhost:3003

### Building for Production

This project serves the frontend as static files from the Express backend. To build:

```bash
cd backend
npm run build   # builds frontend and copies dist to backend
npm start
```

---

## Features

- User authentication (JWT)
- Create and manage projects
- Task creation and tracking
- Dashboard overview
- Responsive UI with dark mode support

---

## Project Structure

```
task-flow/
├── backend/          # Express API + serves frontend dist
│   ├── server/       # routes, models, controllers
│   ├── dist/         # built frontend (generated)
│   └── index.js
└── frontend/         # React + Vite app
    └── src/
```

---

## Environment Variables

```env
PORT=<your_port_here>
DATABASE_URI=<mongodb_connection_string_here>
JWT_SECRET=<your_jwt_secret_here>
<!-- NODEMAILER_USER=<your_nodemailer_user_here>
NODEMAILER_PASS=<your_nodemailer_pass_here> -->
BASE_HREF=<your_base_href_here>
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
```

---

Built by [Timog](https://djtimog-portfolio.vercel.app) 🚀