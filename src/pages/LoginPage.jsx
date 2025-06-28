import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  AlertCircle,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";



export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;

    setLoading(true);
    axios
      .post("http://localhost:5000/api/users/login", { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.type === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setErrors({ general: "Login failed. Please check your credentials." });
      })
      .finally(() => setLoading(false));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-slate-600 to-red-100 flex justify-center items-center p-6 relative overflow-hidden">
      
      {/* Background Twinkle */}
      <div className="absolute inset-0 -z-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl shadow-xl w-full max-w-md text-white space-y-6 relative z-10">
    <button
      onClick={() => {
        if (window.history.length > 1) {
          navigate(-1);
        } else {
          navigate("/");
        }
      }}
      className="text-blue-300 hover:text-white flex items-center gap-1 text-sm mb-2"
    >
      ← Back
    </button>
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-blue-200">Sign in to your account</p>

        {errors.general && (
          <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded-md flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{errors.general}</span>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="text-sm">Email</label>
          <div className="relative mt-1">
            <Mail className="absolute top-3 left-3 h-5 w-5 text-blue-300" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
              }}
              onKeyPress={handleKeyPress}
              className={`pl-10 pr-4 py-2 w-full bg-white/10 text-white rounded-lg border ${
                errors.email ? "border-red-400" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-400 mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="text-sm">Password</label>
          <div className="relative mt-1">
            <Lock className="absolute top-3 left-3 h-5 w-5 text-blue-300" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: "" }));
              }}
              onKeyPress={handleKeyPress}
              className={`pl-10 pr-10 py-2 w-full bg-white/10 text-white rounded-lg border ${
                errors.password ? "border-red-400" : "border-white/30"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-2.5 right-3 text-blue-300 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-400 mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right text-sm">
          <a href="/forgot-password" className="text-blue-300 hover:text-white">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg hover:scale-105 disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Logging in...</span>
            </>
          ) : (
            <>
              <span>Login</span>
              <LogIn className="h-5 w-5" />
            </>
          )}
        </button>

        {/* Register Link */}
        <div className="text-center text-sm text-blue-200">
          Don’t have an account?{" "}
          <a href="/register" className="text-white hover:text-blue-300 font-semibold">
            Register here
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
