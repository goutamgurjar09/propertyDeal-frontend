import { useEffect } from "react";
import { getProperties } from "../redux/slices/propertySlice";
import { useDispatch, useSelector } from "react-redux";

export const Properties = () => {
  const dispatch = useDispatch();
  const property = useSelector((state) => state.property);

  const { properties, loading, error } = property;

  useEffect(() => {
    dispatch(getProperties()); 
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Property Details</h1>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Property Details</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {properties?.data?.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4"
            >
              <img
                src={
                  property.propertyImages?.[0] ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={property.title}
                className="rounded-lg w-full h-48 object-cover mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-800">
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
                {property.location?.city?.name || "Indore"}
                {property.location?.state}, {property.location?.country}
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
          ))}
        </div>
      </div>
    </div>
  );
};
