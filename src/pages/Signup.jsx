import { useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import API from "../api";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", form);
      setMessage(res.data?.message || "Signup success");
      setMessageType("success");
    } catch (err) {
      const serverMessage = err.response?.data?.error || err.response?.data || "Signup failed. Please try again.";
      setMessage(serverMessage);
      setMessageType("error");
    }
  };

  const clearMessage = () => {
    setMessage("");
    setMessageType("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-md animate-fade-in">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white">Create an Account</h1>
          <p className="mt-2 text-sm text-slate-400">Join now and manage your team, tasks, and projects from one place.</p>
        </div>

        {message && (
          <div
            className={`mb-5 rounded-2xl border px-4 py-3 text-sm transition-opacity duration-300 ${
              messageType === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {message}
          </div>
        )}

        <input
          placeholder="Name"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition mb-4"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
            clearMessage();
          }}
        />
        <input
          placeholder="Email"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition mb-4"
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
            clearMessage();
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition mb-4"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
            clearMessage();
          }}
        />

        <select
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition mb-6"
          onChange={(e) => {
            setForm({ ...form, role: e.target.value });
            clearMessage();
          }}
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Signup
        </button>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;