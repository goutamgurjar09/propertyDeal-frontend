import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  updateUserRole,
} from "../redux/slices/authSlice";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { showSuccess, showError } from "../Alert";
import { FaTimes, FaTrash } from "react-icons/fa";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import Loader from "../CommonComponent/Loader";
import { getUserDetail } from "../redux/slices/authUtlis";

const UserManagement = ({ setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const user = getUserDetail();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const {
    users,
    totalUsers,
    totalPages,
    hasNextPage,
    hasPrevPage,
    error,
    loading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUsers({ page, limit, search, role: roleFilter }));
  }, [dispatch, page, limit, search, roleFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await dispatch(deleteUser(id));
        if (response.payload.status === "success") {
          showSuccess("User deleted successfully!");
          dispatch(getUsers({ page, limit, search, role: roleFilter })); // Refresh users after deletion
        } else {
          showError(response.payload.message || "Failed to delete user.");
        }
      } catch (err) {
        showError("Failed to delete user. Please try again.");
      }
    }
  };

  const handleUpdateRole = async (userId, role) => {
    try {
      const response = await dispatch(
        updateUserRole({ userId, newRole: role })
      );
      if (response.payload) {
        showSuccess(response.payload.message);
        dispatch(getUsers({ page, limit, search, role: roleFilter })); // Refresh users after role update
      } else {
        showError(response.payload.message || "Failed to update user role.");
      }
    } catch (err) {
      showError("An error occurred while updating the booking status.");
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "fullname" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      render: (row) => (
        <select
          value={row.role}
          disabled={user?.role === "seller"}
          onChange={(e) => handleUpdateRole(row._id, e.target.value)}
          className={`border border-gray-300 rounded p-1 ${
            user?.role === "seller" ? "cursor-not-allowed" : "cursor-pointer"
          }}`}
        >
          <option value="admin" className="bg-yellow-200 text-yellow-800">
            Admin
          </option>
          <option value="seller" className="bg-green-200 text-green-800">
            Seller
          </option>
          <option value="buyer" className="bg-red-200 text-red-800">
            Buyer
          </option>
        </select>
      ),
    },
    { header: "Mobile", accessor: "mobile" },
    {
      header: "Actions",
      render: (row) => (
        <button
          className={`bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg transition-colors ${
            user?.role === "seller" ? "opacity-50 pointer-events-none" : ""
          }`}
          title={
            user?.role === "seller"
              ? "Seller can't delete users"
              : `Delete ${row.fullname}`
          }
          disabled={user?.role === "seller"}
          onClick={() => handleDelete(row._id)}
        >
          <FaTrash size={14} />
        </button>
      ),
    },
  ];

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-70" : "w-0"
        } bg-gray-100 shadow-2xl overflow-hidden`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-2/3" : "w-full"
        } bg-white`}
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />
        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
          <h2 className="text-2xl font-bold mb-6 text-slate-700">Users List</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2 mb-4 w-full">
            {/* Search Input with clear icon */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 pr-8 w-full sm:w-[250px]"
              />
              {search && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  onClick={() => setSearch("")}
                  tabIndex={-1}
                >
                  <FaTimes />
                </button>
              )}
            </div>

            {/* Role Filter */}
            <div className="w-full sm:w-[200px]">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border rounded px-3 py-2 sm:w-full"
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="seller">Seller</option>
                <option value="buyer">Buyer</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <PaginatedTable
            columns={columns}
            data={users}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            loading={loading}
            pageSize={limit}
            totalItems={totalUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
