import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "./redux/slices/authSlice"; // Ensure correct path
import { useNavigate } from "react-router-dom";
import { showSuccess } from "./Alert";

function SignupPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [fullname, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Create FormData object
    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("mobile", mobile);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("role", role);
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }
  
    const result = await dispatch(signupUser(formData));
    console.log(result);
  
    if (result.payload?.status === "Success") {
      navigate("/login");
      showSuccess(result.payload?.message);
    }
  };
  

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);

    setProfileImg(e.target.files[0]);
  };
  const handleImageChanges = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    console.log(files);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#005555] text-white p-4 relative">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-gray-900 bg-center blur-lg opacity-30"></div>

      <div className="w-full max-w-xl bg-white text-gray-900 p-10 rounded-lg shadow-2xl border border-gy-300 font-serif relative z-10">
        <h2 className="text-center text-3xl font-semibold mb-6">
          Create Your Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
              required
            />
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              type="tel"
              placeholder="Mobile No"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
              required
            />
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
              required
            />
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900 pr-10"
            />
          </div>
          <input type="file" multiple accept="image/*" onChange={handleImageChanges} />

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 bg-gray-900 py-2 my-4 rounded-full font-bold text-white transition duration-300 hover:bg-gray-700"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?
          <a href="/login" className="text-gray-900 hover:underline ml-1">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
