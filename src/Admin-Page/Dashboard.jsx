import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../redux/slices/authUtlis";
import { useDispatch, useSelector } from "react-redux";
import { Properties } from "./Properties";
import Sidebar from "../Pages/Sidebar";
import UserManagement from "./UserManagement";
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.auth);
  //console.log(users);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-70" : "w-0"
        } bg-gray-100 shadow-2xl overflow-hidden`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-2/3" : "w-full"
        } bg-white`}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl text-gray-900 cursor-pointer"
          >
            <FaBars />
          </button>
          <div className="text-lg font-bold">Welcome, Admin</div>
        </header>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-32 p-6">
          {["Total Properties", "Total Users", "Revenue"].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 shadow-md rounded-lg text-center hover:bg-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-900">{item}</h3>
              <p className="text-gray-600 font-semibold">
                {index === 2
                  ? "$120,000"
                  : index === 1
                  ? "50 Registered"
                  : "15 Listed"}
              </p>
            </div>
          ))}
        </div>

        {/* Property Management */}
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <Link to="/addProperty">
              <button className="flex p-3 bg-blue-500 rounded hover:bg-blue-400 text-white">
                Add Property
              </button>
            </Link>
          </div>
          <Properties />
        </div>

        {/* User Management */}
        <UserManagement />
      </div>
    </div>
  );
}
