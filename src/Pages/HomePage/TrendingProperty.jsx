import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../redux/slices/propertySlice";
import { showError } from "../../Alert";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import Pagination from "../../CommonComponent/Pagination";
import Loader from "../../CommonComponent/Loader";
import { trackViewers } from "../../redux/slices/trackViewers";
import { getUserDetail } from "../../redux/slices/authUtlis";

export const TrendingProperty = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const navigate = useNavigate();
  const user = getUserDetail();

  const property = useSelector((state) => state.property);
  const {
    properties,
    loading,
    error,
    totalProperties,
    totalPages,
    hasNextPage,
    hasPrevPage,
  } = property;

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalProperties);

  useEffect(() => {
    dispatch(getProperties({ page, limit }));
    dispatch(trackViewers());
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });
    }
  }, []);

  if (error) {
    showError(error);
    return null;
  }

  return (
    <div
      className="bg-gray-50 min-h-screen px-6 py-3 font-serif"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto bg-white rounded-2xl p-8 shadow-2xl">
        {loading && <Loader />}
        <h1 className="text-center text-4xl font-bold text-[#005555] mb-10">
          Properties List
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
          {properties?.map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-4 flex flex-col justify-between"
            >
              <div className="cursor-pointer">
                <img
                  src={
                    property.propertyImages?.[0] ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={property.title}
                  className="rounded-xl w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {property.location?.city?.name}
                </p>
              </div>
              <button
                className="mt-4 bg-[#005555] text-white px-4 py-2 rounded-lg hover:bg-[#007777] transition"
                onClick={() => navigate(`/propertyDetails/${property?._id}`)}
              >
                View
              </button>
            </motion.div>
          ))}
        </div>

        {/* Pagination Section */}
        <div className="flex justify-between items-center mt-10">
          <p className="text-sm text-gray-600">
            Showing <b>{start}</b> to <b>{end}</b> of <b>{totalProperties}</b>{" "}
            properties
          </p>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};
