import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal() {
  const { authOpen, setAuthOpen, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!authOpen) return null;

  const submit = async (e) => {
    e.preventDefault();
    if (isLogin) await login({ email, password });
    else await register({ name, email, password });
  };

  return (
    <div className="modal-overlay" onClick={() => setAuthOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setAuthOpen(false)}>
          <X />
        </button>

        <h2>{isLogin ? "Login" : "Create Account"}</h2>

        <form onSubmit={submit}>
          {!isLogin && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
          )}
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
          <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />

          <button className="btn-pill btn-outline w-full" type="submit">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-center cursor-pointer" onClick={() => setIsLogin((p) => !p)}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
