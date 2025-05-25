import { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyById } from "../redux/slices/propertySlice";
import { Link, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BookingPage from "./BookingPage";
import Modal from "../CommonComponent/Modal";
import Loader from "../CommonComponent/Loader";
import { getUserDetail } from "../redux/slices/authUtlis";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const PropertyDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { property, loading, error } = useSelector((state) => state.property);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAR_v8jpeLQrfsuZ0MvEWmxc6zomaCKPw4",
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  useEffect(() => {
    if (id) {
      dispatch(getPropertyById(id));
    }
  }, [id, dispatch]);

  const user = getUserDetail();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  if (loading) return <Loader />;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!property) return null;

  const lat = property?.location?.lat;
  const lng = property?.location?.lng;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 mt-16">
        <Link
          to={
            user.role === "admin"
              ? "/properties"
              : user.role === "buyer"
              ? "/properties-list"
              : "/"
          }
        >
          <button className="mb-6 flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </Link>

        {/* Image Slider */}
        <div className="rounded-lg overflow-hidden mb-10">
          <Slider {...settings}>
            {(property.propertyImages || []).map((img, index) => (
              <div key={index}>
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Details */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              {property.title}
            </h2>

            <div className="text-gray-700 space-y-1 mb-4">
              <p>City: {property.location?.city?.name || "N/A"}</p>
              <p>Locality: {property.location?.locality || "N/A"}</p>
              <p>State: {property.location?.state || "N/A"}</p>
              <p>Country: {property.location?.country || "N/A"}</p>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {property.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(property.facilities || []).map((item, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-3 py-1 text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded shadow hover:bg-emerald-700 transition"
            >
              Book Now
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Book Property"
              size="w-[20%] h-[75%]"
            >
              <BookingPage propertyId={id} setIsModalOpen={setIsModalOpen} />
            </Modal>
          </div>

          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="text-2xl font-semibold text-gray-900">
              ₹{property.price.toLocaleString()}
            </div>
            <div className="text-gray-700">Type: {property.propertyType}</div>
            <div className="text-gray-700">
              Category: {property.category?.categoryName}
            </div>
            <div className="text-gray-700">
              Sub Categories:
              <div className="flex flex-wrap gap-2 mt-1">
                {(property.subCategory || []).map((sub, idx) => (
                  <span
                    key={idx}
                    className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-gray-700">
              Status:
              <span
                className={`ml-1 font-medium ${
                  property.status === "Available"
                    ? "text-green-600"
                    : property.status === "Sold"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {property.status}
              </span>
            </div>
            <div className="text-gray-700">Size: {property.size} sqft</div>
            <div className="text-gray-700">Bedrooms: {property.bedrooms}</div>
            <div className="text-gray-700">Bathrooms: {property.bathrooms}</div>
            <div className="text-sm text-gray-500">
              Posted on: {new Date(property.postedAt).toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-500">
              Posted by: {property.owner?.name || "Unknown"}
            </div>
          </div>
        </div>

        {/* Google Map */}
        {isLoaded && lat && lng && (
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Location on Map
            </h3>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{ lat, lng }}
              zoom={15}
            >
              <Marker position={{ lat, lng }} />
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;