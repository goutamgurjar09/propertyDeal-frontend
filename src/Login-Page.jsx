import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { googleAuth, loginUser } from "./redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { getUserDetail } from "./Protected/ProtectedRoute";
import { showError, showSuccess } from "./Alert";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUserDetail();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    const verifiedUser = result.payload?.data?.isVerified;
    if (result.payload?.data?.accessToken && verifiedUser) {
      showSuccess(result.payload?.message);
      navigate("/dashboard");
    } else if (result.payload?.message === "Invalid credentials") {
      showError(result.payload?.message);
    } else if (!verifiedUser) {
      navigate("/verify");
    }
  };

  const handleGoogleLogin = async (response) => {
    if (response?.credential) {
      const result = await dispatch(
        googleAuth({ tokenId: response.credential, role: user.role })
      );
      console.log("Google Auth Response:", result);
      const verifiedUser = result.payload?.data?.isVerified;

      if (result.payload?.data?.accessToken && verifiedUser) {
        showSuccess(result.payload?.message);
        navigate("/dashboard");
      } else if (result.payload?.message === "Invalid credentials") {
        showError(result.payload?.message);
      } else if (!verifiedUser) {
        navigate("/verify");
      }
    }
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

        <div></div>

        <p className="text-center text-sm mt-4 text-gray-600">
          No account?
          <Link to="/signup" className="text-indigo-600 hover:underline ml-1">
            Create One
          </Link>
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("Google Login Failed")}
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
