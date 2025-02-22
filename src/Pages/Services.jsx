import React from "react";

const services = [
  {
    title: "PG and co-living",
    description: "Organised, owner and broker listed PGs",
    image: "src/assets/cotegories-img.png",
    bgColor: "bg-gray-100 shadow-md", 
  },
  {
    title: "commercial property",
    description: "Shops, offices, land, factories, warehouses and more",
    image: "src/assets/cotegories-img.png",
    bgColor: "bg-white shadow-md", // White with shadow
  },
  {
    title: "commercial property",
    description: "Shops, offices, land, factories, warehouses and more",
    image: "src/assets/cotegories-img.png",
    bgColor: "bg-gray-100 shadow-md", 
  },
  {
    title: "Buying a home",
    description: "Apartments, land, builder floors, villas and more",
    image: "src/assets/cotegories-img.png",
    bgColor: "bg-gray-100 shadow-md", 
  },
  {
    title: "Buy Plots/Land",
    description:
      "Residential Plots, Agricultural Farm lands, Inst. Lands and more",
    image: "src/assets/cotegories-img.png",
    bgColor: "bg-gray-100 shadow-md", 
  },
  {
    title: "Rent a Home",
    description: "Flats, apartments, houses, builder floors and more",
    image: "src/assets/cotegories-img.png",
    bgColor: "bg-gray-100 shadow-md", 
  },
];

function Services() {
  return (
    <div className="bg-white  py-16 px-6 sm:px-10 flex justify-center m-18 rounded-3xl shadow-2xl">
      <div className="max-w-7xl w-full">
        <h2 className="text-3xl font-bold font-serif bg-clip-text text-blue-950 mb-8 text-left relative inline-block group">
          Explore Our Services
          <span className="block w-40 h-1 bg-blue-800 mt-2 transition-all duration-300 group-hover:w-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.bgColor} p-6 sm:p-8 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-opacity-90 w-full`}
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shadow-md"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-md text-gray-700 mt-2">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
