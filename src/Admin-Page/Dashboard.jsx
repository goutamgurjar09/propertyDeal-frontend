import { useEffect, useState } from "react";
import img from "../assets/image copy.png";
import { FaHome, FaChartBar, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slices/userSlice";

const properties = [
  { id: 1, name: "Luxury Villa", location: "New York", type: "Villa", image: img },
  { id: 2, name: "Modern Apartment", location: "Los Angeles", type: "Apartment", image: img },
  { id: 3, name: "Beach House", location: "Miami", type: "House", image: img },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { userData, status, error } = useSelector((state) => state.user);
  console.log(userData);
  
  
  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <div className={`fixed z-50 w-64 h-full bg-gray-200 p-4 transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
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
            <button onClick={() => Cookies.remove("accessToken")} className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
              <FaSignOutAlt /> Logout
            </button>
          </Link>
        </nav>
      </div>

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
          <h2 className="text-xl font-bold mb-4">Property Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg">
                <img src={property.image} alt={property.name} className="rounded w-full mb-2" />
                <h3 className="text-lg font-bold">{property.name}</h3>
                <p className="text-gray-600">{property.location} - {property.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* User Management */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
          {/* <table className="w-full border-collapse border border-gray-300">
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
                <tr key={user.id} className="text-center bg-white hover:bg-gray-200">
                  <td className="border border-gray-400 p-2">{user.name}</td>
                  <td className="border border-gray-400 p-2">{user.role}</td>
                  <td className="border border-gray-400 p-2">{user.email}</td>
                  <td className="border border-gray-400 p-2 font-bold text-gray-600">
                    {user.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
              <th className="py-2 px-4 border">Mobile</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user) => (
              <tr key={user.id} className="border-b text-center">
                <td className="py-2 px-4 border">{user.fullname}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.role}</td>
                <td className="py-2 px-4 border">{user.mobile}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                    // onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                    // onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="flex justify-between items-center px-4 py-3">
        <div class="text-sm text-slate-500">
        Showing <b>1-5</b> of 45
        </div>
        <div class="flex space-x-1">
        <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            Prev
        </button>
        <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
            1
        </button>
        <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            2
        </button>
        <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            3
        </button>
        <button class="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
            Next
        </button>
        </div>
        </div>
      </div>
      </div>
        </div>
      </div>
    </div>
  );
}