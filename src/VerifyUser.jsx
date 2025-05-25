import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { generateOtp, verifyUser } from "./redux/slices/authSlice";
import { showError, showSuccess } from "./Alert";
import { getUserDetail } from "./redux/slices/authUtlis";

const VerifyUser = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUserDetail();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = otpSent
      ? verifyUser({ otp_number: otp, otp_type: "varification", email })
      : generateOtp({ otp_type: "varification", email });

    const result = await dispatch(action);

    if (result.payload?.data?.otp_send) {
      setOtpSent(true);
      showSuccess("OTP sent successfully! Please check your email.");
    } else if (result.payload?.data?.otp_verified) {
      showSuccess("OTP verified successfully!");
      navigate(user?.role === "buyer" ? "/properties-list" : "/dashboard"); // Or wherever you want to redirect
    } else if (result.payload?.message) {
      showError(result.payload.message); // Show any error message returned by the API
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-900">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full border p-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {otpSent && (
          <>
            <label className="block mb-2">OTP</label>
            <input
              type="text"
              className="w-full border p-2 mb-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </>
        )}

        <button className="w-full bg-gray-900 text-white py-2 rounded">
          {otpSent ? "Verify OTP" : "Send OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyUser;
