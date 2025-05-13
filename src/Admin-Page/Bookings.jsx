import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookings, deleteBooking } from "../redux/slices/bookingSlice";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import Pagination from "../../src/CommonComponent/Pagination";
import { FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../Alert";
import Loader from "../CommonComponent/Loader";

const Booking = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

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
    dispatch(getBookings({ page, limit }));
  }, [dispatch, page]);

  // Calculate the range of bookings being displayed
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalBookings);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await dispatch(deleteBooking(id));
        if (response.payload.status) {
          dispatch(getBookings({ page, limit })); // Refresh bookings after deletion
          showSuccess(response.payload.message);
        }
      } catch (err) {
        console.error("Failed to delete booking:", err);
      }
    }
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/propertyDetails/${propertyId}`);
  };

  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

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
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
        {loading && <Loader/>}
          <h2 className="text-2xl text-center font-bold mb-6 text-slate-700">
            Bookings
          </h2>
          {/* Booking Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead className="bg-slate-200 text-slate-600 text-sm">
                <tr>
                  <th className="py-3 px-4 border text-left">Name</th>
                  <th className="py-3 px-4 border text-left">Mobile</th>
                  <th className="py-3 px-4 border text-left">Address</th>
                  <th className="py-3 px-4 border text-left">Date & Time</th>
                  <th className="py-3 px-4 border text-left">Message</th>
                  <th className="py-3 px-4 border text-left">Status</th>
                  <th className="py-3 px-4 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {bookings?.length > 0 ? (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="py-2 px-4 border">{booking.name}</td>
                      <td className="py-2 px-4 border">{booking.mobile}</td>
                      <td className="py-2 px-4 border">
                        {booking.propertyId?.location?.address || "N/A"}
                      </td>
                      <td className="py-2 px-4 border">
                        {new Date(booking.dateTime).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border">{booking.message}</td>
                      <td className="py-2 px-4 border capitalize">
                        {booking.status}
                      </td>
                      <td className="py-2 px-4 border text-center space-x-2">
                        <button
                          onClick={() =>
                            handleViewProperty(booking.propertyId?._id)
                          }
                          className="text-blue-500 hover:text-blue-700"
                          title="View Property"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(booking._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete Booking"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-4 px-4 text-center text-slate-400"
                    >
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-slate-500">
              Showing <b>{start}</b> to <b>{end}</b> of <b>{totalBookings}</b>{" "}
              bookings
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
