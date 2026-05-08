import { useState, useEffect } from "react";
// import axios from "axios";
import { useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";


function Dashboard() {

  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Change axios.get to API.get
        const projectRes = await API.get("/projects");
        const taskRes = await API.get("/tasks");

        setProjects(projectRes.data);
        setTasks(taskRes.data);
      } catch (err) {
        console.log("Dashboard Error:", err);
      }
    };
    fetchData();
  }, []);

  // ✅ Stats
  const completed = tasks.filter(t => t.status === "Done").length;
  const progress = tasks.filter(t => t.status === "In Progress").length;
  const todo = tasks.filter(t => t.status === "Todo").length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Dashboard</h1>
            <p className="mt-2 text-slate-400">Overview of your active projects, tasks, and team progress.</p>
          </div>
          <div className="inline-flex rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300">
            Role: {user?.role || "Member"}
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Projects</p>
          <p className="mt-5 text-4xl font-semibold text-white">{projects.length}</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Tasks</p>
          <p className="mt-5 text-4xl font-semibold text-white">{tasks.length}</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-emerald-950/80 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Done</p>
          <p className="mt-5 text-4xl font-semibold text-white">{completed}</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-amber-950/80 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-300">Progress</p>
          <p className="mt-5 text-4xl font-semibold text-white">{progress}</p>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-rose-950/80 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-rose-300">Todo</p>
          <p className="mt-5 text-4xl font-semibold text-white">{todo}</p>
        </div>
      </div>

      {user?.role === "admin" && (
        <button className="rounded-2xl bg-cyan-500 px-4 py-2 text-white transition hover:bg-cyan-400">
          Create Team
        </button>
      )}
    </div>
  );
}

export default Dashboard;