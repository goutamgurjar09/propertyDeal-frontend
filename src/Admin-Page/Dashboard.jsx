import { useState } from "react";
import { FaHome, FaChartBar, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link ,useNavigate } from "react-router-dom";
import {clearAuthSession } from "../redux/slices/authUtlis"; 
import { Properties } from "./Properties";
import UserManagement from "./UserManagement";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();


  const handleLogout = () => {
      clearAuthSession();
      navigate("/login");
  };
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      {/* <div className={`fixed z-50 w-64 h-full bg-gray-200 p-4 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Admin Dashboard</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl text-gray-900 cursor-pointer">
            <FaTimes />
          </button>
        </div>
        <nav className="space-y-2">
          <button className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
            <FaHome /> Dashboard
          </button>
          <button className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
            <FaUser /> User Management
          </button>
          <button className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
            <FaUser /> Property Management
          </button>
          <button className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
            <FaChartBar /> Reports & Analytics
          </button>
          <Link to="/login">
            <button onClick={handleLogout} className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
              <FaSignOutAlt /> Logout
            </button>
          </Link>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all bg-white ml-${sidebarOpen ? "64" : "0"}`}>
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl text-gray-900 cursor-pointer">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="text-lg font-bold">Welcome, Admin</div>
        </header>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-32">
          {["Total Properties", "Total Users", "Revenue"].map((item, index) => (
            <div key={index} className="p-6 bg-gray-100 shadow-md rounded-lg text-center hover:bg-gray-200">
              <h3 className="text-lg font-bold text-gray-900">{item}</h3>
              <p className="text-gray-600 font-semibold">
                {index === 2 ? "$120,000" : index === 1 ? "50 Registered" : "15 Listed"}
              </p>
            </div>
          ))}
        </div>

        {/* Property Management */}
          <div className="mt-6">
            <div className="flex justify-end mb-4">
              <Link to="/addProperty">
                <button className="flex p-3 bg-gray-300 rounded hover:bg-gray-400">
                  Add Property
                </button>
              </Link>
            </div>         
          <Properties/>
        </div>

        {/* User Management */}
         <UserManagement/>
       
      </div>
    </div>
  );
}