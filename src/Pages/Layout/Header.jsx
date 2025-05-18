import React from "react";
import { FaBars } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { clearAuthSession, getUserDetail } from "../../redux/slices/authUtlis";
import { useNavigate } from "react-router-dom";

const Header = ({ sidebarOpen, setSidebarOpen, setUser=null }) => {
  const navigate = useNavigate();
  const user = getUserDetail();

  const handleLogout = () => {
    clearAuthSession();
    setUser && setUser(null);
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-xl text-gray-900 cursor-pointer"
      >
        <FaBars />
      </button>

      {/* Welcome Message */}
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">Welcome, {user?.full_name}</span>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
