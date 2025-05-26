import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register the elements
ChartJS.register(ArcElement, Tooltip, Legend);
export default function MetricsPieChart({
  totalBookings,
  totalConfirmedBookings,
  totalPendingBookings,
  totalProperties,
  totalUsers,
  totalEnquiries,
  // totalRevenue,
}) {
  const data = {
    labels: [
      "Total Bookings",
      "Confirmed Bookings",
      "Pending Bookings",
      "Total Properties",
      "Total Users",
      "Total Enquiries",
      // "Total Revenue",
    ],
    datasets: [
      {
        label: "data",
        data: [
          totalBookings || 0,
          totalConfirmedBookings || 0,
          totalPendingBookings || 0,
          totalProperties || 0,
          totalUsers || 0,
          totalEnquiries || 0,
          // totalRevenue || 0,
        ],
        backgroundColor: [
          "#3b82f6", // blue
          "#10b981", // green
          "#f59e0b", // amber
          "#6366f1", // indigo
          "#8b5cf6", // violet
          "#ec4899", // pink
          "#ef4444", // red
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 15,
        fontSize: 12,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mb-4 mx-auto h-96 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-center mb-4">
       Overview
      </h2>
      <Pie data={data} options={options} />
    </div>
  );
}
