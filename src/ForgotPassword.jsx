import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  resetPassword,
  generateOtp,
  verifyUser,
} from "./redux/slices/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp_number, setOtpNumber] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [newPasswordField, setNewPasswordField] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result;

    // Step 1: Generate OTP
    if (!otpField && !newPasswordField) {
      if (!email) return alert("Email is required");
      result = await dispatch(generateOtp({ otp_type: "forgot", email }));
      console.log(result, "OTP Generation Result");

      if (result?.payload?.data?.otp_send) {
        setOtpField(true);
      } else {
        alert(result?.payload?.message || "Failed to send OTP");
      }

    // Step 2: Verify OTP
    } else if (otpField && !newPasswordField) {
      if (!otp_number) return alert("OTP is required");
      result = await dispatch(verifyUser({ otp_number, otp_type: "forgot", email }));
      console.log(result, "OTP Verification Result");

      if (result?.payload?.data?.otp_verified) {
        setNewPasswordField(true);
      } else {
        alert(result?.payload?.message || "Invalid OTP");
      }

    // Step 3: Reset Password
    } else if (newPasswordField) {
      if (!newPassword) return alert("New password is required");
      result = await dispatch(resetPassword({ email, otp_type: "forgot", newPassword }));
      console.log(result, "Password Reset Result");

      if (result?.payload?.status === "success") {
        alert("Password reset successful!");
        navigate("/login");
      } else {
        alert(result?.payload?.message || "Failed to reset password");
      }
    }
  };

  // For verification-only flow (e.g., /verify route)
  const handleGenerateOtpAndVerifyUser = async (e) => {
    e.preventDefault();
    if (!email) return alert("Email is required");

    const result = await dispatch(
      otpField
        ? verifyUser({ otp_number, otp_type: "varification", email })
        : generateOtp({ otp_type: "varification", email })
    );

    console.log(result);

    if (result?.payload?.data?.otp_send) {
      setOtpField(true);
    } else if (result?.payload?.data?.otp_verified) {
      navigate("/login");
    } else {
      alert(result?.payload?.message || "OTP process failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      <div className="absolute inset-0 bg-gray-900 bg-center blur-lg opacity-30"></div>

      {location.pathname === "/forgetPassword" ? (
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Forgot Password
          </h2>
          <p className="text-gray-900 text-center mt-2">
            Enter your email to reset your password
          </p>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Email Field */}
            <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
              <label className="block text-sm text-gray-900">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-transparent border-b border-gray-900 text-gray-900 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* OTP Field */}
            {otpField && (
              <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
                <label className="block text-sm text-gray-900">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp_number}
                  onChange={(e) => setOtpNumber(e.target.value)}
                  className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
                />
              </div>
            )}

            {/* New Password Field */}
            {newPasswordField && (
              <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
                <label className="block text-sm text-gray-900">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
            >
              {newPasswordField ? "Reset Password" : otpField ? "Verify OTP" : "Send OTP"}
            </button>
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-900 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      ) : (
        // OTP verification flow (not forgot password)
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Verify By OTP
          </h2>
          <form onSubmit={handleGenerateOtpAndVerifyUser} className="mt-6">
            <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
              <label className="block text-sm text-gray-900">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
              />
            </div>

            {otpField && (
              <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
                <label className="block text-sm text-gray-900">OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp_number}
                  onChange={(e) => setOtpNumber(e.target.value)}
                  className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
                  />
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
            >
              {otpField ? "Verify OTP" : "Send OTP"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
