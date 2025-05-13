import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { useSelector } from "react-redux";
export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { totalProperties } = useSelector((state) => state.property);
  const { totalUsers } = useSelector((state) => state.auth);
  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-70" : "w-0"
        } bg-gray-100 shadow-2xl overflow-hidden`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-2/3" : "w-full"
        } bg-white`}
      >
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                  ? `${totalUsers} Registered`
                  : totalProperties}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
