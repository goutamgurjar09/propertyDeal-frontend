import React from "react";
import { FaHome, FaUserTie, FaShieldAlt,FaCheck } from "react-icons/fa";

function AboutUs() {
  return (
    <div className="flex justify-center font-serif">
      <div className="w-full px-26 py-16 bg-gray-100 rounded-xl shadow-lg">
        <h2 className="text-5xl font-bold text-[#005555] mb-12 font-serif">About Us</h2>

        {/* First Section */}
        <div className="grid md:grid-cols-2 items-center gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <FaCheck className="text-5xl text-green-400" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Quality Properties</h3>
                <p className="text-md text-gray-600">
                  We offer top-notch real estate properties that fit your budget and lifestyle.
                  We offer top-notch real estate properties that fit your budget and lifestyle.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <FaCheck className="text-5xl text-green-300" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Top Rated Agents</h3>
                <p className="text-md text-gray-600">
                  Our experienced agents are dedicated to finding the perfect property for you.
                  Our experienced agents are dedicated to finding the perfect property for you.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <FaCheck className="text-3xl text-green-400" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">Safe Transactions</h3>
                <p className="text-md text-gray-600">
                  Secure and hassle-free real estate transactions guaranteed.
                  Secure and hassle-free real estate transactions guaranteed.
                </p>
              </div>
            </div>
          </div>

          <img
            src="src/assets/aa/img_3.jpg"
            alt="Quality Properties"
            className="w-170 h-80 rounded-xl shadow-xl object-cover"
          />

        </div>
      </div>
    </div>
  );
}

export default AboutUs;
