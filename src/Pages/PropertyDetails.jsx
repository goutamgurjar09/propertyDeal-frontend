import React, { useState } from "react";

import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
  "https://th.bing.com/th/id/OIP.qljk19JWLbjLTNXWKAgyxwHaEa?rs=1&pid=ImgDetMain",
];

const PropertyDetails = () => {
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Full-Width Image Slider */}
      <div className="w-full h-screen">
        <Slider {...settings} className="w-full h-screen">
          {images.map((img, index) => (
            <div key={index} className="w-full h-screen">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Property Details Card */}
      <div className="m-20 hover:shadow-2xl rounded-lg font-semibold hover:opacity-90 transition-all transform hover:-translate-y-2">
        <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-400 font-semibold hover:opacity-90 transition-all transform hover:-translate-y-2">
          <div className="flex justify-between mb-4">
            <div className="w-2/3">
              <h5 className="text-3xl font-semibold text-blue-gray-900 mb-4">
                3BHK Luxury Apartment in Downtown
              </h5>

              {/* Location */}
              <div className="text-gray-600 mb-4">
                <p>City: New York</p>
                <p>Area: Downtown</p>
                <p>Address: 123 Main St, Downtown, New York, NY</p>
              </div>

              {/* Property Description */}
              <p className="text-gray-700 mb-4">
                Enter a freshly updated and thoughtfully furnished peaceful home
                surrounded by ancient trees, stone walls, and open meadows.
              </p>

              {/* Features Section */}
              <div className="flex flex-wrap gap-4 mb-4">
                {["WiFi", "TV", "Parking", "Garden", "Pool"].map(
                  (feature, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  )
                )}
              </div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="mt-4 w-64 px-6 py-3 text-center text-white rounded-lg shadow-md transition bg-[#005555]  hover:bg-gray-700 hover:shadow-lg"
              >
                Book Now
              </button>

              {isOpen && (
          // <div className="mt-4 p-6 border rounded-lg shadow-md bg-gray-50">
          <div className="mt-4 p-6 border rounded-lg shadow-md bg-gray-50 w-[1200px]">

            <h2 className="text-xl font-bold mb-4">Book Your Appointment</h2>

            {/* 📝 Booking Form */}
            <form className="space-y-3">
              <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
              <input type="text" placeholder="Address" className="w-full p-2 border rounded" />
              <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded" />
              <input type="date" className="w-full p-2 border rounded" />
              <textarea placeholder="Message" className="w-full p-2 border rounded"></textarea>

              {/* ✅ Submit & ❌ Close Buttons */}
              <div className="flex justify-between mt-4">
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">
                  Submit
                </button>
                <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500">
                  Close
                </button>
              </div>
            </form>
          </div>
        )}

              {/*===========  */}
            </div>

            {/* Right Side Details */}
            {/* Star Rating */}
            <div className="flex items-start mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2c.37 0 .736.14 1.02.4l2.86 2.67 3.9.57a1.5 1.5 0 01.83 2.56l-2.83 2.68.67 3.9a1.5 1.5 0 01-2.18 1.58L12 15.85l-3.5 1.84a1.5 1.5 0 01-2.18-1.58l.67-3.9-2.83-2.68a1.5 1.5 0 01.83-2.56l3.9-.57 2.86-2.67A1.5 1.5 0 0112 2z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
              <span className="text-lg font-medium ml-2 text-gray-700">
                4.8 (120 Reviews)
              </span>
            </div>
            <div className="w-1/3 pl-8">
              <div className="text-gray-800 mb-4 text-xl font-bold">
                ₹80,00,000
              </div>
              <div className="text-gray-600 mb-4">
                <p>Property Type: Apartment</p>
              </div>
              <div className="text-green-500 mb-4">
                <p>Status: For Sale</p>
              </div>
              <div className="text-gray-500 mb-4">
                <p>Listed on Jan 30, 2025</p>

              </div>
              <div className="text-gray-500 mb-4">
                {/* Map could be an interactive component */}
                <p>Map: <Link to="/map">View on Map</Link></p>
              </div>




            </div>
          </div>
        </div>
      </div>


      {/* =================== */}
      <div className="m-20 hover:shadow-2xl rounded-lg font-semibold hover:opacity-90 transition-all transform hover:-translate-y-2">
        <div className="w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-gray-400 font-semibold hover:opacity-90 transition-all transform hover:-translate-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="space-y-8">
              {/* Property Owner/Agent Information */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-4">Property Owner/Agent Information</h5>
                <ul className="text-gray-700">
                  <li><strong>Agent/Seller Name:</strong> John Doe</li>
                  <li><strong>Contact Number:</strong> (123) 456-7890</li>
                  <li><strong>Email Address:</strong> john.doe@example.com</li>
                  <li><strong>Agency Name:</strong> XYZ Realty</li>
                  <li><strong>Location:</strong> 123 Main St, City</li>
                  <li><strong>Years of Experience:</strong> 10 Years</li>
                </ul>
              </div>

              {/* Contact & Inquiry Options */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-4">Contact & Inquiry Options</h5>
                <ul className="text-gray-700">
                  <li><strong>Schedule a Visit:</strong> Use calendar for booking appointments</li>
                  <li><strong>Send Inquiry Form:</strong> Provide your Name, Email, Message</li>
                  <li><strong>Call / WhatsApp Now:</strong> Instant connection via phone</li>
                  <li><strong>Save Property to Favorites:</strong> Save for logged-in users</li>
                </ul>
              </div>

              {/* Property Reviews & Ratings */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-4">Property Reviews & Ratings</h5>
                <ul className="text-gray-700">
                  <li><strong>User Reviews & Ratings:</strong> See feedback from buyers</li>
                  <li><strong>Add Your Review:</strong> Share your experience if you’ve purchased or viewed</li>
                </ul>
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-8">
              {/* Similar Properties */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-4">Similar Properties</h5>
                <ul className="text-gray-700">
                  <li><a href="/similar-properties" className="text-blue-600">View Similar Properties</a></li>
                  <li><a href="/recently-viewed" className="text-blue-600">View Recently Viewed</a></li>
                </ul>
              </div>

              {/* Map Integration */}
              <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h5 className="text-xl font-semibold mb-4">Property Location</h5>
                <div className="relative">
                  <img
                    className="w-full h-64 object-cover rounded-lg"
                    src="https://source.unsplash.com/random/800x600/?map"
                    alt="Map Location"
                  />
                  <div className="absolute top-4 left-4 bg-black text-white p-2 rounded-md">
                    <strong>123 Main St, City</strong>
                  </div>
                </div>
                <div className="mt-4 text-gray-700">
                  <a
                    href="https://www.google.com/maps/dir/?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ============= */}
    </div>
  );
};

export default PropertyDetails;
