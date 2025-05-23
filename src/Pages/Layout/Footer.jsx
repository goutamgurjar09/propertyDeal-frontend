import { FaFilm } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#005555] text-white py-10 px-4 sm:px-8">
      <div className="max-w-7xl font-serif mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <div className="flex items-center gap-2 text-xl font-bold">
            <FaFilm className="text-white" />
            <h2>MyWebsite</h2>
          </div>
          <p className="mt-2 text-gray-300 text-sm leading-relaxed">
            We are a platform providing high-quality content across various
            genres, helping you discover the best movies, shows, and more.
          </p>
          <button className="mt-4 bg-white text-[#005555] px-4 py-2 rounded-lg transition cursor-pointer text-sm font-semibold">
            Learn More
          </button>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/About" },
              { name: "Terms & Conditions", path: "/TermsConditions" },
              { name: "Privacy & Policy", path: "/PrivacyPolicy" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li key={index} className="relative group">
                <Link
                  to={item.path}
                  className="text-white hover:text-white transition cursor-pointer relative inline-block"
                >
                  {item.name}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Useful Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Rent", "Buyers", "Tenants", "Owners", "Dealers / Builders"].map(
              (item, index) => (
                <li
                  key={index}
                  className="relative text-white hover:text-white transition cursor-pointer group"
                >
                  {item}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <p className="text-white text-sm">info@example.com</p>
          <p className="text-white text-sm mt-1">
            123 Main St, City, Country <br /> +1 234 567 890
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-white text-xs sm:text-sm">
        <p>© 2025 MyWebsite. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
