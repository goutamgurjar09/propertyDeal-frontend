import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProperties, deleteProperty } from "../redux/slices/propertySlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { showError, showSuccess } from "../Alert";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import Pagination from "../CommonComponent/Pagination";
import Loader from "../CommonComponent/Loader";
export const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redux state
  const property = useSelector((state) => state.property);
  const {
    properties,
    loading,
    error,
    totalProperties,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = property;

  // Local state for pagination and filters
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can also make limit changeable
  const [propertyType, setPropertyType] = useState(""); // Filter

  useEffect(() => {
    dispatch(getProperties({ page, limit, propertyType }));
  }, [dispatch, page, limit, propertyType]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await dispatch(deleteProperty(id));
        dispatch(getProperties({ page, limit, propertyType })); // Refresh properties after deletion
        showSuccess("Property deleted successfully!");
      } catch (err) {
        showError("Failed to delete property. Please try again.");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/property/edit/${id}`);
  };

  // Calculate the range of properties being displayed
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalProperties);

  if (error) {
    showError(error);
    return;
  }

  const handleAddProperty = () => {
    navigate("/addProperty");
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
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
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
          {loading && <Loader />}
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Property Details</h1>
            <button
              onClick={handleAddProperty}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Property
            </button>
          </div>
          {/* Filter by Property Type */}
          <div className="mb-4 overflow-x-auto">
            <label className="mr-2 font-medium">Filter by Type:</label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="">All</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
            </select>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between h-full"
              >
                {/* Card Content */}
                <div
                  className="flex-grow cursor-pointer"
                  onClick={() => navigate(`/propertyDetails/${property._id}`)}
                >
                  <div className="flex justify-center items-center mb-4">
                    <img
                      src={
                        property.propertyImages?.[0] ||
                        "https://via.placeholder.com/400x250?text=No+Image"
                      }
                      alt={property.title}
                      className="rounded-lg object-cover w-full h-48"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 truncate">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {property.propertyType}
                  </p>
                  <p className="text-gray-700 font-medium mb-2">
                    ₹ {property.price.toLocaleString()}
                  </p>

                  <div className="text-sm text-gray-600 mb-2">
                    {property.location?.address},{" "}
                    {property.location?.city?.name}, {property.location?.state},{" "}
                    {property.location?.country}
                  </div>

                  <div className="flex flex-wrap text-sm text-gray-600 gap-2 mb-2">
                    <span>🛏 {property.bedrooms} Beds</span>
                    <span>🛁 {property.bathrooms} Baths</span>
                    <span>📐 {property.size} sqft</span>
                  </div>

                  <div className="text-sm text-gray-500">
                    Posted by: {property.owner?.name}
                  </div>
                  <div className="text-sm text-green-600 font-semibold mt-2">
                    {property.status}
                  </div>
                </div>

                {/* Edit/Delete Icons */}
                <div className="flex flex-col items-end justify-end space-y-4 mt-auto">
                  <button
                    onClick={() => handleEdit(property._id)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit Property"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete Property"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-slate-500">
              Showing <b>{start}</b> to <b>{end}</b> of <b>{totalProperties}</b>{" "}
              properties
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