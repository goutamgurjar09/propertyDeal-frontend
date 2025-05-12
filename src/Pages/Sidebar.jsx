import React from "react";
import { FaHome, FaUser, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ sidebarOpen, setSidebarOpen, handleLogout }) => {
  const location = useLocation(); // Get the current path

  const isActive = (path) => location.pathname === path; // Check if the path matches the current route

  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center mb-10 mt-2">
        <span className="text-xl font-bold">Admin Dashboard</span>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-xl text-gray-900 cursor-pointer"
        >
          <RxCross2 size={22} />
        </button>
      </div>
      <nav className="space-y-2 flex flex-col gap-1">
        <Link to="/dashboard">
          <button
            className={`flex items-center gap-2 p-3 w-full rounded text-left ${
              isActive("/dashboard")
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <FaHome /> Dashboard
          </button>
        </Link>
        <Link to="/users">
          <button
            className={`flex items-center gap-2 p-3 w-full rounded text-left ${
              isActive("/users")
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <FaUser /> User Management
          </button>
        </Link>
        <Link to="/properties">
          <button
            className={`flex items-center gap-2 p-3 w-full rounded text-left ${
              isActive("/properties")
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <FaChartBar /> Property Management
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 w-full bg-gray-200 rounded hover:bg-gray-300 text-left"
        >
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;