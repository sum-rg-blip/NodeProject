import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = "http://localhost:5000";

export default function AuthModal() {
  const { authOpen, setAuthOpen, login } = useAuth();

  const [mode, setMode] = useState("login"); // login | register
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  if (!authOpen) return null;

  const close = () => setAuthOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        mode === "login"
          ? `${API_BASE}/api/auth/login`
          : `${API_BASE}/api/auth/register`;

      const payload = mode === "login" ? { email, password } : { name, email, password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        alert(data?.message || "Auth failed");
        return;
      }

      // ✅ SAVE token + user
      login(data.user, data.token);

      setName("");
      setEmail("");
      setPassword("");
      close();
    } catch (err) {
      // ✅ This is where "Failed to fetch" happens
      alert(
        "Failed to fetch.\n\n" +
          "Check:\n" +
          "1) Backend running on http://localhost:5000\n" +
          "2) CORS enabled\n" +
          "3) No backend crash (terminal)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={close}
          className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 py-2 rounded-xl font-semibold ${
              mode === "login" ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>

          <button
            className={`flex-1 py-2 rounded-xl font-semibold ${
              mode === "register" ? "bg-black text-white" : "bg-gray-100"
            }`}
            onClick={() => setMode("register")}
            type="button"
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === "register" && (
            <input
              className="border rounded-xl p-3"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            className="border rounded-xl p-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <input
            className="border rounded-xl p-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          <button
            className="bg-black text-white py-3 rounded-xl font-semibold disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-4 text-center">
          After login, token is saved and Confirm Order will work.
        </p>
      </div>
    </div>
  );
}
