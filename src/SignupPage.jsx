import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "./Alert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z\s]+$/, "Full name must contain only letters and spaces")
    .min(3, "Full name must be at least 3 characters"),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

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

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

function SignupPage() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImg, setProfileImg] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    if (profileImg) formData.append("profileImg", profileImg);

    const result = await dispatch(signupUser(formData));
    if (result.payload?.status === "Success") {
      navigate("/login");
      showSuccess(result.payload?.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#e7e7e7] text-white p-4 relative mt-16">
      <div className="w-full max-w-xl bg-white text-[#112757]  font-serif p-10 rounded-lg shadow-2xl border-gy-300 relative z-10">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              {...register("fullname")}
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
            />
            {errors.fullname && (
              <p className="text-red-600 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              {...register("mobile")}
              type="tel"
              placeholder="Mobile No"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
            />
            {errors.mobile && (
              <p className="text-red-600 text-sm">{errors.mobile.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
            />
            <span
              className="absolute right-2 top-2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 relative">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
            />
            <span
              className="absolute right-2 top-2 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImg(e.target.files[0])}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 bg-[#112757] hover:bg-[#007777] py-2 my-4 rounded-full font-bold text-white transition duration-300"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <a href="/login" className="text-[#112757] hover:underline ml-1">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
