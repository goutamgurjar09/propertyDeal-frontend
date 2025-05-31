import React from "react";
import { Link } from "react-router-dom";
import categoriesImg from "../assets/aa/img_2.jpg"; // Fix file name

const cardShades = ["bg-white", "bg-gray-50"];

const properties = [
  { id: 1, type: "2 BHK", price: "500,000", location: "India, M.P" },
  { id: 2, type: "3 BHK", price: "750,000", location: "India, M.P" },
  { id: 3, type: "2 BHK", price: "500,000", location: "India, M.P" },
  { id: 4, type: "3 BHK", price: "750,000", location: "India, M.P" },
];

const PropertyCard = ({ property }) => (
  <Link to={`/propertyDetails/${property.id}`}>
    <div className={`${cardShades[property.id % cardShades.length]} shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 h-full flex flex-col`}>
      <img src={categoriesImg} alt={`Apartment ${property.id}`} className="w-full h-60 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Luxury Apartment {property.id}</h2>
        <p className="text-gray-600 flex items-center">{property.location}</p>
        <p className="text-gray-600 flex items-center">{property.type}</p>
        <p className="text-gray-600 flex items-center">${property.price}</p>
        <button className="mt-4 px-6 py-3 bg-[#112757] hover:bg-gray-700 text-white rounded-lg font-semibold hover:opacity-90 transition-all transform hover:-translate-y-1">
          View Details
        </button>
      </div>
    </div>
  </Link>
);

function Categories() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="p-12 my-2 m-6 w-full max-w-screen-xxl">
      
        <div className="mb-12 px-4">
          <h1 className="text-4xl font-extrabold text-gray-900 font-serif relative pb-4">
          Commercial  Properties in 
            <div className="absolute bottom-0 left-0 w-24 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
          </h1>
          <p className="text-lg text-gray-600 mt-3">Discover premium living spaces</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-12">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
    // =============
    
    
  );
}

export default Categories;
