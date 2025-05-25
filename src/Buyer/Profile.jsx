import React from "react";
import { getUserDetail } from "../redux/slices/authUtlis";
import { FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { Link } from "react-router-dom";

const Profile = ({ setUser }) => {
  const user = getUserDetail();

  // Extract initials from full_name
  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

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
          <div className="flex items-center gap-6 mb-8">
            {/* Profile Image or Initials */}
            {user?.profileImg ? (
              <img
                src={user.profileImg}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-700">
                {getInitials(user?.full_name || "U")}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {user?.full_name
                  ? user.full_name.charAt(0).toUpperCase() +
                    user.full_name.slice(1)
                  : "User"}
              </h2>
              <span className="inline-block mt-2 px-4 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                {user?.role?.charAt(0).toUpperCase() + user.role.slice(1) ||
                  "User"}
              </span>
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
    </div>
  );
};

export default Profile;
