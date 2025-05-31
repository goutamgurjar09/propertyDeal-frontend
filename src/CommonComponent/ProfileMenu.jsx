import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { clearAuthSession, getInitials, getUserDetail } from "../redux/slices/authUtlis";

const ProfileMenu = ({ setUser = null }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = getUserDetail();
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);

  const handleLogout = () => {
    clearAuthSession();
    setUser && setUser(null);
    navigate("/login");
  };

  const goToProfile = () => {
    setOpen(false);
    navigate(user?.role === "buyer" ? "/buyer-profile" : "/profile");
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <span
        onClick={toggleMenu}
        className="flex items-center gap-2 text-gray-800 font-medium hover:text-black focus:outline-none"
      >
        <span className="text-black font-bold">Welcome,</span>
        <span>
          {`${
            user?.full_name
              ? user.full_name.charAt(0).toUpperCase() + user.full_name.slice(1)
              : "User"
          }`}
        </span>
        {user?.profileImg ? (
          <img
            src={user.profileImg}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-700">
            {getInitials(user?.full_name || "U")}
          </div>
        )}
        <FaChevronDown className="text-xs cursor-pointer" />
      </span>

      {open && (
        <div className="absolute right-0 mt-4 border-gray-500 w-40 bg-white  rounded shadow-lg z-50">
          <button
            onClick={goToProfile}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left text-sm"
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 hover:bg-gray-100 text-left text-sm text-red-600"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
