import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { googleAuth, loginUser } from "./redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { showError, showSuccess } from "./Alert";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { payload } = await dispatch(loginUser({ email: email.trim(), password }));
  
  
      if (payload?.data) {
        const { accessToken, isVerified } = payload.data;
  
        if (accessToken) {
          if (isVerified) {
            showSuccess(payload.message || "Login successful!");
            navigate("/dashboard");
          } else {
            showError("Please verify your email to complete the login.");
            navigate("/verify");
          }
        } else {
          showError("Login failed. Try again.");
        }
      }
    } catch (error) {
      showError("An unexpected error occurred during login.");
    }
  };
  

  // Google login handler
  const handleGoogleLogin = async (response) => {
    try {
      const tokenId = response?.credential;
      if (!tokenId) {
        showError("Invalid Google response.");
        return;
      }
  
      const result = await dispatch(
        googleAuth({
          tokenId,
          role: selectedRole || null,
        })
      );
  
      if (result.error) {
        const msg = result?.payload?.message;
        
        // 🔍 Check if it's the new user
        if (msg) {
          showError("Please select a role before continuing with Google login.");
          return;
        }
  
        // Generic error fallback
        showError(msg || "Google login failed");
        return;
      }
      const user = result.payload?.data;
      console.log(user?.accessToken, "usertoken");
      if (user?.accessToken && user?.role === "admin") {
        showSuccess("Login successful");
        navigate("/dashboard");
      } else {
        showSuccess("Login successful");
        navigate("/");
      }
     
      
    } catch (error) {
      showError("Google login error. Please try again.");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white p-4 relative">
      <div className="absolute inset-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center blur-lg opacity-30"></div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
        <h2 className="text-center text-3xl font-semibold mb-6 text-gray-900">Log In</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="w-full border-b border-gray-900 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <Link
            to="/forgetPassword"
            className="block text-end text-sm font-semibold text-gray-500 hover:text-gray-600 mt-4"
          >
            FORGOT PASSWORD?
          </Link>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 bg-gray-900 py-2 mt-4 rounded-full font-bold text-white transition duration-300 hover:bg-gray-700"
            >
              LOG IN
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          No account?
          <Link to="/signup" className="text-indigo-600 hover:underline ml-1">
            Create One
          </Link>
        </p>
        <div className="flex justify-center items-center mt-4 gap-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => showError("Google Login Failed")}
          />

          <select
            className="border border-gray-300 rounded p-2 text-gray-800"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">-- Select Role --</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
