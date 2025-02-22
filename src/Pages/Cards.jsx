import React from 'react';

function Cards() {
  return (
    <div className="flex items-center justify-center py-20 px-6 md:px-16 bg-gray-100">
      <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 p-12 py-20 bg-white rounded-lg shadow-lg">
        <div>
          <img src="src/assets/aa/hero_bg_2.jpg" alt="Team Discussion" className="w-full h-auto md:h-116 rounded-lg shadow-lg" />
        </div>
        <div className="space-y-10">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose ...........</h2>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 flex items-center"><span className="mr-2">💬</span> We Are Professional</h3>
            <p className="text-gray-600">We resource, train, speak, mentor and encourage marketplace leaders, business owners, and career professionals to be effective in the workplace.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 flex items-center"><span className="mr-2">🎨</span> We Are Creative</h3>
            <p className="text-gray-600">With so many factors to consider when deciding how to characterize your company, wouldn’t it be great to have a group of forward-thinking, well-informed individuals on board who know what they’re doing?</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-700 flex items-center"><span className="mr-2">⏰</span> 24/7 Great Support</h3>
            <p className="text-gray-600">Design clever and compelling marketing strategies, improve product positioning, and drive conversion rates. Elixir is always available to guide you.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
