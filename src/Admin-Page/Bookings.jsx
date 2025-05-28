import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookings,
  deleteBooking,
  updateBookingStatus,
} from "../redux/slices/bookingSlice";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { FaTrash, FaEye, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../Alert";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import { getUserDetail } from "../redux/slices/authUtlis";

const Booking = ({ setUser }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;
  const user = getUserDetail();
  const [statusFilter, setStatusFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const {
    booking: bookings,
    totalBookings,
    totalPages,
    hasNextPage,
    hasPrevPage,
    error,
    loading,
  } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(
      getBookings({ page, limit, status: statusFilter, name: nameFilter })
    );
  }, [dispatch, page, limit, statusFilter, nameFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await dispatch(deleteBooking(id));
        if (response.payload.status) {
          dispatch(getBookings({ page, limit })); // Refresh bookings after deletion
          showSuccess(response.payload.message);
        }
      } catch (err) {
        showError("Failed to delete booking. Please try again.");
      }
    }
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await dispatch(
        updateBookingStatus({ id, status: newStatus })
      );
      if (response.payload.status) {
        showSuccess(response.payload.message);
        dispatch(getBookings({ page, limit }));
      } else {
        showError(
          response.payload.message || "Failed to update booking status."
        );
      }
    } catch (err) {
      showError("An error occurred while updating the booking status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "confirmed":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const columns = [
    { header: "S No.", render: (_, index) => index + 1 },
    { header: "Name", accessor: "name" },
    { header: "Mobile", accessor: "mobile" },
    {
      header: "Message",
      accessor: "message",
      className: "max-w-xs",
    },
    {
      header: "Status",
      render: (row) => (
        <select
          value={row.status}
          disabled={user?.role === "seller"}
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
          className={`border border-gray-300 rounded p-1 ${
            user?.role === "seller" ? "cursor-not-allowed" : "cursor-pointer"
          } ${getStatusColor(row.status)}`}
        >
          <option value="pending" className="bg-yellow-200 text-yellow-800">
            Pending
          </option>
          <option value="confirmed" className="bg-green-200 text-green-800">
            Confirmed
          </option>
          <option value="cancelled" className="bg-red-200 text-red-800">
            Cancelled
          </option>
        </select>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex space-x-3">
          <button
            onClick={() => handleViewProperty(row?.propertyId?._id)}
            className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 p-2 rounded-lg transition-colors"
            title="View"
          >
            <FaEye size={14} />
          </button>
          <button
            className={`bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg transition-colors ${
              user?.role === "seller" ? "opacity-50 pointer-events-none" : ""
            }`}
            title={
              user?.role === "seller"
                ? "Seller can't delete booking"
                : `Delete ${row.name}`
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
          <h2 className="text-2xl  font-bold mb-6 text-slate-700">Bookings</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3 mb-4 w-full">
            {/* Search Input with clear icon */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search by Name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="border rounded px-3 py-2 pr-8 w-full sm:w-[250px] focus:outline-none focus:ring-2 focus:ring-[#52b9b9]"
              />
              {nameFilter && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  onClick={() => setNameFilter("")}
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
                className="border rounded px-3 py-2 sm:w-50 xl:w-full focus:outline-none focus:ring-2 focus:ring-[#52b9b9]"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Booking Table */}
          <PaginatedTable
            columns={columns}
            data={bookings}
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            loading={loading}
            pageSize={limit} // Pass the page size
            totalItems={totalBookings} // Pass the total number of items
          />
        </div>
      </div>
    </div>
  );
};

export default Booking;
