# Frontend Summary

This folder contains the React + Vite frontend for the Task Manager application.

## What it does
- Handles user authentication with login and signup pages
- Displays a protected dashboard with project and task summaries
- Allows users to create projects and add tasks
- Provides a team chat interface for collaboration
- Uses a sidebar for navigation between dashboard, projects, tasks, and chat

## Key files
- `src/App.jsx` — routing and protected route layout
- `src/api.js` — Axios client for backend API calls
- `src/context/AuthContext.jsx` — auth state and token persistence
- `src/components/Sidebar.jsx` — authenticated user navigation
- `src/pages/Login.jsx` — login UI and error handling
- `src/pages/Signup.jsx` — signup UI and server messaging
- `src/pages/Dashboard.jsx` — main analytics and stats cards
- `src/pages/Projects.jsx` — project creation and list view
- `src/pages/Tasks.jsx` — task creation and status updates
- `src/pages/Chat.jsx` — team chat UI

## Run locally
```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

## Notes
- This frontend works with the backend API to fetch projects, tasks, and chat messages.
- The UI is styled with Tailwind CSS and includes subtle page animations.
