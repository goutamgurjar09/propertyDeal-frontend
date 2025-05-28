import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../../CommonComponent/ProfileMenu";
import Sidebar from "./Sidebar";

const Header = ({ sidebarOpen, setSidebarOpen, setUser = null }) => {
  return (
    <>
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

      {sidebarOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar Drawer */}
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transition-transform md:hidden">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              setUser={setUser}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Header;
