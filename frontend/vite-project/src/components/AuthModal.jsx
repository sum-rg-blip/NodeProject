// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// export default function AuthModal() {
//   const { authOpen, setAuthOpen, login, register } = useAuth();
//   const [isLogin, setIsLogin] = useState(true);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   if (!authOpen) return null;

//   const submit = async (e) => {
//     e.preventDefault();
//     if (isLogin) await login({ email, password });
//     else await register({ name, email, password });
//   };

//   return (
//     <div className="modal-overlay" onClick={() => setAuthOpen(false)}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-btn" onClick={() => setAuthOpen(false)}>
//           <X />
//         </button>

//         <h2>{isLogin ? "Login" : "Create Account"}</h2>

//         <form onSubmit={submit}>
//           {!isLogin && (
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required />
//           )}
//           <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
//           <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />

//           <button className="btn-pill btn-outline w-full" type="submit">
//             {isLogin ? "Login" : "Register"}
//           </button>
//         </form>

//         <p className="mt-4 text-center cursor-pointer" onClick={() => setIsLogin((p) => !p)}>
//           {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
//         </p>
//       </div>
//     </div>
//   );
// }

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
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[1000]"
      onClick={() => setAuthOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          className="absolute top-6 right-6 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
          onClick={() => setAuthOpen(false)}
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          {!isLogin && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-900 transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch */}
        <p
          className="mt-6 text-center text-sm text-gray-600 cursor-pointer hover:text-black transition"
          onClick={() => setIsLogin((p) => !p)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
