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

  const destination = { lat: lat, lng: lng };
  const offsetLat = 0.001;

  const dashedLine = [
    destination,
    { lat: destination.lat + offsetLat, lng: destination.lng },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gray-100">
      <div className="w-full mt-4 max-w-6xl mx-auto px-4 mb-6">
        <Link
          to={
            user.role === "admin"
              ? "/properties"
              : user.role === "buyer"
              ? "/properties-list"
              : "/"
          }
        >
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition duration-300 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Go Back
          </button>
        </Link>
      </div>

      {/* Image Slider */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-xl">
        <Slider {...settings} className="h-screen">
          {(property.propertyImages || []).map((img, index) => (
            <div key={index} className="h-screen">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Property Details */}
      <div className="w-full mb-10 max-w-6xl p-6 sm:p-10 mt-10 bg-white rounded-xl shadow-lg border border-gray-300">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              {property.title}
            </h2>

            <div className="text-gray-700 mb-4 space-y-1">
              <p>City: {property.location?.city?.name || "N/A"}</p>
              <p>Address: {property.location.locality || "N/A"}</p>
              <p>State: {property.location?.state || "N/A"}</p>
              <p>Country: {property.location?.country || "N/A"}</p>
            </div>

            <p className="text-gray-600 mb-4">{property.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(property.facilities || []).map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-6 w-full sm:w-64 px-6 py-3 text-white rounded-lg shadow-md bg-[#005555] hover:bg-gray-700 transition duration-300"
            >
              Book Now
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Book this Property"
            >
              <BookingPage propertyId={id} setIsModalOpen={setIsModalOpen} />
            </Modal>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg border">
            <div className="text-gray-900 text-xl font-bold mb-4">
              ₹{property.price}
            </div>
            <p className="text-gray-600 mb-2">Type: {property.propertyType}</p>
            <p className="text-gray-600 mb-2">
              Category: {property.category?.categoryName}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <p className="text-gray-600 mb-2">Sub Category: </p>
              {(property?.subCategory || []).map((feature, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>{" "}
            <p className="text-gray-600 mb-2">
              Status:{" "}
              <span
                className={`mb-2 ${
                  property.status === "Available"
                    ? "text-green-600"
                    : property.status === "Sold"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {property.status.charAt(0).toUpperCase() +
                  property.status.slice(1)}
              </span>
            </p>
            <p className="text-gray-600 mb-2">Size: {property.size} sqft</p>
            <p className="text-gray-600 mb-2">Bedrooms: {property.bedrooms}</p>
            <p className="text-gray-600 mb-2">
              Bathrooms: {property.bathrooms}
            </p>
            <p className="text-gray-500 mb-2">
              Listed on: {new Date(property.postedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-500">
              Posted by: {property.owner?.name || "Unknown"}
            </p>
          </div>
        </div>

        {/* Google Map */}
        {isLoaded && lat && lng && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Location on Map</h3>
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
