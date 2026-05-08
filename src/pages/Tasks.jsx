import { useState, useEffect } from "react";
// import axios from "axios";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    const loadTasks = async () => {
      const res = await API.get("/tasks");
      setTasks(res.data);
    };
    loadTasks();
  }, []);

  const addTask = async () => {
    await API.post("/tasks", {
      title,
      project_id: projectId,
    });

    setTitle("");
    setProjectId("");
    fetchTasks();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-black/20">
        <h1 className="text-3xl font-semibold text-white">Tasks</h1>
        <p className="mt-2 text-slate-400">Create and update tasks with a clean, efficient workflow.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto]">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              placeholder="Task Title"
              className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              placeholder="Project ID"
              className="rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
          </div>

          <button
            onClick={addTask}
            className="rounded-2xl bg-emerald-500 px-5 py-3 text-white transition hover:bg-emerald-400"
          >
            Add Task
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tasks.map((t) => (
          <div key={t.id} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{t.title}</h3>
                <p className="mt-1 text-slate-400">Status: {t.status}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => updateStatus(t.id, "Todo")} className="rounded-full bg-red-500 px-3 py-2 text-white transition hover:bg-red-400">Todo</button>
                <button onClick={() => updateStatus(t.id, "In Progress")} className="rounded-full bg-amber-500 px-3 py-2 text-white transition hover:bg-amber-400">Progress</button>
                <button onClick={() => updateStatus(t.id, "Done")} className="rounded-full bg-emerald-500 px-3 py-2 text-white transition hover:bg-emerald-400">Done</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;