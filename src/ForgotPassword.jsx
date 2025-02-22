import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword, verifyUser } from "./redux/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(forgotPassword({ email }));
    if (result.payload?.status === "success") {
      navigate("/login");
    }
  };
  const handleVerifyUser = async (e) => {
    e.preventDefault();

    const result = await dispatch(verifyUser({ otp, email }));
    if (result.payload?.data) {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gray-900 bg-center blur-lg opacity-30"></div>
      {location.pathname === "/forgetPassword" ? (
        <>
          {/* Card Container */}
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
            <h2 className="text-2xl font-semibold text-center text-gray-900">
              Forgot Password
            </h2>
            <p className="text-gray-900 text-center mt-2">
              Enter your email to reset your password
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div>
                <label className="block text-sm text-gray-900">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 bg-transparent border-b border-gray-900 text-gray-900 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
              >
                Send Reset Link
              </button>
            </form>

            <div className="text-center mt-4">
              <Link to="/login" className="text-gray-900 hover:underline">
                Back to Login
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Verify By OTP
          </h2>
          <form onSubmit={handleVerifyUser} className="mt-6">
            <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
              <label className="block text-sm text-gray-900">Email</label>

              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
                required
              />
            </div>
            <br />
            <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500">
              <label className="block text-sm text-gray-900">OTP</label>

              <input
                type="text"
                placeholder="Enter Your Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
            >
              Verify and Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
