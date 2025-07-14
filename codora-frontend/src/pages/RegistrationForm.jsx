import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserEdit } from "react-icons/fa";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const Base_url = "https://codora.onrender.com";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, firstName, lastName, email, password } = formData;
    const data = { username, firstName, lastName, email, password };

    const endpoint = `${Base_url}/auth/user/signup`;

    try {
      setLoading(true);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (!response.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      console.log("Registration success:", data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-100 pt-10 mt-8 pb-10">
      {/* Gradient background blobs (same as login) */}
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-blue-500 to-purple-500 rounded-full top-[-200px] left-[-200px] opacity-30 blur-3xl animate-pulse"></div>
      <div className="absolute w-[800px] h-[800px] bg-gradient-to-br from-pink-400 to-yellow-300 rounded-full bottom-[-200px] right-[-200px] opacity-30 blur-2xl animate-pulse delay-400"></div>

      <div className="w-full max-w-4xl bg-white/30 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex border border-white/20">
        {/* Left Panel */}
        <div className="w-1/2 bg-gradient-to-br from-blue-100 to-blue-200 p-6 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
          <p className="text-gray-600 text-sm mb-4">Join our community today</p>
          <div className="bg-white px-4 py-2 rounded-full text-blue-600 flex items-center text-sm shadow-md">
            <FaUser className="mr-2" />
            User Account
          </div>
        </div>

        {/* Right Panel */}
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-8 space-y-4 bg-white/30 backdrop-blur-md"
        >
          {/* Username */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <div className="relative">
              <FaUserEdit className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="pl-9 w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
          </div>

          {/* Name Fields */}
          <div className="flex gap-4">
            <div className="w-1/2 space-y-1">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <div className="relative">
                <FaUserEdit className="absolute left-3 top-3 text-gray-400 text-sm" />
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="pl-9 w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>

            <div className="w-1/2 space-y-1">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="pl-9 w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-9 w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 text-sm" />
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="pl-9 w-full border border-gray-300 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Loading Message */}
          {loading && (
            <div className="flex items-center justify-center mt-6 gap-2">
              <div className="animate-spin inline-block p-2 w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="ml-2 text-green-500 text-sm">Waking up the secure servers… thanks for your patience!</p>
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
                <div className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"></div>
                Creating Account...
              </>
            ) : (
              <>
                <FaUser className="mr-2 text-sm" />
                Create Account
              </>
            )}
          </button>

          <div className="text-center text-xs text-gray-500 mt-2">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
