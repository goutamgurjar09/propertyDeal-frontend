import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../../CommonComponent/ProfileMenu";

const Header = ({ sidebarOpen, setSidebarOpen, setUser = null }) => {
  return (
    <header className="flex items-center justify-between p-6 bg-white shadow-md">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-xl text-gray-900 cursor-pointer"
      >
        <FaBars />
      </button>
      <div className="flex items-center gap-4">
        <ProfileMenu setUser={setUser} />
      </div>
    </header>
  );
};

export default Header;
