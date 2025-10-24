import React, { useState } from "react";
import { registerUser } from "../apis/user.api.js";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";

const RegisterForm = ({ state }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Simulate API call - replace with real API call later
      const data = await registerUser(username, email, password);
      setLoading(false);
        // Store user data and token
  
      // Use await with navigation and proper options
      await navigate({
        to: '/dashboard',
        // Use replace to prevent going back to registration page
        replace: true
      });
      state(true); // Switch to login form on successful registration
    } catch (err) {
      setLoading(false);
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className=" w-[400px] flex max-w-md bg-gray-100 items-center justify-center">
      <div className="w-full p-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-center text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full p-3 text-white rounded-lg transition-colors
              ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span  onClick={() => state(true)} className=" cursor-pointer text-blue-600 hover:underline">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
