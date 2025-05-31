import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/slices/propertySlice";
import { showError } from "../Alert";
import Pagination from "../CommonComponent/Pagination";
import Loader from "../CommonComponent/Loader";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Select from "react-select";
import { getCities } from "../redux/slices/citySlice";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Navbar from "../Pages/Layout/Navbar";
import { motion } from "framer-motion";

export const PropertiesList = ({ setUser }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const [cityId, setCityId] = useState(null);
  const [locality, setLocality] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // Redux state
  const property = useSelector((state) => state.property);
  const { cities } = useSelector((state) => state.city);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  // Form control
  const { control } = useForm();
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
    dispatch(
      getProperties({
        page,
        limit,
        propertyType,
        cityId,
        lat,
        lng,
        category,
        subCategory,
      })
    );
  }, [
    dispatch,
    page,
    limit,
    propertyType,
    cityId,
    lat,
    lng,
    category,
    subCategory,
  ]);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
    cityId: city._id,
  }));

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
        <Navbar />
        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
          {loading && <Loader />}

          <div className="grid mt-10 grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-1 font-medium">Property Type</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">All</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="House">House</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">City</label>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value, ref } }) => {
                  const selectedOption =
                    cityOptions.find((option) => option.value === value) ||
                    null;
                  return (
                    <Select
                      inputRef={ref}
                      options={cityOptions}
                      value={selectedOption}
                      onChange={(option) => {
                        onChange(option ? option.value : null);
                        setCityId(option ? option.cityId : "");
                      }}
                      isClearable
                      placeholder="Select City"
                    />
                  );
                }}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Locality</label>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyAR_v8jpeLQrfsuZ0MvEWmxc6zomaCKPw4"
                selectProps={{
                  value: locality,
                  onChange: (val) => {
                    setLocality(val);
                    if (!val) {
                      setLat(null);
                      setLng(null);
                    }
                  },
                  placeholder: "Search Locality...",
                  isClearable: true,
                }}
              />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
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
