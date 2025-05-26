import React from "react";
import { getInitials, getUserDetail } from "../redux/slices/authUtlis";
import { FaEnvelope, FaPhone, FaShieldAlt } from "react-icons/fa";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";

const Profile = ({ setUser }) => {
  const user = getUserDetail();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0"
        } bg-white shadow-2xl overflow-hidden`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "ml-0" : "ml-0"
        }`}
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />

        {/* Profile Card Container */}
        <main className="flex-grow p-8">
          <h2 className="text-3xl font-bold mb-8 text-slate-700">Profile</h2>
          <div className="w-full mx-auto bg-white shadow-lg rounded-xl p-6">
            <div className="flex items-center gap-6 mb-8">
              {/* Profile Image or Initials */}
              {user?.profileImg ? (
                <img
                  src={user.profileImg}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
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
    </div>
  );
};

export default Profile;
