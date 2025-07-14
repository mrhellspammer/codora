import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { FaUser, FaLock, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import "./css/Login.css";
import LoadingMessage from "../comp/LoadingMessage";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Base_url = "https://codora.onrender.com";

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) newErrors.identifier = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const animate = () => {
    setTimeout(() => {
      setFormData({
        identifier: "",
        password: "",
        role: formData.role,
      });
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const endpoint =
      formData.role === "admin"
        ? `${Base_url}/auth/admin/login`
        : `${Base_url}/auth/user/login`;

    try {
      setLoading(true);
      animate();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

      dispatch(
        setCredentials({
          token: data.token,
          role: data.role,
          username: data.username,
        })
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // alert("Something went wrong. Please try again.");
      setError(" ❌ Wrong credentials entered. Try Again !!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-100 pt-10 mt-8 pb-10">
      {/* Background Blobs */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full top-[-200px] left-[-200px] opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-pink-400 to-yellow-300 rounded-full bottom-[-200px] right-[-200px] opacity-30 blur-2xl animate-pulse delay-400"></div>

      {/* Login Form */}
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

        {/* Role Toggle */}
        <div className="w-full flex justify-center">
          <div className="relative w-[220px] h-[48px] bg-gray-200 rounded-full px-1 flex items-center justify-between overflow-hidden">
            <motion.div
              className="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-blue-300 rounded-full z-0"
              layout
              transition={{ type: "spring", stiffness: 600, damping: 30, mass: 1.5 }}
              animate={{ x: formData.role === "admin" ? "100%" : "0%" }}
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

        {/* Email Field */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <div className="relative border-1 border-gray-400 rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder={
                errors.identifier ? errors.identifier : "Enter your email"
              }
              className={`pl-10 w-full rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 ${
                errors.identifier
                  ? "border-red-200 text-red-500 placeholder-red-500 ring-gray-400"
                  : "border-gray-300 text-gray-800 focus:ring-blue-500"
              }`}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          </div>
          <div className="relative border-1 border-gray-400 rounded-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaLock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                errors.password ? errors.password : "••••••••"
              }
              className={`pl-10 w-full rounded-lg py-2.5 px-4 focus:outline-none focus:ring-1 ${
                errors.password
                  ? "border-red-500 text-red-500 placeholder-red-500 ring-gray-400"
                  : "border-gray-300 text-gray-800 focus:ring-blue-500"
              }`}
            />
          </div>
        </div>

              {/* Loading Message */}
          {loading ? (
            <LoadingMessage />
          ) : error ? (
            <div className="flex items-center justify-center mt-2 gap-2 z-5000">
          <div className=" inline-block p-2 w-6 h-6"></div>
          <p className="ml-2 text-red-500 text-xs">{error}</p>
        </div>
          ) : (
            <div className="flex items-center justify-center mt-2 gap-2 z-5000">
          <div className=" inline-block p-2 w-6 h-6"></div>
          <p className="ml-2 text-green-500 text-xs"></p>
        </div>
          )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
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

        {/* Footer Text */}
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
