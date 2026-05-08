import { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showSignupLink, setShowSignupLink] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data);
      window.location.href = "/";
    } catch (err) {
      const serverMessage =
        err.response?.data?.error ||
        (typeof err.response?.data === "string" ? err.response.data : null);

      if (err.response && err.response.status === 404) {
        setMessage(serverMessage || "User not found. New here?");
        setMessageType("error");
        setShowSignupLink(true);
      } else if (err.response && err.response.status === 401) {
        setMessage(serverMessage || "Wrong password");
        setMessageType("error");
        setShowSignupLink(false);
      } else {
        setMessage(serverMessage || "Login failed. Please try again.");
        setMessageType("error");
        setShowSignupLink(false);
      }
    }
  };

  const clearError = () => {
    setMessage("");
    setMessageType("");
    setShowSignupLink(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-md animate-fade-in">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-slate-400">Log in to access your projects, tasks, and team collaboration.</p>
        </div>

        {message && (
          <div
            className={`mb-5 rounded-2xl border px-4 py-3 text-sm transition-opacity duration-300 ${
              messageType === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div>{message}</div>
            {showSignupLink && (
              <Link to="/signup" className="mt-2 inline-block underline font-medium text-cyan-600 hover:text-cyan-500">
                Create a new account
              </Link>
            )}
          </div>
        )}

        <input
          placeholder="Email"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition mb-4"
          onChange={(e) => {
            setEmail(e.target.value);
            clearError();
          }}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition mb-6"
          onChange={(e) => {
            setPassword(e.target.value);
            clearError();
          }}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Login
        </button>

        <p className="mt-5 text-center text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-medium text-cyan-400 hover:text-cyan-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

