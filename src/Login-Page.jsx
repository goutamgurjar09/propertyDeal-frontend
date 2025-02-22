import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ emailOrUsername, password ,loading}));
    if (result.payload?.token) {
      navigate("/dashboard");
    }
    // console.log("Login Attempt:", emailOrUsername, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-4 relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center blur-lg opacity-30"></div>

      {/* Login Form */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
        <h2 className="text-center text-3xl font-semibold mb-6 text-gray-900">
          Log In
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full border-b border-gray-900 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              className="w-full bg-transparent p-2 outline-none text-gray-800 placeholder-gray-500"
              required
            />
          </div>

          <div className="w-full border-b border-gray-900 focus-within:border-indigo-500 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent p-2 outline-none text-gray-800 placeholder-gray-500 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 bg-gray-900 py-2 mt-4 rounded-full font-bold text-white transition duration-300 hover:bg-gray-700"
            >
              LOG IN
            </button>
          </div>
        </form>

        <Link
          to="/forgetPassword"
          className="block text-center text-sm font-semibold text-gray-500 hover:text-gray-600 mt-4"
        >
          FORGOT PASSWORD?
        </Link>

        <p className="text-center text-sm mt-4 text-gray-600">
          No account?
          <Link to="/signup" className="text-indigo-600 hover:underline ml-1">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
