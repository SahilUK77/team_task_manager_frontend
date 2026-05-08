import { useState, useEffect } from "react";
// import axios from "axios";
import API from "../api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ FIXED useEffect
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();
  }, []);

  // ✅ Add Project
  const addProject = async () => {
    if (!title || !description) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post("/projects", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      // refresh
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Projects</h1>
            <p className="mt-2 text-slate-400">Add, track, and manage your project portfolio.</p>
          </div>
          <button
            onClick={addProject}
            className="rounded-2xl bg-cyan-500 px-5 py-3 text-white transition hover:bg-cyan-400"
          >
            Add Project
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <input
            placeholder="Project Title"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Description"
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="rounded-[1.75rem] border border-slate-800 bg-slate-900/85 p-6 shadow-lg shadow-black/10 transition hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-2 text-slate-400">{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;