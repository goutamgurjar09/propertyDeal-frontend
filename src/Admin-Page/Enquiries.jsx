import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../Alert";
import Loader from "../CommonComponent/Loader";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import { deleteEnquiry, getEnquiries } from "../redux/slices/enquirySlices";

export const Enquiries = ({ setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

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
    dispatch(getEnquiries({ page, limit }));
  }, [dispatch, page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await dispatch(deleteEnquiry(id));
        if (response.payload.status) {
          dispatch(getEnquiries({ page, limit })); // Refresh bookings after deletion
          showSuccess(response.payload.message);
        }
      } catch (err) {
        showError("Failed to delete booking. Please try again.");
      }
    }
  };

  const columns = [
    { header: "Name", accessor: "fullname" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Email", accessor: "email" },
    { header: "Message", accessor: "message" },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleDelete(row._id)}
            className="text-red-500 hover:text-red-700"
            title="Delete Booking"
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
          <h2 className="text-2xl font-bold mb-6 text-slate-700">
            Enquiries
          </h2>

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
