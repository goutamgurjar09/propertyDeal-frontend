import { useEffect, useState } from "react";
import { FaHome, FaChartBar, FaUser, FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import {clearAuthSession } from "../redux/slices/authUtlis"; 
import { useDispatch, useSelector } from "react-redux";
import { Properties } from "./Properties";


export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const { users, error ,loading} = useSelector((state) => state.auth);
//console.log(users);

  // useEffect(() => {
  //   dispatch(getUsers({ page: 1, limit: 10 }));
  // }, [dispatch]);

  // if (loading) return <p>Loading users...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  const handleLogout = () => {
      clearAuthSession();
      navigate("/login");
  };
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
            <button onClick={handleLogout} className="flex items-center gap-2 p-3 w-full bg-gray-300 rounded hover:bg-gray-400 text-left">
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
            <div className="flex justify-end mb-4">
              <Link to="/addProperty">
                <button className="flex p-3 bg-gray-300 rounded hover:bg-gray-400">
                  Add Property
                </button>
              </Link>
            </div>
          <h2 className="text-xl font-bold mb-4">Property Management</h2>
         
          <Properties/>
        </div>

        {/* User Management */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">User Management</h2>
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
                  {users?.map((user,index) => (
                    <tr key={index} className="border-b text-center">
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
              <div className="flex justify-between items-center px-4 py-3">
                <div className="text-sm text-slate-500">
                  Showing <b>1-5</b> of 45
                </div>
                <div className="flex space-x-1">
                  <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    Prev
                  </button>
                  <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                    1
                  </button>
                  <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    2
                  </button>
                  <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                    3
                  </button>
                  <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
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