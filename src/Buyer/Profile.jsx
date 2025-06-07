import React, { useEffect } from "react";
import { getInitials, getUserDetail } from "../redux/slices/authUtlis";
import { FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getUserDetailById } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../CommonComponent/Modal";
import ProfileUpdateForm from "../CommonComponent/ProfileUpdateForm";

const Profile = ({ setUser }) => {
  const userData = getUserDetail();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const { user, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getUserDetailById(userData?.userId));
  }, [dispatch, userData?.userId]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100">
      {/* Profile Card Container */}
      <main className="flex-grow p-8 mt-14">
        <Link to="/properties-list">
          <button className="mb-6 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
        </Link>

        <h2 className="text-3xl font-bold mb-8 text-slate-700">Profile</h2>
        <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
          <div className="flex items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
              {user?.profileImg ? (
                <img
                  src={user.profileImg}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-700">
                  {getInitials(user?.fullname || "U")}
                </div>
              )}

              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user?.fullname
                    ? user.fullname.charAt(0).toUpperCase() +
                      user.fullname.slice(1)
                    : "User"}
                </h2>
                <span className="inline-block mt-2 px-4 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) ||
                    "User"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end mb-6">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setIsModalOpen(true)}
              >
                Update Profile
              </button>
            </div>
          </div>
          <div className="space-y-6 text-gray-700 text-lg">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <span>{user?.email || "Not available"}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-green-500" />
              <span>{user?.mobile || "Not available"}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-purple-500" />
              <span>
                {user?.role?.charAt(0).toUpperCase() + user.role.slice(1) ||
                  "Not specified"}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Update Profile"
        size="h-[75%]  w-[90%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[35%]"
      >
        <ProfileUpdateForm
          userData={user}
          setIsModalOpen={setIsModalOpen}
          onSuccess={() => dispatch(getUserDetailById(userData?.userId))}
          loading={loading}
        />
      </Modal>
    </div>
  );
};

export default Profile;
