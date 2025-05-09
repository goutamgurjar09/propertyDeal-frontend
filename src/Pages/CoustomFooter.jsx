import { FaFilm } from "react-icons/fa";

const CoustomFooter = () => {
  return (
    <footer className="bg-[#005555]  text-white py-10 ">
      <div className="max-w-7xl font-serif  font-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 ">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaFilm className="text-red-500" />
            <h2>MyWebsite</h2>
          </div>
          <p className="mt-2 text-gray-400 pe-18">
            We are a platform providing high-quality content across various genres, helping you discover the best movies, shows, and more.
          </p>
          <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer">
            Learn More
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Quick Links</h3>
          <ul className="mt-3 space-y-2 ">
            {["Home", "Categories", "FAQ", "Contact", "Memories"].map((item, index) => (
              <li
                key={index}
                className="relative text-gray-400 hover:text-white transition cursor-pointer"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Useful Links</h3>
          <ul className="mt-3 space-y-2">
            {["Rent", "Buyers", "Tenants", "Owners", "Dealers / Builders"].map((item, index) => (
              <li
                key={index}
                className="relative text-gray-400 hover:text-white transition cursor-pointer"
              >
                {item}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Contact</h3>
          <p className="text-gray-400">info@example.com</p>
          <p className="text-gray-400">123 Main St, City, Country | +1 234 567 890</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-gray-400 text-sm">
        <p>© 2025 MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default CoustomFooter;

