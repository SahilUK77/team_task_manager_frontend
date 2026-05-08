# Task Manager Frontend

This frontend is the React + Vite application for the Task Manager project.
It provides a polished user interface for authentication, dashboard analytics, project creation, task management, and team chat.

## 🌟 What’s included
- Login and signup pages with JWT-based authentication flow
- Dashboard view with project/task summaries and status badges
- Project creation form and project list
- Task creation and status update workflow
- Team chat interface for sending and viewing messages
- Dark UI theme with animated page transitions and responsive layout

## 🧱 Tech stack
- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios for API communication

## 📁 Key files
- `src/App.jsx` — app routing and public/protected route handling
- `src/api.js` — Axios client configured for backend API requests
- `src/context/AuthContext.jsx` — authentication context and `localStorage` persistence
- `src/components/Sidebar.jsx` — sidebar navigation for authenticated users
- `src/pages/Login.jsx` — login form and error handling
- `src/pages/Signup.jsx` — signup form and server message display
- `src/pages/Dashboard.jsx` — project/task summary cards and admin role display
- `src/pages/Projects.jsx` — project creation and listing UI
- `src/pages/Tasks.jsx` — task creation and status controls
- `src/pages/Chat.jsx` — team chat feed and message input

## 🚀 Run locally
```bash
cd frontend
npm install
npm run dev
```
Open the Vite URL in your browser (usually `http://localhost:5173`).

## 💡 Notes
- The frontend loads data from the backend through authenticated API calls.
- Protected routes are only accessible after login.
- Message and error states are shown inline for better user experience.

## 📌 Presentation tips
- Highlight the seamless transition between login/signup and protected routes
- Demonstrate data fetching on the dashboard and project/task pages
- Show the live chat flow as part of team collaboration

---

This frontend pairs with the Node.js backend to form a complete task management experience.
