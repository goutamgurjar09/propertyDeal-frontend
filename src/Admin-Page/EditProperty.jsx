import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { updateProperty, getPropertyById } from "../redux/slices/propertySlice";
import { getCities } from "../redux/slices/citySlice";

import { showError, showSuccess } from "../Alert";
import Select from "react-select"; // Import react-select

const EditProperty = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "Apartment",
    location: {
      address: "",
      city: "",
    },
    size: "",
    bedrooms: "",
    bathrooms: "",
    facilities: ["Wifi", "RO", "Park"],
    owner: {
      name: "",
    },
    propertyImages: [],
  });
  const { cities, loading } = useSelector((state) => state.city);
  const [cityOptions, setCityOptions] = useState([]);

  const facilitiesOptions = [
    { value: "Wifi", label: "Wifi" },
    { value: "RO", label: "RO" },
    { value: "Park", label: "Park" },
    { value: "Pool", label: "Pool" },
    { value: "Gym", label: "Gym" },
    { value: "Library", label: "Library" },
    { value: "Stadium", label: "Stadium" },
  ];

  // Fetch cities on mount
  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);
  // Set city options for the dropdown
  useEffect(() => {
    if (cities && cities.length > 0) {
      const options = cities.map((city) => ({
        value: city._id,
        label: city.name,
      }));
      setCityOptions(options);
    }
  }, [cities]);

  // Fetch the property data by ID
  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
    }
  }, [dispatch, id]);

  const propertyData = useSelector((state) => state.property.property);
  console.log("get Property Data:", propertyData);

  // Set formData when the property is fetched
  useEffect(() => {
    if (propertyData) {
      setFormData({
        title: propertyData.title,
        description: propertyData.description,
        price: propertyData.price,
        propertyType: propertyData.propertyType,
        location: {
          address: propertyData.location?.address,
          city: propertyData.location?.city?._id || "",
        },
        size: propertyData.size,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        facilities: propertyData.facilities,
        owner: {
          name: propertyData.owner?.name,
        },
        propertyImages: propertyData.propertyImages || [],
      });
    }
  }, [propertyData]);

  // Handle input changes for both nested objects and primitive fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle general location fields without city
    if (name.includes("location.")) {
      const locField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locField]: value,
        },
      }));
    } else if (name === "owner.name") {
      setFormData((prev) => ({
        ...prev,
        owner: {
          ...prev.owner,
          name: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle multi-select changes for facilities
  const handleFacilitiesChange = (selectedOptions) => {
    setFormData((prev) => ({
      ...prev,
      facilities: selectedOptions.map((option) => option.value),
    }));
  };

  // Handle city dropdown change
  const handleCityChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        city: selectedOption ? selectedOption.value : "",
      },
    }));
  };

  // Handle file input changes for images
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      propertyImages: [...e.target.files],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("propertyType", formData.propertyType);
    data.append("size", formData.size);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);

    data.append("owner", JSON.stringify(formData.owner));
    data.append("location", JSON.stringify(formData.location));
    data.append("facilities", JSON.stringify(formData.facilities));

    const existingImageUrls = formData.propertyImages.filter(
      (img) => typeof img === "string"
    );
    if (existingImageUrls.length > 0) {
      data.append("existingImages", JSON.stringify(existingImageUrls));
    }

    const newFiles = formData.propertyImages.filter(
      (img) => typeof img === "object"
    );
    newFiles.forEach((file) => data.append("propertyImages", file));

    const propertyData = await dispatch(updateProperty({ id, formData: data }));
    console.log("Property Data:", propertyData);

    if (propertyData?.payload?.status === "success") {
      showSuccess(propertyData.payload.message);
      navigate("/properties");
    } else {
      showError(propertyData.payload?.message || "Failed to update property.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-4 p-6 bg-gray-100 rounded-xl shadow-lg">
      <div className="flex justify-end mb-4">
        <Link to="/properties">
          <button className="flex p-3 bg-gray-300 rounded hover:bg-gray-400">
            Go Back
          </button>
        </Link>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Edit Property</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title*"
          className="border p-2 rounded"
          required
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Price*"
          className="border p-2 rounded"
          required
        />
        <input
          name="bedrooms"
          value={formData.bedrooms}
          onChange={handleChange}
          type="number"
          placeholder="Bedrooms*"
          className="border p-2 rounded"
          required
        />
        <input
          name="bathrooms"
          value={formData.bathrooms}
          onChange={handleChange}
          type="number"
          placeholder="Bathrooms*"
          className="border p-2 rounded"
          required
        />
        <input
          name="size"
          value={formData.size}
          onChange={handleChange}
          type="number"
          placeholder="Size (sq ft)"
          className="border p-2 rounded"
        />
        <input
          name="location.address"
          value={formData.location.address}
          onChange={handleChange}
          placeholder="Address*"
          className="border p-2 rounded"
          required
        />
        {/* City Dropdown */}
        <div className="col-span-full">
          <label className="block mb-2 font-medium">City</label>
          <Select
            options={cityOptions}
            value={cityOptions.find(
              (city) => city.value === formData.location.city
            )}
            onChange={handleCityChange}
            isLoading={loading}
            className="w-full"
            placeholder="Select City"
            required
          />
        </div>
        <input
          name="owner.name"
          value={formData.owner.name}
          onChange={handleChange}
          placeholder="Owner Name*"
          className="border p-2 rounded"
          required
        />

        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded col-span-full"
        />

        {/* Facilities Multi-Select */}
        <div className="col-span-full">
          <label className="block mb-2 font-medium">Facilities</label>
          <Select
            isMulti
            name="facilities"
            options={facilitiesOptions}
            value={facilitiesOptions.filter((option) =>
              formData.facilities.includes(option.value)
            )}
            onChange={handleFacilitiesChange}
            className="w-full"
          />
        </div>

        {/* Handle existing Images Preview */}
        {formData.propertyImages.length > 0 &&
          typeof formData.propertyImages[0] === "string" && (
            <div className="col-span-full">
              <label className="block mb-2 font-medium">Existing Images:</label>
              <div className="flex flex-wrap gap-4">
                {formData.propertyImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`property-${idx}`}
                    className="w-32 h-24 object-cover border rounded"
                  />
                ))}
              </div>
            </div>
          )}

        {/* File input to add new images */}
        <div className="col-span-full">
          <label className="block mb-2 font-medium">Upload New Images:</label>
          <input
            type="file"
            name="propertyImages"
            multiple
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-full"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
