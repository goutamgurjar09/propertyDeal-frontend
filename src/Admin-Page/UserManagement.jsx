import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../redux/slices/authSlice";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { showSuccess, showError } from "../Alert";
import { FaTrash } from "react-icons/fa";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import Loader from "../CommonComponent/Loader";

const UserManagement = ({ setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

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
    dispatch(getUsers({ page, limit }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await dispatch(deleteUser(id));
        if (response.payload.status) {
          showSuccess("User deleted successfully!");
          dispatch(getUsers({ page, limit })); // Refresh users after deletion
        } else {
          showError(response.payload.message || "Failed to delete user.");
        }
      } catch (err) {
        showError("Failed to delete user. Please try again.");
      }
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "fullname" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Mobile", accessor: "mobile" },
    {
      header: "Actions",
      render: (row) => (
        <button
          className="bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg transition-colors"
          title={`Delete ${row.fullname}`}
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
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  setUser={setUser} />
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
