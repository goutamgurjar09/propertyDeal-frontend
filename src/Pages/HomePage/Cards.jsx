import React from "react";
import img1 from "../../../src/assets/Image/img_1.jpg";

function Cards() {
  return (
    <div className="flex items-center justify-center py-4 px-6 md:px-16 bg-gradient-to-r from-gray-100 via-white to-gray-100 mt-5">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 p-12 py-20 bg-white rounded-3xl shadow-2xl">
        <div>
          <img
            src={img1}
            alt="Team Discussion"
            className="w-full h-auto md:h-116 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="space-y-10">
          <h2 className="text-4xl font-extrabold text-[#112757] font-serif border-b-2 border-[#112757] pb-2">
            Why Choose ...........
          </h2>
          <div>
            <h3 className="text-xl font-semibold text-[#112757] flex items-center">
              <span className="mr-2 text-2xl">💬</span> We Are Professional
            </h3>
            <p className="text-black mt-1 leading-relaxed">
              We resource, train, speak, mentor and encourage marketplace
              leaders, business owners, and career professionals to be effective
              in the workplace.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#112757] flex items-center">
              <span className="mr-2 text-2xl">🎨</span> We Are Creative
            </h3>
            <p className="text-black mt-1 leading-relaxed">
              With so many factors to consider when deciding how to characterize
              your company, wouldn’t it be great to have a group of
              forward-thinking, well-informed individuals on board who know what
              they’re doing?
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#112757] flex items-center">
              <span className="mr-2 text-2xl">⏰</span> 24/7 Great Support
            </h3>
            <p className="text-black mt-1 leading-relaxed">
              Design clever and compelling marketing strategies, improve product
              positioning, and drive conversion rates. Elixir is always
              available to guide you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
