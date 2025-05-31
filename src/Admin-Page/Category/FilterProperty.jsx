import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../redux/slices/propertySlice";
import { getCities } from "../../redux/slices/citySlice";
import axios from "axios";
import { showError } from "../../Alert";
import Pagination from "../../CommonComponent/Pagination";
import Loader from "../../CommonComponent/Loader";
import { getCategoriesById } from "../../redux/slices/categorySlice";
import Navbar from "../../Pages/Layout/Navbar";
import { motion } from "framer-motion";
import { getUserDetail } from "../../redux/slices/authUtlis";

export const FilterProperty = ({ setUser }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const [cityId, setCityId] = useState(null);
  const [locality, setLocality] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // Redux state
  const property = useSelector((state) => state.property);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  // Form control
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
  const categories = useSelector((state) => state.category);
  const user = getUserDetail();

  useEffect(() => {
    dispatch(
      getProperties({
        page,
        limit,
        category,
        subCategory,
      })
    );
    dispatch(getCategoriesById(category));
  }, [dispatch, page, limit, category, subCategory]);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  // Calculate the range of properties being displayed
  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalProperties);

  if (error) {
    showError(error);
    return;
  }

  useEffect(() => {
    const fetchLatLngFromPlaceId = async (placeId) => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/properties/place-details?placeId=${placeId}`,
          { withCredentials: true }
        );
        const { location } = res.data.result.geometry;
        setLat(location.lat);
        setLng(location.lng);
      } catch (err) {
        console.error("Failed to fetch lat/lng:", err);
      }
    };

    if (locality?.value?.place_id) {
      fetchLatLngFromPlaceId(locality.value.place_id);
    }
  }, [locality]);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-2/3" : "w-full"
        } bg-white`}
      >
        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
          {loading && <Loader />}
          <Navbar />
          {/* Properties Grid */}
          <div className="mt-16 mb-8 flex justify-start">
            <div className="bg-gradient-to-r from-[#112757] to-[#00baba] px-8 py-4 rounded-2xl shadow-lg">
              <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow">
                {categories?.category?.categoryName
                  ? categories.category.categoryName.charAt(0).toUpperCase() +
                    categories.category.categoryName.slice(1)
                  : ""}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {properties.map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-4 flex flex-col justify-between"
              >
                <div className="cursor-pointer">
                  <img
                    src={
                      property.propertyImages?.[0] ||
                      "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={property.title}
                    className="rounded-xl w-full h-48 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    {property.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {property.location?.city?.name}
                  </p>
                </div>
                <button
                  className="mt-4 bg-[#112757] text-white px-4 py-2 rounded-lg hover:bg-[#007777] transition"
                  onClick={() => navigate(`/propertyDetails/${property?._id}`)}
                >
                  View
                </button>
              </motion.div>
            ))}
          </div>

          {/* Pagination Section */}
          <div className="flex justify-between items-center mt-10">
            <p className="text-sm text-gray-600">
              Showing <b>{start}</b> to <b>{end}</b> of <b>{totalProperties}</b>{" "}
              properties
            </p>
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
