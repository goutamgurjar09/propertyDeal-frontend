// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { resetPassword, generateOtp } from "./redux/slices/authSlice";
// import { showError, showSuccess } from "./Alert";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [otp_number, setOtpNumber] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Step 1: Send OTP
//     if (!otpSent) {
//       if (!email) return alert("Email is required");

//       const result = await dispatch(generateOtp({ email }));

//       if (result?.payload?.data?.otp_send) {
//         setOtpSent(true);
//         showSuccess(result?.payload?.message || "OTP sent successfully");
//       } else {
//         showError(result?.payload?.message || "Failed to send OTP");
//       }

//       // Step 2: Reset Password with OTP
//     } else {
//       if (!otp_number || !newPassword || !confirmPassword) {
//         return showError("All fields are required");
//       }

//       if (newPassword !== confirmPassword) {
//         return showError("Passwords do not match");
//       }

//       const result = await dispatch(
//         resetPassword({ email, otp_number, newPassword })
//       );

//       if (result?.payload?.status === "success") {
//         showSuccess(result?.payload?.message || "Password reset successful!");
//         navigate("/login");
//       } else {
//         showError(result?.payload?.message || "Failed to reset password");
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
//       <div className="absolute inset-0 bg-gray-900 bg-center blur-lg opacity-30"></div>

//       {location.pathname === "/forgetPassword" && (
//         <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
//           <h2 className="text-2xl font-semibold text-center text-gray-900">
//             Forgot Password
//           </h2>
//           <p className="text-gray-900 text-center mt-2">
//             {otpSent
//               ? "Enter OTP and new password"
//               : "Enter your email to reset your password"}
//           </p>

//           <form onSubmit={handleSubmit} className="mt-6">
//             {/* Email Field */}
//             <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
//               <label className="block text-sm text-gray-900">Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 mt-2 bg-transparent border-b border-gray-900 text-gray-900 focus:outline-none focus:border-indigo-500"
//                 disabled={otpSent}
//               />
//             </div>

//             {/* OTP Field */}
//             {otpSent && (
//               <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
//                 <label className="block text-sm text-gray-900">OTP</label>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp_number}
//                   onChange={(e) => setOtpNumber(e.target.value)}
//                   className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
//                 />
//               </div>
//             )}

//             {/* New Password Field */}
//             {otpSent && (
//               <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
//                 <label className="block text-sm text-gray-900">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
//                 />
//               </div>
//             )}

//             {/* Confirm Password Field */}
//             {otpSent && (
//               <div className="w-full border-b-2 border-gray-900 focus-within:border-indigo-500 mb-4">
//                 <label className="block text-sm text-gray-900">
//                   Confirm Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Confirm new password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full bg-transparent p-2 outline-none placeholder-gray-500 text-gray-900"
//                 />
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
//             >
//               {otpSent ? "Reset Password" : "Send OTP"}
//             </button>
//           </form>

//           <div className="text-center mt-4">
//             <Link to="/login" className="text-gray-900 hover:underline">
//               Back to Login
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ForgotPassword;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword, generateOtp } from "./redux/slices/authSlice";
import { showError, showSuccess } from "./Alert";
import Modal from "./CommonComponent/Modal";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp_number, setOtpNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetModal, setShowResetModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) return showError("Email is required");

    const result = await dispatch(generateOtp({ email }));

    if (result?.payload?.data?.otp_send) {
      setShowResetModal(true); // Show modal after successful OTP send
      showSuccess(result?.payload?.message || "OTP sent successfully");
    } else {
      showError(result?.payload?.message || "Failed to send OTP");
    }
  };

  // Step 2: Reset Password from Modal
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp_number || !newPassword || !confirmPassword) {
      return showError("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return showError("Passwords do not match");
    }

    const result = await dispatch(
      resetPassword({ email, otp_number, newPassword })
    );

    if (result?.payload?.status === "success") {
      showSuccess(result?.payload?.message || "Password reset successful!");
      setShowResetModal(false);
      navigate("/login");
    } else {
      showError(result?.payload?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4 relative">
      <div className="absolute inset-0 bg-gray-900 bg-center blur-lg opacity-30"></div>

      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative z-10">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Forgot Password
        </h2>
        <p className="text-gray-900 text-center mt-2">
          Enter your email to receive an OTP
        </p>

        <form onSubmit={handleSendOtp} className="mt-6">
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

          <button
            type="submit"
            className="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white py-2 rounded-md transition"
          >
            Send OTP
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="text-gray-900 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>

      <Modal
        isOpen={showResetModal}
        onClose={() => setIsModalOpen(false)}
        title="Reset Password"
        size="h-[70%]"
      >
        <form onSubmit={handleResetPassword} className="mt-4">
          {/* OTP */}
          <div className="mb-4">
            <label className="block text-sm text-gray-900 mb-1">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp_number}
              onChange={(e) => setOtpNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>

          {/* New Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-900 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm text-gray-900 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setShowResetModal(false)}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Reset Password
            </button>
          </div>
        </form>
      </Modal>
      {/* Password Reset Modal */}
    </div>
  );
};

export default ForgotPassword;
