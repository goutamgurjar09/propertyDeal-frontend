// import React from "react";
// // import img from "../assets/cotegories-img.png";

// const CommercialPage = () => {
//   return (
//     <div className="container mx-auto px-4 py-8 mt-20">
//       <h2 className="text-2xl font-bold text-white px-4 py-2 bg-gray-700 rounded-lg inline-block mb-4">
//         Commercial Properties
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {[...Array(12)].map((_, index) => (
//           <div
//             key={index}
//             className="relative bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
//           >
//             <div className="relative">
//               <img
//                 src=""
//                 alt="Commercial Property"
//                 className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
//             </div>
//             <div className="absolute bottom-6 left-6">
//               <h3 className="text-2xl font-bold text-white">
//                 Commercial Property
//               </h3>
//               <p className="text-lg text-gray-200">City of Dreams</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommercialPage;







import React from "react";

const CommercialPage = () => {
  // Sample data array with details for demo purposes
  const properties = Array(12).fill({
    title: "Commercial Property",
    location: "City of Dreams",
    price: "$1,200,000",
    size: "3500 sq.ft",
    description:
      "Prime commercial space located in the heart of the business district with excellent connectivity.",
    imgUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-4 border-[#005555] inline-block pb-2">
        Commercial Properties
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="relative group overflow-hidden">
              <img
                src={property.imgUrl}
                alt={property.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-2xl font-bold">{property.title}</h3>
                <p className="text-lg">{property.location}</p>
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <p className="text-gray-700 mb-2 flex-grow">
                {property.description}
              </p>
              <div className="flex justify-between items-center mt-4 text-gray-900 font-semibold">
                <span>Size: {property.size}</span>
                <span className="text-[#005555]">{property.price}</span>
              </div>
              <button
                className="mt-6 bg-[#005555] text-white py-2 rounded-lg font-semibold hover:bg-[#007777] transition-colors"
                type="button"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommercialPage;
