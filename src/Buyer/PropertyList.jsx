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
                  <div
                    className={`mt-2 ${
                      property.status === "available"
                        ? "text-green-600"
                        : property.status === "sold"
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {property.status.charAt(0).toUpperCase() +
                      property.status.slice(1)}
                  </div>
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
