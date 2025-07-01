import React from 'react'

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div
      className="min-h-screen min-w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/28492550/pexels-photo-28492550.jpeg')",
      }}
    >
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 w-full max-w-md px-6 text-white text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-white/80 mt-2">
            Please login echoze with your echoze email address
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-12 py-3 rounded-md bg-transparent border border-white/70 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-12 py-3 rounded-md bg-transparent border border-white/70 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm text-white/80 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-white" />
              Stay logged in
            </label>
            
          </div>

          {/* Submit Button */}
          {/* Submit Button */}
<div className="relative w-full">
  <button
    type="submit"
    className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-md relative overflow-hidden group focus:outline-none"
    disabled={isLoggingIn}
  >
    {isLoggingIn ? (
      <div className="text-white flex items-center justify-center gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        Logging in...
      </div>
    ) : (
      <span>SIGN IN &gt;</span>
    )}

    {/* Click pulse effect */}
    <span className="absolute inset-0 animate-pingClick bg-white/10 rounded-md pointer-events-none"></span>
  </button>

  {/* Dummy white circle cursor */}
  <div className="absolute left-1/2 bottom-0 animate-cursorFly transform -translate-x-1/2 z-10">
    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
  </div>
</div>


{/* Sign Up Redirect */}
<div className="text-center text-white/80 text-sm mt-4">
  Don&apos;t have an account?{" "}
  <a
    href="/signup"
    className="text-white font-semibold underline hover:text-gray-300 transition"
  >
    Sign Up
  </a>
</div>

        </form>
      </div>
    </div>
  );
};
export default LoginPage;
