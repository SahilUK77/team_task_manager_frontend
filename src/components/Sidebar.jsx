import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="w-64 border-r border-slate-800 bg-slate-950 shadow-2xl shadow-black/20 h-screen p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">TaskManager</h2>

      <nav className="flex flex-col gap-3 text-slate-300">
        <Link to="/" className="rounded-2xl px-3 py-2 transition hover:bg-slate-900 hover:text-cyan-300">
          Dashboard
        </Link>
        <Link to="/projects" className="rounded-2xl px-3 py-2 transition hover:bg-slate-900 hover:text-cyan-300">
          Projects
        </Link>
        <Link to="/tasks" className="rounded-2xl px-3 py-2 transition hover:bg-slate-900 hover:text-cyan-300">
          Tasks
        </Link>
        <Link to="/chat" className="rounded-2xl px-3 py-2 transition hover:bg-slate-900 hover:text-cyan-300">
          Team Chat
        </Link>
      </nav>
      <button
        onClick={logout}
        className="mt-6 w-full rounded-2xl bg-rose-500 px-4 py-2 text-white transition hover:bg-rose-400"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;