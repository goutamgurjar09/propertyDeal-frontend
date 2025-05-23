// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getProperties } from "../../redux/slices/propertySlice";
// // import { getCities } from "../redux/slices/citySlice";
// import { getCities } from "../../redux/slices/citySlice";
// // import { showError } from "../Alert";
// import { showError } from "../../Alert";
// import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// import { Controller } from "react-hook-form";
// import Select from "react-select";
// import { useForm } from "react-hook-form";
// // import Pagination from "../CommonComponent/Pagination";
// import Pagination from "../../CommonComponent/Pagination";
// // import Loader from "../CommonComponent/Loader";
// import Loader from "../../CommonComponent/Loader";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export const TrendingProperty = () => {
//   const dispatch = useDispatch();
//   const [cityId, setCityId] = useState(null);
//   const [locality, setLocality] = useState(null);
//   const [lat, setLat] = useState(null);
//   const [lng, setLng] = useState(null);
//   // Redux state
//   const property = useSelector((state) => state.property);
//   const { cities } = useSelector((state) => state.city);

//   // Form control
//   const { control } = useForm();
//   const {
//     properties,
//     loading,
//     error,
//     totalProperties,
//     totalPages,
//     hasNextPage,
//     hasPrevPage,
//   } = property;

//   // Local state for pagination and filters
//   const [page, setPage] = useState(1);
//   const [limit] = useState(10); // You can also make limit changeable
//   const [propertyType, setPropertyType] = useState(""); // Filter
//   const navigate = useNavigate();
//   useEffect(() => {
//     dispatch(getProperties({ page, limit, propertyType, cityId, lat, lng }));
//   }, [dispatch, page, limit, propertyType, cityId, lat, lng]);

//   useEffect(() => {
//     dispatch(getCities());
//   }, [dispatch]);

//   const cityOptions = cities.map((city) => ({
//     value: city.name,
//     label: city.name,
//     cityId: city._id,
//   }));

//   // Calculate the range of properties being displayed
//   const start = (page - 1) * limit + 1;
//   const end = Math.min(page * limit, totalProperties);

//   if (error) {
//     showError(error);
//     return;
//   }

//   useEffect(() => {
//     const fetchLatLngFromPlaceId = async (placeId) => {
//       try {
//         const res = await axios.get(
//           `http://localhost:8000/api/properties/place-details?placeId=${placeId}`,
//           { withCredentials: true }
//         );
//         const { location } = res.data.result.geometry;
//         setLat(location.lat);
//         setLng(location.lng);
//       } catch (err) {
//         console.error("Failed to fetch lat/lng:", err);
//       }
//     };

//     if (locality?.value?.place_id) {
//       fetchLatLngFromPlaceId(locality.value.place_id);
//     }
//   }, [locality]);

//   return (
//     <div className="flex min-h-screen overflow-hidden">
//       <div className="mt-6 mb-6 bg-gray-100 p-4 w-full shadow-md ml-4">
//         {loading && <Loader />}

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <label className="block mb-1 font-medium">Property Type</label>
//             <select
//               value={propertyType}
//               onChange={(e) => setPropertyType(e.target.value)}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">All</option>
//               <option value="Apartment">Apartment</option>
//               <option value="Villa">Villa</option>
//               <option value="Plot">Plot</option>
//               <option value="House">House</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">City</label>
//             <Controller
//               control={control}
//               name="city"
//               render={({ field: { onChange, value, ref } }) => {
//                 const selectedOption =
//                   cityOptions.find((option) => option.value === value) || null;
//                 return (
//                   <Select
//                     inputRef={ref}
//                     options={cityOptions}
//                     value={selectedOption}
//                     onChange={(option) => {
//                       onChange(option ? option.value : null);
//                       setCityId(option ? option.cityId : "");
//                     }}
//                     isClearable
//                     placeholder="Select City"
//                   />
//                 );
//               }}
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Locality</label>
//             <GooglePlacesAutocomplete
//               apiKey="AIzaSyAR_v8jpeLQrfsuZ0MvEWmxc6zomaCKPw4"
//               selectProps={{
//                 value: locality,

//                 onChange: (val) => {
//                   setLocality(val);
//                   if (!val) {
//                     setLat(null);
//                     setLng(null);
//                   }
//                 },
//                 placeholder: "Search Locality...",
//                 isClearable: true,
//               }}
//             />
//           </div>
//         </div>

//         {/* Properties Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {properties.map((property, index) => (
//             <div
//               key={index}
//               className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between h-full"
//             >
//               {/* Card Content */}
//               <div className="flex-grow cursor-pointer">
//                 <div className="flex justify-center items-center mb-4">
//                   <img
//                     src={
//                       property.propertyImages?.[0] ||
//                       "https://via.placeholder.com/400x250?text=No+Image"
//                     }
//                     alt={property.title}
//                     className="rounded-lg object-cover w-full h-48"
//                   />
//                 </div>

//                 <h3 className="text-xl font-semibold text-gray-800 truncate">
//                   {property.title}
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-2">
//                   {property.propertyType}
//                 </p>
//                 <p className="text-gray-700 font-medium mb-2">
//                   ₹ {property.price.toLocaleString()}
//                 </p>

//                 <div className="text-sm text-gray-600 mb-2">
//                   {property.location?.city?.name}, {property.location?.state},{" "}
//                   {property.location?.country}
//                 </div>

//                 <div className="flex flex-wrap text-sm text-gray-600 gap-2 mb-2">
//                   <span>🛏 {property.bedrooms} Beds</span>
//                   <span>🛁 {property.bathrooms} Baths</span>
//                   <span>📐 {property.size} sqft</span>
//                 </div>

//                 <div className="text-sm text-gray-500">
//                   Posted by: {property.owner?.name}
//                 </div>
//                 <div
//                   className={`mt-2 ${
//                     property.status === "available"
//                       ? "text-green-600"
//                       : property.status === "sold"
//                       ? "text-red-600"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {property.status.charAt(0).toUpperCase() +
//                     property.status.slice(1)}
//                 </div>
//               </div>
//               <button
//                 className=" mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 onClick={() => navigate("/login")}
//               >
//                 Book Now
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4">
//           <div className="text-sm text-slate-500">
//             Showing <b>{start}</b> to <b>{end}</b> of <b>{totalProperties}</b>{" "}
//             properties
//           </div>
//           <Pagination
//             currentPage={page}
//             totalPages={totalPages}
//             onPageChange={setPage}
//             hasPrevPage={hasPrevPage}
//             hasNextPage={hasNextPage}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };





import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../redux/slices/propertySlice";

import { showError } from "../../Alert";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useForm } from "react-hook-form";
import Pagination from "../../CommonComponent/Pagination";
import Loader from "../../CommonComponent/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getTrackViewersCount,
  trackViewers,
} from "../../redux/slices/trackViewers";

export const TrendingProperty = () => {
  const dispatch = useDispatch();
  const [cityId, setCityId] = useState(null);
  const [locality, setLocality] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  // Redux state
  const property = useSelector((state) => state.property);
  const { cities } = useSelector((state) => state.city);

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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProperties({ page, limit }));
    dispatch(trackViewers());
  }, [dispatch, page, limit]);

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
      <div className="mt-6 mb-6 bg-gray-100 p-4 w-full shadow-md ml-4">
        {loading && <Loader />}

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                  cityOptions.find((option) => option.value === value) || null;
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
        </div> */}
        <h1 className="text-center text-4xl mb-8">Properties List</h1>
        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col justify-between h-full"
            >
              {/* Card Content */}
              <div className="flex-grow cursor-pointer">
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
                  ₹ {property?.price?.toLocaleString()}
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
                  {property?.status?.charAt(0)?.toUpperCase() +
                    property.status?.slice(1)}
                </div>
              </div>
              <button
                className=" mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => navigate("/login")}
              >
                Book Now
              </button>
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
  );
};
