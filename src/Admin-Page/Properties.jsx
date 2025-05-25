import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProperties,
  deleteProperty,
  updatePropertyStatus,
} from "../redux/slices/propertySlice";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { showError, showSuccess } from "../Alert";
import Sidebar from "../Pages/Layout/Sidebar";
import Header from "../Pages/Layout/Header";
import Pagination from "../CommonComponent/Pagination";
import Loader from "../CommonComponent/Loader";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { getCities } from "../redux/slices/citySlice";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import PaginatedTable from "../CommonComponent/PaginatedTable";
import AddProperty from "./AddProperty";
import Modal from "../CommonComponent/Modal";

export const Properties = ({ setUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [cityId, setCityId] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [propertyType, setPropertyType] = useState("");
  const [locality, setLocality] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPropertyId, setEditPropertyId] = useState(null);
  const { control, register, setValue } = useForm();
  const property = useSelector((state) => state.property);
  const { cities } = useSelector((state) => state.city);

  const {
    properties,
    loading,
    error,
    totalProperties,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = property;

  useEffect(() => {
    dispatch(
      getProperties({
        page,
        limit,
        propertyType,
        cityId,
        lat,
        lng,
      })
    );
  }, [dispatch, page, limit, propertyType, cityId, lat, lng]);

  useEffect(() => {
    dispatch(getCities());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await dispatch(deleteProperty(id));
        dispatch(
          getProperties({ page, limit, propertyType, cityId, lat, lng })
        );
        showSuccess("Property deleted successfully!");
      } catch (err) {
        showError("Failed to delete property. Please try again.");
      }
    }
  };

  const handleEdit = (id) => {
    setEditPropertyId(id);
    setIsModalOpen(true);
  };
  const handleAddProperty = () => {
    setIsModalOpen(true);
    setEditPropertyId(null);
  };
  const handleView = (id) => navigate(`/propertyDetails/${id}`);

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

  const cityOptions = cities.map((city) => ({
    value: city.name,
    label: city.name,
    cityId: city._id,
  }));

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalProperties);

  if (error) {
    showError(error);
    return null;
  }

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const response = await dispatch(
        updatePropertyStatus({ id, status: currentStatus })
      );
      if (response.payload.status) {
        showSuccess(response.payload.message || "Status updated!");
        dispatch(
          getProperties({ page, limit, propertyType, cityId, lat, lng })
        );
      } else {
        showError(
          response.payload.message || "Failed to update property status."
        );
      }
    } catch (err) {
      showError("An error occurred while updating the property status.");
    }
  };

  const columns = [
    {
      header: "Image",
      render: (row) => (
        <img
          src={
            row.propertyImages?.[0] ||
            "https://via.placeholder.com/80x60?text=No+Image"
          }
          alt={row.title}
          className="w-20 h-14 object-cover rounded"
        />
      ),
    },
    { header: "Title", accessor: "title" },
    { header: "Type", accessor: "propertyType" },
    {
      header: "City",
      render: (row) => row.location?.city?.name || "N/A",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <select
          value={row.status}
          onChange={(e) => handleStatusToggle(row._id, e.target.value)}
          className={`ml-2 px-2 py-1 rounded border text-xs ${
            row.status === "Available"
              ? "bg-green-100 text-green-700"
              : row.status === "Sold"
              ? "bg-red-100 text-red-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          <option value="Available" className="bg-green-100 text-green-700">
            Available
          </option>
          <option value="Sold" className="bg-red-100 text-red-700">
            Sold
          </option>
          <option value="Rented" className="bg-amber-100 text-amber-700">
            Rented
          </option>
        </select>
      ),
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-3">
          <button
            onClick={() => handleView(row._id)}
            className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 p-2 rounded-lg transition-colors"
            title="View"
          >
            <FaEye size={14} />
          </button>

          <button
            className="bg-sky-100 text-sky-600 hover:bg-sky-200 p-2 rounded-lg transition-colors"
            title="Edit"
            onClick={() => handleEdit(row._id)}
          >
            <FaEdit size={14} />
          </button>
          <button
            className="bg-red-100 text-red-500 hover:bg-rose-200 p-2 rounded-lg transition-colors"
            title={`Delete ${row.title}`}
            onClick={() => handleDelete(row._id)}
          >
            <FaTrash size={14} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-70" : "w-0"
        } bg-gray-100 shadow-2xl overflow-hidden`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  setUser={setUser} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "w-2/3" : "w-full"
        } bg-white`}
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setUser={setUser}
        />

        <div className="mt-6 mb-6 bg-gray-100 p-4 shadow-md w-[96%] ml-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Property Listings</h1>
            <button
              onClick={handleAddProperty}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Property
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

          {loading ? (
            <Loader />
          ) : (
            <PaginatedTable
              columns={columns}
              data={properties}
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              hasPrevPage={hasPrevPage}
              hasNextPage={hasNextPage}
              loading={loading}
              pageSize={limit}
              totalItems={totalProperties}
            />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Property"
        size="w-[90%] md:w-[60%] h-[75%]"
      >
        <AddProperty
          setIsModalOpen={setIsModalOpen}
          id={editPropertyId}
          onSuccess={() => dispatch(getProperties({ page, limit }))}
        />
      </Modal>
    </div>
  );
};
