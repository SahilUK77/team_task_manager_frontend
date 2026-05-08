import { useState, useEffect } from "react";
// import axios from "axios";
import API from "../api";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const teamId = 1;

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/chat/${teamId}`);
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await API.get(`/chat/${teamId}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadMessages();
  }, [teamId]);

  const sendMessage = async () => {
    if (!text) return;

    try {
      await API.post("/chat", {
        team_id: teamId,
        message: text,
      });

      setText("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-8 shadow-2xl shadow-black/20">
        <h1 className="text-3xl font-semibold text-white">Team Chat</h1>
        <p className="mt-2 text-slate-400">Send quick updates and coordinate with your team in real time.</p>
      </div>

      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/85 p-6 shadow-lg shadow-black/10">
        <div className="mb-4 h-72 overflow-y-auto rounded-3xl border border-slate-800 bg-slate-950/95 p-4 text-slate-100 shadow-inner">
          {messages.length === 0 ? (
            <p className="text-slate-400">No messages yet. Start the conversation.</p>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="mb-3 rounded-2xl bg-slate-900/90 p-3 text-slate-200 transition hover:bg-slate-900">
                <div className="text-sm text-slate-400">{m.email}</div>
                <div className="mt-1 text-base">{m.message}</div>
              </div>
            ))
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/90 px-4 py-3 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
          />
          <button
            onClick={sendMessage}
            className="rounded-2xl bg-cyan-500 px-6 py-3 text-white transition hover:bg-cyan-400"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;