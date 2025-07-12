import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { FaUser, FaLock, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import "./css/Login.css"; // Make sure this path matches your project structure

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) newErrors.identifier = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint =
      formData.role === "admin"
        ? "https://codora.onrender.com/auth/admin/login"
        : "https://codora.onrender.com/auth/user/login";

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: formData.identifier,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      dispatch(setCredentials({
        token: data.token,
        role: data.role,
        username: data.username,
      }));

      navigate("/");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center backdrop-blur-sm bg-white/20 p-4">
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-100">

  {/* Background pattern (optional) */}
  <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full top-[-200px] left-[-200px] opacity-30 blur-3xl animate-pulse"></div>
  <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-pink-400 to-yellow-300 rounded-full bottom-[-200px] right-[-200px] opacity-30 blur-2xl animate-pulse delay-400"></div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 border border-white/20"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back!</h2>
          <p className="text-gray-500">
            {formData.role === "user"
              ? "Sign in to access your account"
              : "Admin Dashboard Access"}
          </p>
        </div>

        {/* Fluid Role Toggle */}
<div className="w-full flex justify-center">
  <div className="relative w-[220px] h-[48px] bg-gray-200 rounded-full px-1 flex items-center justify-between overflow-hidden">
    <motion.div
      className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-blue-300 rounded-full z-0"
      layout
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 30,
        mass: 1.5,
      }}
      animate={{
        x: formData.role === "admin" ? "100%" : "0%",
      }}
    />
    <button
      type="button"
      onClick={() => setFormData({ ...formData, role: "user" })}
      className={`relative z-10 w-1/2 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
        formData.role === "user" ? "text-blue-600 font-semibold" : "text-gray-500"
      }`}
    >
      <FaUser className="inline mr-1" />
      User
    </button>
    <button
      type="button"
      onClick={() => setFormData({ ...formData, role: "admin" })}
      className={`relative z-10 w-1/2 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
        formData.role === "admin" ? "text-blue-600 font-semibold" : "text-gray-500"
      }`}
    >
      <FaUserShield className="inline mr-1" />
      Admin
    </button>
  </div>
</div>


        {/* Email */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="Enter your email"
              className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="pl-10 w-full border border-gray-300 rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Authenticating...
            </>
          ) : (
            <>
              <FaLock className="mr-2" />
              {formData.role === "user" ? "Sign In" : "Admin Login"}
            </>
          )}
        </button>

        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
