import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { googleAuth, loginUser } from "./redux/slices/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { showError, showSuccess } from "./Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter (A-Z)"
    )
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter (a-z)"
    )
    .matches(/[0-9]/, "Password must contain at least one number (0-9)")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@$!%*?&)"
    ),
});

function LoginPage({ setUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { payload } = await dispatch(loginUser(data));

      if (payload?.data) {
        const { accessToken, isVerified, role } = payload.data;
        if (accessToken) {
          if (isVerified) {
            showSuccess(payload.message || "Login successful!");
            navigate(role === "admin" ? "/dashboard" : "/properties-list");
            setUser(payload.data);
          } else {
            showError("Please verify your email to complete the login.");
            navigate("/verify");
          }
        } else {
          showError("Login failed. Try again.");
        }
      } else {
        showError(payload.message || "Login failed. Try again.");
      }
    } catch (error) {
      showError("An unexpected error occurred during login.");
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const tokenId = response?.credential;
      if (!tokenId) return showError("Invalid Google response.");

      const result = await dispatch(
        googleAuth({ tokenId, role: selectedRole || null })
      );

      if (result.error) {
        const msg = result?.payload?.message;
        if (msg)
          return showError(
            "Please select a role before continuing with Google login."
          );
        return showError(msg || "Google login failed");
      }

      const user = result.payload?.data;
      if (user?.accessToken) {
        showSuccess("Login successful");
        navigate(user.role === "admin" ? "/dashboard" : "/properties-list");
      } else {
        navigate("/");
      }
    } catch (error) {
      showError("Google login error. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#005555] text-white p-4 relative">
      <div className="absolute inset-0 bg-[url('/path-to-your-image.jpg')] bg-cover bg-center blur-lg opacity-30"></div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
        <h2 className="text-center text-3xl font-serif font-semibold mb-6 text-[#005555]">
          Log In
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full border-b border-gray-900 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="w-full bg-transparent p-2 outline-none text-gray-800 placeholder-gray-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="w-full border-b border-gray-900 focus-within:border-indigo-500 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full bg-transparent p-2 outline-none text-gray-800 placeholder-gray-500 pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Link
            to="/forgetPassword"
            className="block text-end text-sm font-semibold text-[#005555] hover:text-gray-600 mt-4"
          >
            FORGOT PASSWORD?
          </Link>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 bg-[#005555] hover:bg-[#007777]  py-2 mt-4 rounded-full font-bold text-white transition duration-300 "
            >
              LOGIN
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          No account?
          <Link to="/signup" className="text-[#005555] hover:underline ml-1">
            Create One
          </Link>
        </p>

        <div className="flex justify-center items-center mt-4 gap-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => showError("Google Login Failed")}
          />

          <select
            className="border border-gray-300 rounded p-2 text-[#005555]"
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
