// import { useEffect, useState } from "react";
// import Sidebar from "../Pages/Layout/Sidebar";
// import Header from "../Pages/Layout/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { getProperties } from "../redux/slices/propertySlice";
// import { getUsers } from "../redux/slices/authSlice";
// import { getBookings, getTotalRevenue } from "../redux/slices/bookingSlice";
// import { getEnquiries } from "../redux/slices/enquirySlices";
// import { getTrackViewersCount } from "../redux/slices/trackViewers";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import { Link } from "react-router-dom";
// import MetricsPieChart from "../CommonComponent/PieChart";
// export default function Dashboard({ setUser }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getProperties({ page: 1, limit: 10 }));
//     dispatch(getUsers({ page: 1, limit: 10 }));
//     dispatch(getBookings({ page: 1, limit: 10 }));
//     dispatch(getEnquiries({ page: 1, limit: 10 }));
//     dispatch(getTrackViewersCount());
//     dispatch(getTotalRevenue());
//   }, [dispatch]);

//   const {
//     viewers: { trackViewersCount },
//     property: { totalProperties },
//     auth: { totalUsers },
//     booking: {
//       totalBookings,
//       totalRevenueData,
//       totalConfirmedBookings,
//       totalPendingBookings,
//     },
//     enquiry: { totalEnquiries },
//   } = useSelector((state) => state);

//   const totalRevenueCalculated =
//     totalRevenueData?.bookings?.reduce(
//       (sum, item) => sum + item.totalRevenue,
//       0
//     ) || 0;

//   const stats = [
//     { title: "Total Properties", value: totalProperties, path: "/properties" },
//     { title: "Total Users", value: `${totalUsers}`, path: "/users" },
//     { title: "Total Bookings", value: totalBookings, path: "/bookings" },
//     {
//       title: "Total Confirmed Bookings",
//       value: totalConfirmedBookings,
//       path: "/bookings",
//     },
//     {
//       title: "Total Pending Bookings",
//       value: totalPendingBookings,
//       path: "/bookings",
//     },
//     { title: "Total Enquiries", value: totalEnquiries, path: "/enquiries" },
//     { title: "Total Visiters", value: trackViewersCount },
//     {
//       title: "Total Revenue",
//       value: totalRevenueCalculated.toLocaleString() || 0,
//     },
//   ];

//   // Convert date to "MMM" format
//   const monthShortNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const revenueByDate =
//     totalRevenueData && Array.isArray(totalRevenueData.bookings)
//       ? totalRevenueData.bookings.reduce((acc, item) => {
//           const month = item._id.month - 1; // MongoDB months are 1-indexed
//           const year = item._id.year;
//           const label = `${monthShortNames[month]} ${year}`;
//           acc[label] = item.totalRevenue;
//           return acc;
//         }, {})
//       : {};

//   const highChartData = Object.entries(revenueByDate).map(
//     ([date, revenue]) => ({
//       date,
//       revenue,
//     })
//   );

//   const highChartOptions = {
//     chart: {
//       type: "column",
//       backgroundColor: "#f9fafb",
//     },
//     title: {
//       text: "Monthly Revenue Chart",
//     },
//     xAxis: {
//       categories: highChartData.map((item) => item.date),
//       labels: {
//         rotation: -45,
//       },
//       title: {
//         text: "Month",
//       },
//     },
//     yAxis: {
//       min: 0,
//       title: {
//         text: "Revenue (₹)",
//       },
//     },
//     tooltip: {
//       pointFormat: "Revenue: <b>₹{point.y}</b>",
//     },
//     series: [
//       {
//         name: "Revenue",
//         data: highChartData.map((item) => item.revenue),
//         color: {
//           linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
//           stops: [
//             [0, "#f472b6"], // pink at top
//             [0.5, "#60A5FA"], // blue in middle
//             [1, "#ef4444"], // red at bottom
//           ],
//         },
//       },
//     ],
//   };

  
//   return (
//     <div className="flex min-h-screen overflow-hidden">
//       {/* Sidebar */}
//       <div
//         className={`transition-all duration-300 ${
//           sidebarOpen ? "w-72" : "w-0"
//         } bg-gray-100 shadow-2xl overflow-hidden`}
//       >
//         <Sidebar
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           setUser={setUser}
//         />
//       </div>

//       {/* Main Content */}
//       <div
//         className={`flex-1 transition-all duration-300 ${
//           sidebarOpen ? "w-full md:w-5/6" : "w-full"
//         } bg-white`}
//       >
//         {/* Header */}
//         <Header
//           sidebarOpen={sidebarOpen}
//           setSidebarOpen={setSidebarOpen}
//           setUser={setUser}
//         />

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
//           {stats.map((item, index) => (
//             <Link to={item?.path || ""}>
//               <div
//                 key={index}
//                 className="p-6 bg-gray-100 shadow-md rounded-lg text-center hover:bg-gray-200 transition"
//               >
//                 <h3 className="text-lg font-bold text-gray-900">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-700 font-semibold text-xl mt-2">
//                   {item.value}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="max-w-6xl mx-auto mt-8 p-8 bg-gray-100 shadow-md rounded-lg mb-10">
//           <MetricsPieChart
//             totalBookings={totalBookings}
//             totalConfirmedBookings={totalConfirmedBookings}
//             totalPendingBookings={totalPendingBookings}
//             totalProperties={totalProperties}
//             totalUsers={totalUsers}
//             totalEnquiries={totalEnquiries}
//             totalRevenue={totalRevenueCalculated}
//           />
//         </div>

//         <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-lg mb-8">
//           <HighchartsReact highcharts={Highcharts} options={highChartOptions} />
//         </div>
//       </div>
//     </div>
//   );
// }
//----------------------
import { useEffect, useState } from "react";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/slices/propertySlice";
import { getUsers } from "../redux/slices/authSlice";
import { getBookings, getTotalRevenue } from "../redux/slices/bookingSlice";
import { getEnquiries } from "../redux/slices/enquirySlices";
import { getTrackViewersCount } from "../redux/slices/trackViewers";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Link } from "react-router-dom";
import MetricsPieChart from "../CommonComponent/PieChart";

export default function Dashboard({ setUser }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProperties({ page: 1, limit: 10 }));
    dispatch(getUsers({ page: 1, limit: 10 }));
    dispatch(getBookings({ page: 1, limit: 10 }));
    dispatch(getEnquiries({ page: 1, limit: 10 }));
    dispatch(getTrackViewersCount());
    dispatch(getTotalRevenue());
  }, [dispatch]);

  const trackViewersCount = useSelector((state) => state.viewers.trackViewersCount);
const totalProperties = useSelector((state) => state.property.totalProperties);
const totalUsers = useSelector((state) => state.auth.totalUsers);
const {
  totalBookings,
  totalRevenueData,
  totalConfirmedBookings,
  totalPendingBookings,
} = useSelector((state) => state.booking);
const totalEnquiries = useSelector((state) => state.enquiry.totalEnquiries);

  
  const totalRevenueCalculated =
    totalRevenueData?.bookings?.reduce(
      (sum, item) => sum + item.totalRevenue,
      0
    ) || 0;

  const stats = [
    { title: "Total Properties", value: totalProperties, path: "/properties" },
    { title: "Total Users", value: `${totalUsers}`, path: "/users" },
    { title: "Total Bookings", value: totalBookings, path: "/bookings" },
    {
      title: "Total Confirmed Bookings",
      value: totalConfirmedBookings,
      path: "/bookings",
    },
    {
      title: "Total Pending Bookings",
      value: totalPendingBookings,
      path: "/bookings",
    },
    { title: "Total Enquiries", value: totalEnquiries, path: "/enquiries" },
    { title: "Total Visiters", value: trackViewersCount },
    {
      title: "Total Revenue",
      value: totalRevenueCalculated.toLocaleString() || 0,
    },
  ];

  const monthShortNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueByDate =
    totalRevenueData && Array.isArray(totalRevenueData.bookings)
      ? totalRevenueData.bookings.reduce((acc, item) => {
          const month = item._id.month - 1;
          const year = item._id.year;
          const label = `${monthShortNames[month]} ${year}`;
          acc[label] = item.totalRevenue;
          return acc;
        }, {})
      : {};

  const highChartData = Object.entries(revenueByDate).map(([date, revenue]) => ({
    date,
    revenue,
  }));

  const highChartOptions = {
    chart: {
      type: "column",
      backgroundColor: "#f9fafb",
    },
    title: {
      text: "Monthly Revenue Chart",
    },
    xAxis: {
      categories: highChartData.map((item) => item.date),
      labels: {
        rotation: -45,
      },
      title: {
        text: "Month",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Revenue (₹)",
      },
    },
    tooltip: {
      pointFormat: "Revenue: <b>₹{point.y}</b>",
    },
    series: [
      {
        name: "Revenue",
        data: highChartData.map((item) => item.revenue),
        color: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "#f472b6"],
            [0.5, "#60A5FA"],
            [1, "#ef4444"],
          ],
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-72" : "w-0"
        } bg-gray-100 shadow-2xl overflow-hidden`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-full md:w-5/6" : "w-full"
        } bg-white`}
      >
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 p-6">
          {stats.map((item) => (
            <Link key={item.title} to={item?.path || ""}>
              <div className="p-6 bg-gray-100 shadow-md rounded-lg text-center hover:bg-gray-200 transition">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-700 font-semibold text-xl mt-2">{item.value}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-8 p-8 bg-gray-100 shadow-md rounded-lg mb-10">
          <MetricsPieChart
            totalBookings={totalBookings}
            totalConfirmedBookings={totalConfirmedBookings}
            totalPendingBookings={totalPendingBookings}
            totalProperties={totalProperties}
            totalUsers={totalUsers}
            totalEnquiries={totalEnquiries}
            totalRevenue={totalRevenueCalculated}
          />
        </div>

        <div className="max-w-6xl mx-auto mt-8 p-6 bg-gray-100 shadow-md rounded-lg mb-8">
          <HighchartsReact highcharts={Highcharts} options={highChartOptions} />
        </div>
      </div>
    </div>
  );
}
