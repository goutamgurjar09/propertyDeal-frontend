import { useState } from "react";
import img from "../assets/image copy.png"
import { FaHome, FaChartBar, FaUser, FaBars, FaTimes } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", revenue: 5000 },
  { name: "Feb", revenue: 7000 },
  { name: "Mar", revenue: 8000 },
  { name: "Apr", revenue: 6000 },
  { name: "May", revenue: 9000 },
];

const properties = [
  {
    id: 1,
    name: "Luxury Villa",
    location: "New York",
    type: "Villa",
    image: img,
  },
  {
    id: 2,
    name: "Modern Apartment",
    location: "Los Angeles",
    type: "Apartment",
    image: img,
  },
  {
    id: 3,
    name: "Beach House",
    location: "Miami",
    type: "House",
    image: img,
  },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    role: "Agent",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Buyer",
    email: "jane@example.com",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Seller",
    email: "michael@example.com",
    status: "Active",
  },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <div
        className={`fixed z-50 w-64 h-full min-h-screen bg-gray-200 text-gray-900 p-4 transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold">Admin Dashboard</span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl text-gray-900"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav className="space-y-4">
          <button className="flex items-center gap-2 p-2 hover:bg-blue-500 rounded">
            <FaHome /> Dashboard
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-blue-500 rounded">
            <FaUser /> User Management
          </button>
          <button className="flex items-center gap-2 p-2 hover:bg-blue-500 rounded">
            <FaChartBar /> Reports & Analytics
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 transition-all bg-gray-100 text-gray-900 ml-64 min-h-screen`}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-xl text-gray-900"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <div className="text-lg font-bold">Welcome, Admin</div>
        </header>

        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-32">
          {["Total Properties", "Total Users", "Revenue"].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-md rounded-lg text-center hover:bg-gray-300"
            >
              <h3 className="text-lg font-bold text-gray-900">{item}</h3>
              <p className="text-blue-600 font-semibold">
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
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Property Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg"
              >
                <img
                  src={property.image}
                  alt={property.name}
                  className="rounded w-full mb-2"
                />
                <h3 className="text-lg font-bold">{property.name}</h3>
                <p className="text-gray-600">
                  {property.location} - {property.type}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-300 text-gray-900">
                <th className="border border-gray-400 p-2">Name</th>
                <th className="border border-gray-400 p-2">Role</th>
                <th className="border border-gray-400 p-2">Email</th>
                <th className="border border-gray-400 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="text-center bg-white hover:bg-gray-300"
                >
                  <td className="border border-gray-400 p-2">{user.name}</td>
                  <td className="border border-gray-400 p-2">{user.role}</td>
                  <td className="border border-gray-400 p-2">{user.email}</td>
                  <td
                    className={`border border-gray-400 p-2 font-bold ${
                      user.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
