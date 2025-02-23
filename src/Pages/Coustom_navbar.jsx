import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getAuthToken } from "../Protected/ProtectedRoute";

function CustomNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const token = getAuthToken();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // <nav
    //   className={`fixed top-0 left-20 right-20 z-50 text-white font-bold px-4 py-4 transition-all duration-300 ${
    //     isScrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"
    //   }`}
    // >
    <nav
      className={`fixed ${
        isScrolled
          ? "top-0 left-0 right-0 bg-[#005555] bg-opacity-80 shadow-lg rounded-none font-serif"
          : "top-2 left-10 right-10 bg-transparent border border-[#005555] rounded-full shadow-lg font-serif"
      } z-50 text-white font-bold px-6 py-3 transition-all duration-700 backdrop-blur-md`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-400 hover:text-blue-900 transition-colors duration-300"
        >
          LOGO
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-2xl"
        >
          {isMenuOpen ? <IoClose /> : <IoMenu />}
        </button>

        {/* Navbar Links */}
        <ul
          className={`md:flex gap-8 text-lg font-medium transition-all duration-300 absolute md:relative md:flex-row md:space-x-8 bg-gray-800 md:bg-transparent md:w-auto w-full px-4 py-8 md:py-0 md:px-0 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Home
            </Link>
          </li>

          {/* Properties with Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setDropdownOpen("properties")}
            onMouseLeave={() => setDropdownOpen(null)}
          >
            <button className="hover:text-blue-500 transition-colors duration-300">
              Properties
            </button>
            {dropdownOpen === "properties" && (
              <div className="absolute top-full left-0 bg-gray-800 text-white rounded-md shadow-lg w-48">
                <Link
                  to="/commercial"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Commercial
                </Link>
                <Link
                  to="/luxury"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Luxury
                </Link>
                <Link
                  to="/rental"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Rental
                </Link>
                <Link
                  to="/premium"
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Premium
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link
              to="/booking"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Booking
            </Link>
          </li>

          <li>
            <Link
              to="/Coustom_contact"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="flex items-center gap-4">
          {token ? (
            <Link
              to="/login"
              className="bg-yellow-600 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors duration-300 shadow-lg"
              onClick={() => Cookies.remove("authToken")}
            >
              Logout
            </Link>
          ) : (
            <>
            <Link
              to="/login"
              className="bg-yellow-600 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors duration-300 shadow-lg"
            >
              Sign in
            </Link>
         
          {/* Signup Button */}
          <Link
            to="/signup"
            className="bg-yellow-600 text-white px-4 py-2 rounded-md font-medium hover:bg-yellow-400 transition-colors duration-300 shadow-lg"
          >
            Sign Up
          </Link>
          </>
        )}
        </div>
      </div>
    </nav>
  );
}

export default CustomNavbar;
