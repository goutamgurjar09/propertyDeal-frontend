import { useEffect, useState } from "react";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/slices/propertySlice";
import { getUsers } from "../redux/slices/authSlice";
import { getBookings } from "../redux/slices/bookingSlice";
import { getEnquiries } from "../redux/slices/enquirySlices";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperties({ page: 1, limit: 10 }));
    dispatch(getUsers({ page: 1, limit: 10 }));
    dispatch(getBookings({ page: 1, limit: 10 }));
    dispatch(getEnquiries({ page: 1, limit: 10 }));
  }, [dispatch]);

  const { totalProperties } = useSelector((state) => state.property);
  const { totalUsers } = useSelector((state) => state.auth);
  const { totalBookings } = useSelector((state) => state.booking);
  const { totalEnquiries } = useSelector((state) => state.enquiry);

  const stats = [
    { title: "Total Properties", value: totalProperties },
    { title: "Total Users", value: `${totalUsers}` },
    { title: "Total Bookings", value: totalBookings },
    { title: "Total Enquiries", value: totalEnquiries },
    { title: "Revenue", value: "$120,000" },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0"
        } bg-gray-100 shadow-2xl overflow-hidden`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-full md:w-5/6" : "w-full"
        } bg-white`}
      >
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 shadow-md rounded-lg text-center hover:bg-gray-200 transition"
            >
              <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-700 font-semibold text-xl mt-2">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
