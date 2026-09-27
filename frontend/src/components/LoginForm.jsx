  import React, { useState } from "react";
import { loginUser } from "../apis/user.api.js";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading as setLoadingState, setError as setErrorState } from "../store/slices/authSlice";
import { useNavigate } from "@tanstack/react-router";


const LoginForm = ({state}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setErrorState(null));
    dispatch(setLoadingState(true));
    try {
  const data = await loginUser(email, password);

  dispatch(login(data.data));

  navigate({
    to: "/dashboard",
    replace: true,
  });
} catch (err) {
  console.error("Login error:", err);
  dispatch(setErrorState(err.message || "Login failed"));
} finally {
  dispatch(setLoadingState(false));
}
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 text-center text-sm">{error}</div>
        )}
        <input
          className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span onClick={() => state(false)} className="text-blue-600 cursor-pointer hover:underline">
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
