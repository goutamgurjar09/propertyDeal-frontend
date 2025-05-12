import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProperties, deleteProperty } from "../redux/slices/propertySlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { showError, showSuccess } from "../Alert";

export const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux state
  const property = useSelector((state) => state.property);
  const { properties, loading, error, totalProperties, totalPages, hasNextPage, hasPrevPage } = property;
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

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading properties...</div>;
  }

  if (error) {
    showError(error);
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Property Details</h1>

      {/* Filter by Property Type */}
      <div className="mb-4">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {properties.map((property, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between h-full"
          >
            {/* Card Content */}
            <div className="flex-grow" onClick={() => navigate(`/propertyDetails/${property._id}`)}>
              {/* Property Image */}
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

              <h3 className="text-xl font-semibold text-gray-800 truncate">{property.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{property.propertyType}</p>
              <p className="text-gray-700 font-medium mb-2">
                ₹ {property.price.toLocaleString()}
              </p>

              <div className="text-sm text-gray-600 mb-2">
                {property.location?.address}, {property.location?.city?.name}, {property.location?.state}, {property.location?.country}
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={!hasPrevPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
  );
};
