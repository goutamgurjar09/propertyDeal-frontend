import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Pages/Layout/Sidebar";
import Header from "../../Pages/Layout/Header";
import { FaTrash, FaEye, FaEdit, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../Alert";
import Loader from "../../CommonComponent/Loader";
import PaginatedTable from "../../CommonComponent/PaginatedTable";
import {
  deleteCategory,
  getCategories,
  updateCategoryStatus,
} from "../../redux/slices/categorySlice";
import AddCategoryForm from "./AddCategory";
import Modal from "../../CommonComponent/Modal";
import { getUserDetail } from "../../redux/slices/authUtlis";

export const Categories = ({ setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const user = getUserDetail();
  const {
    categories,
    totalCategories,
    totalPages,
    hasNextPage,
    hasPrevPage,
    error,
    loading,
  } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories({ page, limit, search, status: statusFilter }));
  }, [dispatch, page, limit, search, statusFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await dispatch(deleteCategory(id));
        if (response.payload.success) {
          dispatch(getCategories({ page, limit })); // Refresh bookings after deletion
          showSuccess(response.payload.message);
        }
      } catch (err) {
        showError("Failed to delete booking. Please try again.");
      }
    }
  };

  const handleEdit = (id) => {
    setEditCategoryId(id);
    setIsModalOpen(true);
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      const response = await dispatch(
        updateCategoryStatus({ categoryId: id, status: newStatus })
      );
      if (response.payload.status) {
        showSuccess(response.payload.message || "Status updated!");
        dispatch(getCategories({ page, limit, search, status: statusFilter })); // Refresh categories after status update
      } else {
        showError(
          response.payload.message || "Failed to update category status."
        );
      }
    } catch (err) {
      showError("An error occurred while updating the category status.");
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Category Name", accessor: "categoryName" },
    {
      header: "Sub Categories",
      render: (row) =>
        row.subCategories && row.subCategories.length > 0 ? (
          row.subCategories.map((sub, idx) => (
            <span
              key={idx}
              className={`inline-block px-2 py-1 mr-1 rounded text-xs ${
                sub.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {sub.name}
            </span>
          ))
        ) : (
          <span className="text-gray-400">No Sub Categories</span>
        ),
    },
    {
      header: "Status",
      render: (row) => (
        <select
          value={row.status}
          disabled={user?.role === "seller"}
          onChange={(e) => handleStatusToggle(row._id, e.target.value)}
          className={`ml-2 px-2 py-1 rounded border text-xs ${
            user?.role === "seller" ? "cursor-not-allowed" : "cursor-pointer"
          } ${
            row.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <option value="Active" className="bg-green-100 text-green-700">
            Active
          </option>
          <option value="Inactive" className="bg-red-100 text-red-700">
            Inactive
          </option>
        </select>
      ),
    },
    {
      header: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-3">
          <button
            className="bg-sky-100 text-sky-600 hover:bg-sky-200 p-2 rounded-lg transition-colors"
            title="Edit"
            onClick={() => handleEdit(row._id)}
          >
            <FaEdit size={14} />
          </button>
          <button
            className={`bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg transition-colors ${
              user?.role === "seller" ? "opacity-50 pointer-events-none" : ""
            }`}
            title={
              user?.role === "seller"
                ? "Seller can't delete category"
                : `Delete ${row.categoryName}`
            }
            disabled={user?.role === "seller"}
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash size={14} />
          </button>
        </div>
      ),
    },
  ];

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <>
      <div className="flex min-h-screen overflow-hidden">
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
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setUser={setUser}
          />
          <div className="mt-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
            <div className="flex justify-between items-center mb-10 mt-2">
              <h2 className="text-2xl font-bold text-slate-700">Categories</h2>

              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setEditCategoryId(null);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Category
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mb-6 w-full">
              {/* Search Input with clear icon */}
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by category name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border rounded px-3 py-2 pr-8 w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-[#52b9b9]"
                />
                {search && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                    onClick={() => setSearch("")}
                    tabIndex={-1}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <div className="w-full sm:w-[200px]">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border rounded px-3 py-2 sm:w-full focus:outline-none focus:ring-2 focus:ring-[#52b9b9]"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Booking Table */}
            <PaginatedTable
              columns={columns}
              data={categories}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              loading={loading}
              pageSize={limit} // Pass the page size
              totalItems={totalCategories} // Pass the total number of items
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Category"
        size="w-[30%] h-[55%]"
      >
        <AddCategoryForm
          setIsModalOpen={setIsModalOpen}
          userId={user?.userId}
          id={editCategoryId}
          onSuccess={() =>
            dispatch(
              getCategories({ page, limit, search, status: statusFilter })
            )
          }
        />
      </Modal>
    </>
  );
};
