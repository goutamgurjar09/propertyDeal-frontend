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
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../redux/slices/categorySlice";
import { InputField } from "../CommonComponent/InputField";
import { SelectField } from "../CommonComponent/SelectField";
import Loader from "../CommonComponent/Loader";
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
    bedrooms: yup.number().required("Required").typeError("Must be a number"),
    bathrooms: yup.number().required("Required").typeError("Must be a number"),
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
    category: yup.string().required("Category is required"),
    subCategory: yup
      .array()
      .of(
        yup.object({
          label: yup.string().required(),
          value: yup.string().required(),
        })
      )
      .required("Subcategory is required")
      .min(1, "Select at least one subcategory"),
  });
const AddProperty = ({ id, setIsModalOpen, onSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cities } = useSelector((state) => state.city);
  const [locality, setLocality] = useState(null);
  const [error, setError] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [remainingImages, setRemainingImages] = useState([]);

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

  const { property, loading } = useSelector((state) => state.property);
  const hasExistingImages = !!(
    property &&
    property.propertyImages &&
    property.propertyImages.length > 0
  );
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleRemoveImage = (indexToRemove) => {
    setRemainingImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
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
    if (property && id) {
      setRemainingImages(property.propertyImages || []);
      // ...rest of the reset logic
    }
  }, [property, reset, id]);

  useEffect(() => {
    if (property && id) {
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
        subCategory,
      } = property;

      reset({
        title,
        price,
        bedrooms,
        bathrooms,
        size,
        propertyType,
        category: category._id,
        description,
        city: location?.city.name,
        owner: owner?.name,
        subCategory:
          subCategory?.map((sub) => ({
            label: sub,
            value: sub,
          })) || [],
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
  }, [property, reset, id]);

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
          `${
            import.meta.env.VITE_API_ENDPOINT_BASE_URL
          }/properties/place-details?placeId=${placeId}`,
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
    if (!locality?.label) {
      return setError("Locality is required");
    }

    // ✅ Frontend image type/size validation
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxFileSize = 20 * 1024 * 1024;

    for (const img of data.propertyImages) {
      if (!allowedTypes.includes(img.type)) {
        showError("Only JPEG, PNG, and JPG images are allowed");
        return;
      }
      if (img.size > maxFileSize) {
        showError("Each image must be less than 20MB");
        return;
      }
      if(data?.propertyImages?.length + remainingImages?.length > 5) {
        showError("You can upload a maximum of 5 images");
        return;
      }
    }

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
    formData.append("location.lng", lng);
    formData.append(
      "facilities",
      data.facilities.map((f) => f.value).join(",")
    );
    formData.append("category", data.category);

    formData.append(
      "subCategory",
      data.subCategory.map((f) => f.value).join(",")
    );

    const images = Array.from(data.propertyImages);

    images.forEach((img) => {
      formData.append("propertyImages", img);
    });

    if (id && remainingImages.length > 0) {
      remainingImages.forEach((img) => {
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
      setIsModalOpen(false);
      if (onSuccess) onSuccess();
    } else {
      showError(res.payload.message);
    }
  };

  const selectedCategoryId = watch("category");
  const selectedCategory = categories.find(
    (cat) => cat._id === selectedCategoryId
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow no-scrollbar max-h-[60vh] overflow-scroll">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <InputField
          label="Title"
          register={register}
          name="title"
          placeholder="Title"
          error={errors.title?.message}
        />
        <InputField
          label="Price"
          register={register}
          name="price"
          type="number"
          placeholder="Price"
          error={errors.price?.message}
        />

        <InputField
          label="Bedrooms"
          register={register}
          name="bedrooms"
          type="number"
          placeholder="Bedrooms"
          error={errors.bedrooms?.message}
        />

        <InputField
          label="Bathrooms"
          register={register}
          name="bathrooms"
          type="number"
          placeholder="Bathrooms"
          error={errors.bathrooms?.message}
        />

        <InputField
          label="Size  (sq ft)"
          register={register}
          name="size"
          type="number"
          placeholder="Size (sq ft)"
          error={errors.size?.message}
        />
        <SelectField
          label="Property Type"
          register={register}
          name="propertyType"
          placeholder="Select Property Type"
          error={errors.propertyType?.message}
          options={[
            { value: "Apartment", label: "Apartment" },
            { value: "House", label: "House" },
            { value: "Villa", label: "Villa" },
            { value: "Commercial", label: "Commercial" },
          ]}
        />

        <SelectField
          label="Category"
          register={register}
          name="category"
          placeholder="Select Category"
          error={errors.category?.message}
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.categoryName,
          }))}
        />
        <InputField
          label="Owner Name"
          register={register}
          name="owner"
          type="text"
          placeholder="Owner Name*"
          error={errors.owner?.message}
        />
        {/* SubCategory */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sub Category <span className="required: text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="subCategory"
            render={({ field }) => (
              <Select
                {...field}
                options={
                  selectedCategory?.subCategories?.map((sub) => ({
                    label: sub.name,
                    value: sub.name,
                  })) || []
                }
                isMulti
                className="w-full"
                placeholder="Select Subcategories"
              />
            )}
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.subCategory?.message}
          </p>
        </div>

        {/* City (Select) */}

        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City <span className="required: text-red-500">*</span>
          </label>
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value, ref } }) => {
              const selectedOption =
                cityOptions.find((option) => option.value === value) || null;
              return (
                <Select
                  className="w-full"
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
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Locality <span className="required: text-red-500">*</span>
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
          <p className="text-red-500 text-sm mt-1">{error}</p>
        </div>

        {/* Description */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="required: text-red-500">*</span>
          </label>
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
        {remainingImages.map((imgUrl, index) => (
          <div key={index} className="relative inline-block mr-2">
            <img
              src={imgUrl}
              alt="Existing"
              className="w-24 h-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}

        <InputField
          label="Select Images"
          register={register}
          name="propertyImages"
          type="file"
          multiple
          placeholder="Select Images*"
          error={errors.propertyImages?.message}
        />

        {/* Facilities */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Facilities <span className="required: text-red-500">*</span>
          </label>
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
            disabled={loading}
            className={` ${
              loading ? "opacity-40" : ""
            } w-75 p-6 bg-[#005555] hover:bg-[#004444] transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-md`}
          >
            {id ? "Update Property" : "Create Property"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
