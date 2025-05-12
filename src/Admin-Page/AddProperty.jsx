import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty } from "../redux/slices/propertySlice";
import { getCities } from "../redux/slices/citySlice";
import { Link } from "react-router-dom";
import { showError, showSuccess } from "../Alert";
import Select from "react-select";

const AddProperty = () => {
  const dispatch = useDispatch();
  const { cities } = useSelector((state) => state.city);

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

  // Fetch cities on mount
  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("location.")) {
      const locField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [locField]: value,
        },
      }));
    } else if (name.includes("owner.")) {
      const ownerField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        owner: {
          ...prev.owner,
          [ownerField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCitySelect = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        city: selectedOption.value,
      },
    }));
  };

  const handleFacilitiesChange = (selectedOptions) => {
    const selectedFacilities = selectedOptions.map((option) => option.value);
    setFormData((prev) => ({ ...prev, facilities: selectedFacilities }));
  };

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
    data.append("owner.name", formData.owner.name);
    data.append("location.address", formData.location.address);
    data.append("location.city", formData.location.city);
    data.append("facilities", formData.facilities.join(","));

    for (let i = 0; i < formData.propertyImages.length; i++) {
      data.append("propertyImages", formData.propertyImages[i]);
    }

    const propertyData = await dispatch(createProperty(data));
    if (propertyData?.payload?.status === "success") {
      showSuccess(propertyData.payload.message);
      setFormData({
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
        facilities: [],
        owner: {
          name: "",
        },
        propertyImages: [],
      });
    } else {
      showError(propertyData.payload.message);
    }
  };

  const facilityOptions = [
    { value: "Wifi", label: "Wifi" },
    { value: "RO", label: "RO" },
    { value: "Park", label: "Park" },
    { value: "Pool", label: "Pool" },
    { value: "Geyser", label: "Geyser" },
    { value: "AC", label: "AC" },
  ];

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
  }));

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-gradient-to-br from-gray-50 via-white to-gray-200 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-700">Create Property</h2>
        <Link to="/dashboard">
          <button className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded">
            Go Back
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title*" className="border p-3 rounded" required />
        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price*" className="border p-3 rounded" required />
        <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} type="number" placeholder="Bedrooms*" className="border p-3 rounded" required />
        <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} type="number" placeholder="Bathrooms*" className="border p-3 rounded" required />
        <input name="size" value={formData.size} onChange={handleChange} type="number" placeholder="Size (sq ft)" className="border p-3 rounded" />

        <input name="location.address" value={formData.location.address} onChange={handleChange} placeholder="Address*" className="border p-3 rounded" required />

        {/* ✅ City Dropdown */}
        <Select
          options={cityOptions}
          value={cityOptions.find(opt => opt.value === formData.location.city)}
          onChange={handleCitySelect}
          placeholder="Select City*"
          className="z-10"
        />

        <input name="owner.name" value={formData.owner.name} onChange={handleChange} placeholder="Owner Name*" className="border p-3 rounded" required />

        <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="border p-3 rounded">
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
        </select>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-3 rounded col-span-full" />

        <input type="file" name="propertyImages" multiple onChange={handleFileChange} className="border p-3 rounded col-span-full" />

        {/* ✅ Facilities Multi-select */}
        <Select
          isMulti
          name="facilities"
          options={facilityOptions}
          value={facilityOptions.filter((option) => formData.facilities.includes(option.value))}
          onChange={handleFacilitiesChange}
          className="col-span-full"
          placeholder="Select Facilities"
        />

        <button type="submit" className="col-span-full py-3 px-6 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;












