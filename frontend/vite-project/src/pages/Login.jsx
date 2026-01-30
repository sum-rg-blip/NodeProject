import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <- Import useNavigate
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Pill, ShoppingCart, Calendar, Lock as LockIcon } from "lucide-react";

export default function PharmacLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // <- initialize navigate

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    // Simulate API login
    setTimeout(() => {
      setLoading(false);

      // Haddii login-gu sax yahay
      if (email === "admin@pharmacy.com" && password === "123456") {
        localStorage.setItem("adminEmail", email); // <-- save admin login
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-green-300 to-green-400 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <circle cx="20" cy="30" r="10" fill="#34D399" />
          <circle cx="50" cy="70" r="12" fill="#10B981" />
          <circle cx="80" cy="40" r="8" fill="#6EE7B7" />
        </svg>
      </div>

      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-6xl flex flex-col md:flex-row overflow-hidden relative z-10">
        {/* Left - Benefits */}
        <div className="w-full md:w-1/2 p-12 bg-green-100/80 flex flex-col justify-center space-y-4">
          <h2 className="text-4xl font-bold text-green-900 mb-4 flex items-center gap-3">
            <Pill size={32} /> Welcome Back
          </h2>
          <p className="text-green-700 mb-6">
            Continue your wellness journey with secure and easy access.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Pill className="text-green-500" size={28} />
              <p className="text-green-700 text-sm font-semibold">
                Medication Management - Track your prescriptions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-green-500" size={28} />
              <p className="text-green-700 text-sm font-semibold">
                Easy Orders - Refill medicines quickly
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-green-500" size={28} />
              <p className="text-green-700 text-sm font-semibold">
                Appointment Scheduling - Consult with pharmacists
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LockIcon className="text-green-500" size={28} />
              <p className="text-green-700 text-sm font-semibold">
                Secure Login - Your info stays safe
              </p>
            </div>
          </div>
        </div>

        {/* Right - Login Form */}
        <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center bg-green-50/80">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6 flex items-center gap-3">
            <Pill className="text-green-600" size={32} /> Pharmacy Login
          </h1>
          <p className="text-green-700 mb-10 text-center">
            Sign in to access your dashboard and continue your wellness journey.
          </p>

          <form
            onSubmit={handleLogin}
            className="w-full max-w-md flex flex-col gap-4"
          >
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="relative w-full">
              <Mail
                className="absolute top-3 left-3 text-green-500"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm hover:shadow-md bg-white/80"
              />
            </div>

            <div className="relative w-full">
              <Lock
                className="absolute top-3 left-3 text-green-500"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 transition shadow-sm hover:shadow-md bg-white/80"
              />
              <span
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm text-green-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="accent-green-600"
                />
                Remember me
              </label>
              <a href="#" className="hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-2xl font-semibold transition shadow-lg ${
                loading
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:scale-105"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center text-green-700 mt-2">
              Don’t have an account?{" "}
              <a href="/register" className="font-semibold underline">
                Create one
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
