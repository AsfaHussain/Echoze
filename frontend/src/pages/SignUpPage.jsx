import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import  toast  from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const { signup, isSigningUp } = useAuthStore();
  const validateForm = () => {
    if(!formData.fullname.trim()) return toast.error('Full Name is required');
    if(!formData.email.trim()) return toast.error('Email is required');
     if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
     <div
      className="min-h-screen min-w-screen  bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/28492550/pexels-photo-28492550.jpeg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md px-6 text-white text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Echoze. Just In.</h1>
          <p className="text-white/80 mt-2">Get started with your free account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              className="w-full pl-12 py-3 rounded-md bg-transparent border border-white/70 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 py-3 rounded-md bg-transparent border border-white/70 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

          {/* Submit */}
         {/* Submit Button with Cursor Click Animation */}
<div className="relative w-full">
  <button
    type="submit"
    className="w-full bg-purple-600 text-white font-bold py-2.5 rounded-md relative overflow-hidden group focus:outline-none"
    disabled={isSigningUp}
  >
    {isSigningUp ? (
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="animate-spin w-5 h-5" />
        Creating...
      </div>
    ) : (
      <span>Create Account</span>
    )}

    {/* Click pulse effect */}
    <span className="absolute inset-0 animate-pingClick bg-white/10 rounded-md pointer-events-none"></span>
  </button>

  {/* Dummy white circle cursor */}
  <div className="absolute left-1/2 bottom-0 animate-cursorFly transform -translate-x-1/2 z-10">
    <div className="w-4 h-4 bg-white rounded-full shadow-md"></div>
  </div>
</div>
        </form>

        {/* Sign-in Link */}
       <div className="text-center text-white/80 text-sm mt-4">
  Already have an account?{" "}
  <Link
    to="/login"
    className="text-white font-semibold underline hover:text-gray-300 transition inline-block animate-textPulse"
  >
    Sign In
  </Link>
</div>


      </div>
    </div>
  );
};
export default SignUpPage;
