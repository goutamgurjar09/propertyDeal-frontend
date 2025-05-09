import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProperty, resetPropertyState } from "../redux/slices/propertySlice";

const AddProperty = () => {
  const dispatch = useDispatch();
  const { loading, error, property } = useSelector((state) => state.property);

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

  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (property) {
      setSuccess("Property created successfully!");
      setFormData({
        title: "",
        description: "",
        price: "",
        propertyType: "Apartment",
        location: { address: "", city: "" },
        size: "",
        bedrooms: "",
        bathrooms: "",
        facilities: ["Wifi", "RO", "Park"],
        owner: { name: "" },
        propertyImages: [],
      });

      dispatch(resetPropertyState());
    }
  }, [property, dispatch]);

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
  
    formData.facilities.forEach((f) => data.append("facilities", f));
  
    for (let i = 0; i < formData.propertyImages.length; i++) {
      data.append("propertyImages", formData.propertyImages[i]);
    }
  
    dispatch(createProperty(data));
  };
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Create Property</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Title*" className="border p-2 rounded" required />
        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price*" className="border p-2 rounded" required />
        <input name="bedrooms" value={formData.bedrooms} onChange={handleChange} type="number" placeholder="Bedrooms*" className="border p-2 rounded" required />
        <input name="bathrooms" value={formData.bathrooms} onChange={handleChange} type="number" placeholder="Bathrooms*" className="border p-2 rounded" required />
        <input name="size" value={formData.size} onChange={handleChange} type="number" placeholder="Size (sq ft)" className="border p-2 rounded" />
        <input name="location.address" value={formData.location.address} onChange={handleChange} placeholder="Address*" className="border p-2 rounded" required />
        <input name="location.city" value={formData.location.city} onChange={handleChange} placeholder="City*" className="border p-2 rounded" required />
        <input name="owner.name" value={formData.owner.name} onChange={handleChange} placeholder="Owner Name*" className="border p-2 rounded" required />

        <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="border p-2 rounded">
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded col-span-full" />

        <input type="file" name="propertyImages" multiple onChange={handleFileChange} className="border p-2 rounded col-span-full" />

        {/* <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-full">
          {loading ? "Creating..." : "Create Property"}
        </button> */}
         <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 col-span-full">
          Create Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;















