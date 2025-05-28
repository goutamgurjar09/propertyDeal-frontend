import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { FaTrash, FaEye, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../Alert";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import { deleteEnquiry, getEnquiries } from "../redux/slices/enquirySlices";
import { getUserDetail } from "../redux/slices/authUtlis";

export const Enquiries = ({ setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const user = getUserDetail();
  const [search, setSearch] = useState("");

  const {
    enquiryData,
    totalEnquiries,
    totalPages,
    hasNextPage,
    hasPrevPage,
    error,
    loading,
  } = useSelector((state) => state.enquiry);

  useEffect(() => {
    dispatch(getEnquiries({ page, limit, search }));
  }, [dispatch, page, search, limit]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await dispatch(deleteEnquiry(id));
        if (response.payload.status) {
          dispatch(getEnquiries({ page, limit, search })); // Refresh bookings after deletion
          showSuccess(response.payload.message);
        } else {
          showError(response.payload.message || "Failed to delete booking.");
        }
      } catch (err) {
        showError("Failed to delete booking. Please try again.");
      }
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "fullname" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Email", accessor: "email" },
    { header: "Message", accessor: "message", className: "max-w-xs" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            className={`bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg transition-colors ${
              user?.role === "seller" ? "opacity-50 pointer-events-none" : ""
            }`}
            title={
              user?.role === "seller"
                ? "Seller can't delete enquiry"
                : `Delete ${row.fullname}`
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
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />
        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
          <h2 className="text-2xl font-bold mb-6 text-slate-700">Enquiries</h2>

          <div className="flex gap-4 mb-6">
            {/* Search Input with clear icon */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by category name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-2 pr-8"
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
          </div>

          {/* Booking Table */}
          <PaginatedTable
            columns={columns}
            data={enquiryData}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            loading={loading}
            pageSize={limit} // Pass the page size
            totalItems={totalEnquiries} // Pass the total number of items
          />
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
