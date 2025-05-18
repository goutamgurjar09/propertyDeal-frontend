import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  createProperty,
  getPropertyById,
  updateProperty,
} from "../redux/slices/propertySlice";
import { getCities } from "../redux/slices/citySlice";
import { showError, showSuccess } from "../Alert";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const facilityOptions = [
  { value: "Wifi", label: "Wifi" },
  { value: "RO", label: "RO" },
  { value: "Park", label: "Park" },
  { value: "Pool", label: "Pool" },
  { value: "Geyser", label: "Geyser" },
  { value: "AC", label: "AC" },
];

const getSchema = (hasExistingImages) =>
  yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    price: yup
      .number()
      .typeError("Must be a number")
      .required("Price is required"),
    propertyType: yup.string().required(),
    size: yup.number().typeError("Must be a number"),
    bedrooms: yup.number().typeError("Must be a number").required("Required"),
    bathrooms: yup.number().typeError("Must be a number").required("Required"),
    city: yup.string().required("City is required"),
    owner: yup.string().required("Owner name is required"),
    facilities: yup.array().min(1, "Select at least one facility"),
    propertyImages: yup
      .mixed()
      .test(
        "required",
        "At least one image is required",
        (value) => hasExistingImages || (value && value.length > 0)
      ),
  });
const AddProperty = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { cities } = useSelector((state) => state.city);

  const [locality, setLocality] = useState(null);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const initialValues = {
    title: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    propertyType: "",
    description: "",
    location: "",
    city: "",
    owner: "",
    category: "",
    facilities: [],
    propertyImages: [],
  };

  const propertyData = useSelector((state) => state.property.property);
  const hasExistingImages = !!(
    propertyData &&
    propertyData.propertyImages &&
    propertyData.propertyImages.length > 0
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(getSchema(hasExistingImages)),
    defaultValues: initialValues,
  });

  // Fetch the property data by ID
  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (propertyData && id) {
      const {
        title,
        price,
        bedrooms,
        bathrooms,
        size,
        propertyType,
        description,
        owner,
        location,
        facilities,
        category,
      } = propertyData;

      reset({
        title,
        price,
        bedrooms,
        bathrooms,
        size,
        propertyType,
        category,
        description,
        city: location?.city.name,
        owner: owner?.name,
        facilities: facilities?.map((f) => ({ label: f, value: f })) || [],
        propertyImages: [],
      });

      // Set locality and coordinates
      if (location?.locality) {
        setLocality({ label: location.locality, value: { place_id: "" } }); // You may store place_id if needed
      }
      setLat(location?.lat || null);
      setLng(location?.lng || null);
    }
  }, [propertyData, reset, id]);

  // Fetch cities on mount
  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  // Fetch lat/lng from Google Places API
  useEffect(() => {
    const fetchLatLngFromPlaceId = async (placeId) => {
      try {
        if (!placeId) return;
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

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("propertyType", data.propertyType);
    formData.append("size", data.size);
    formData.append("bedrooms", data.bedrooms);
    formData.append("bathrooms", data.bathrooms);
    formData.append("owner.name", data.owner);
    formData.append("location.city", data.city);
    formData.append("location.locality", locality?.label || "");
    formData.append("location.lat", lat);
    formData.append("category", data.category);
    formData.append("location.lng", lng);
    formData.append(
      "facilities",
      data.facilities.map((f) => f.value).join(",")
    );
    const images = Array.from(data.propertyImages);

    images.forEach((img) => {
      formData.append("propertyImages", img);
    });
    if (id && propertyData?.propertyImages?.length > 0) {
      propertyData.propertyImages.forEach((img) => {
        formData.append("existingImages", img);
      });
    }

    let res;
    if (id) {
      // You need to implement updateProperty API and dispatch
      res = await dispatch(updateProperty({ id, formData }));
    } else {
      res = await dispatch(createProperty(formData));
    }

    if (res?.payload?.status === "success") {
      showSuccess(res.payload.message);
      reset();
      setLocality(null);
      navigate("/properties");
    } else {
      showError(res.payload.message);
    }
  };

  const categoryOptions = [
    "Select Category",
    "Residential",
    "Commercial",
    "Industrial",
    "Land",
    "Agricultural",
    "Other",
  ];

  return (
    <div className="max-w-6xl mx-auto my-10 px-6 py-8 bg-gray-100 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          {id ? "Update Property" : "Create Property"}
        </h2>
        <Link to="/properties" className="mt-4 sm:mt-0">
          <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200">
            Go Back
          </button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Title */}
        <div>
          <input
            placeholder="Title*"
            {...register("title")}
            className="w-full h-12 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">{errors.title?.message}</p>
        </div>

        {/* Price */}
        <div>
          <input
            placeholder="Price*"
            type="number"
            {...register("price")}
            className="w-full h-12 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">{errors.price?.message}</p>
        </div>

        {/* Bedrooms */}
        <div>
          <input
            placeholder="Bedrooms*"
            type="number"
            {...register("bedrooms")}
            className="w-full h-12 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.bedrooms?.message}
          </p>
        </div>

        {/* Bathrooms */}
        <div>
          <input
            placeholder="Bathrooms*"
            type="number"
            {...register("bathrooms")}
            className="w-full h-12 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.bathrooms?.message}
          </p>
        </div>

        {/* Size */}
        <div>
          <input
            placeholder="Size (sq ft)"
            type="number"
            {...register("size")}
            className="w-full h-12 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">{errors.size?.message}</p>
        </div>

        {/* Property Type */}
        <div>
          <select
            {...register("propertyType")}
            className="w-full h-12 px-4 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Commercial">Commercial</option>
          </select>
          <p className="text-red-500 text-sm mt-1">
            {errors.propertyType?.message}
          </p>
        </div>
        <div>
          <select
            {...register("category")}
            className="w-full h-12 px-4 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categoryOptions.map((option, index) => (
              <option key={option} value={index === 0 ? "" : option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-sm mt-1">
            {errors.category?.message}
          </p>
        </div>

        {/* City (Select) */}
        <div className="col-span-1">
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value, ref } }) => {
              const selectedOption =
                cityOptions.find((option) => option.value === value) || null;
              return (
                <Select
                  className="w-full h-12"
                  inputRef={ref}
                  options={cityOptions}
                  value={selectedOption}
                  onChange={(option) => onChange(option ? option.value : "")}
                  placeholder="Select City*"
                  isClearable
                />
              );
            }}
          />
          <p className="text-red-500 text-sm mt-1">{errors.city?.message}</p>
        </div>

        {/* Owner */}
        <div>
          <input
            placeholder="Owner Name*"
            {...register("owner")}
            className="w-full h-12 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">{errors.owner?.message}</p>
        </div>

        {/* Locality (Google Places) */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 text-gray-700 font-medium">
            Search Locality
          </label>
          <GooglePlacesAutocomplete
            apiKey="AIzaSyAR_v8jpeLQrfsuZ0MvEWmxc6zomaCKPw4"
            selectProps={{
              value: locality,
              onChange: (val) => setLocality(val),
              placeholder: "Search Locality...",
              isClearable: true,
            }}
          />
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <textarea
            placeholder="Description"
            {...register("description")}
            className="w-full px-4 py-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={4}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.description?.message}
          </p>
        </div>

        {/* Property Images */}
        {propertyData &&
          id &&
          propertyData?.propertyImages?.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt="Existing"
              className="w-24 h-20 object-cover rounded"
            />
          ))}

        <div className="col-span-1 md:col-span-2">
          <input
            type="file"
            {...register("propertyImages")}
            multiple
            className="w-full h-12 px-4 py-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.propertyImages?.message}
          </p>
        </div>

        {/* Facilities */}
        <div className="col-span-1 md:col-span-2">
          <Controller
            control={control}
            name="facilities"
            render={({ field }) => (
              <Select
                {...field}
                options={facilityOptions}
                isMulti
                className="w-full"
                placeholder="Select Facilities"
              />
            )}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.facilities?.message}
          </p>
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 text-center mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded shadow transition-all duration-200 cursor-pointer w-full"
          >
            {id ? "Update Property" : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
