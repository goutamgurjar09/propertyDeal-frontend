import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/slices/authSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserManagement = () => {
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

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalUsers);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
      <h2 className="text-2xl text-center font-bold mb-6 text-slate-700">
        User Management
      </h2>
      {loading && <p className="text-center text-slate-500">Loading...</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
          <thead className="bg-slate-200 text-slate-600 text-sm">
            <tr>
              <th className="py-3 px-4 border text-left">Name</th>
              <th className="py-3 px-4 border text-left">Email</th>
              <th className="py-3 px-4 border text-left">Role</th>
              <th className="py-3 px-4 border text-left">Mobile</th>
              <th className="py-3 px-4 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            {users?.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4 border">{user.fullname}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border capitalize">{user.role}</td>
                  <td className="py-2 px-4 border">{user.mobile}</td>
                  <td className="py-2 px-4 border text-center space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                      // onClick={() => handleEdit(user._id)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                      // onClick={() => handleDelete(user._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 px-4 text-center text-slate-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center px-2 py-4 gap-3">
        <div className="text-sm text-slate-500">
          Showing <b>{start}</b> to <b>{end}</b> of <b>{totalUsers}</b>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!hasPrevPage}
            className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 text-sm rounded border ${
                num === page
                  ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                  : "text-slate-600 bg-white border-slate-300 hover:bg-slate-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!hasNextPage}
            className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
