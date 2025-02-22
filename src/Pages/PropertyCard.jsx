import React from "react";
import img from "../assets/cotegories-img.png";
import { Link } from "react-router-dom";

const categories = [
  { name: "Commercial", color: "bg-gray-700" },
  { name: "Premium", color: "bg-gray-700" },
  { name: "Luxury", color: "bg-gray-700" },
];

const PropertyCard = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {categories.map((category, idx) => (
        <div key={idx} className="mb-8">
          <h2
            className={`text-2xl font-bold text-white px-4 py-2 ${category.color} rounded-lg inline-block mb-4`}
          >
            {category.name} Properties
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="relative bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="relative">
                  <img
                    src={img}
                    alt="Property"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name} Property
                  </h3>
                  <p className="text-lg text-gray-200">City of love</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyCard;




