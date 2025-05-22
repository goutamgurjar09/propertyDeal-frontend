import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../Pages/Layout/Sidebar";
import Header from "../../Pages/Layout/Header";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../Alert";
import Loader from "../../CommonComponent/Loader";
import PaginatedTable from "../../CommonComponent/PaginatedTable";
import {
  deleteCategory,
  getCategories,
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
    dispatch(getCategories({ page, limit }));
  }, [dispatch, page, limit]);

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

  const columns = [
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
      render: (row) =>
        row.status ? (
          <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">
            Active
          </span>
        ) : (
          <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs">
            Inactive
          </span>
        ),
    },
    {
      header: "Created At",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row._id)}
            className="text-blue-500 hover:text-blue-700"
            title="Edit"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700"
            title="Delete"
          >
            <FaTrash />
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
        {/* Sidebar */}
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
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setUser={setUser}
          />
          <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
            <div className="flex justify-between items-center mb-10 mt-2">
              <h2 className="text-2xl font-bold mb-6 text-slate-700">
                Categories
              </h2>

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
      >
        <AddCategoryForm
          setIsModalOpen={setIsModalOpen}
          userId={user.userId}
          id={editCategoryId}
          onSuccess={() => dispatch(getCategories({ page, limit }))}
        />
      </Modal>
    </>
  );
};
