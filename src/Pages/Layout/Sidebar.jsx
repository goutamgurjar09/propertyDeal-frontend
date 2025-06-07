import {
  FaHome,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaCalendarAlt,
  FaEnvelope,
  FaTags,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../../redux/slices/authUtlis";

const Sidebar = ({ sidebarOpen, setSidebarOpen, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNav = (path) => {
    if (window.innerWidth <= 576) {
      setSidebarOpen(false);
      setTimeout(() => navigate(path), 0); // small delay ensures sidebar closes first
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    if (window.innerWidth <= 576) {
      setSidebarOpen(false);
      setTimeout(() => {
        navigate("/login");
      }, 100);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center mb-10 mt-2">
        <span className="text-xl font-bold">Admin Dashboard</span>
        <span
          onClick={() => setSidebarOpen((prev) => !prev)}
          className="text-xl text-gray-900 cursor-pointer cursor-pointer"
        >
          <RxCross2 size={22} />
        </span>
      </div>

      <nav className="space-y-2 flex flex-col gap-1">
        <span
          onClick={() => handleNav("/dashboard")}
          className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left ${
            isActive("/dashboard")
              ? "bg-[#112757] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaHome /> Dashboard
        </span>

        <span
          onClick={() => handleNav("/users")}
          className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left ${
            isActive("/users")
              ? "bg-[#112757] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaUser /> User Management
        </span>

        <span
          onClick={() => handleNav("/properties")}
          className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left ${
            isActive("/properties")
              ? "bg-[#112757] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaChartBar /> Property Management
        </span>

        <span
          onClick={() => handleNav("/bookings")}
          className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left ${
            isActive("/bookings")
              ? "bg-[#112757] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaCalendarAlt /> Bookings
        </span>

        <span
          onClick={() => handleNav("/enquiries")}
          className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left ${
            isActive("/enquiries")
              ? "bg-[#112757] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaEnvelope /> Enquiries
        </span>

        <span
          onClick={() => handleNav("/categories")}
          className={`flex items-center gap-2 p-3 w-full rounded cursor-pointer text-left ${
            isActive("/categories")
              ? "bg-[#112757] text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          <FaTags /> Categories
        </span>

        <span
          onClick={handleLogout}
          className="flex items-center cursor-pointer gap-2 p-3 w-full bg-gray-200 rounded hover:bg-gray-300 text-left"
        >
          <FaSignOutAlt /> Logout
        </span>
      </nav>
    </div>
  );
};

export default Sidebar;
