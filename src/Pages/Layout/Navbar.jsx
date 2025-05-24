import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { getAuthToken, clearAuthSession } from "../redux/slices/authUtlis";
import { getAuthToken, clearAuthSession } from "../../redux/slices/authUtlis";
import { getCategories } from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Image/logo.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const token = getAuthToken();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDashboard = location.pathname === "/dashboard";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  
    const { categories } = useSelector((state) => state.category);
  // const { singleProperty } = useSelector((state) => state.property);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories({ page: 1, limit: 100 }));
  }, [dispatch]);

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full font-serif font-bold px-4 sm:px-8 py-4 transition-all duration-700 ${
        isScrolled
          ? "bg-white shadow-lg text-gray-800"
          : "bg-white bg-opacity-95 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {!isDashboard ? (
          <>
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={Logo}
                alt="Company Logo"
                className="h-10 w-auto sm:h-12 object-contain"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-3xl text-[#005555]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </button>

            {/* Navbar Links */}
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col md:flex md:flex-row md:items-center absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent md:space-x-10 gap-6 md:gap-0 p-6 md:p-0 shadow-md md:shadow-none z-40 rounded-b-xl md:rounded-none`}
            >
              <Link
                to="/"
                className="text-[#005555] hover:text-[#52b9b9] transition"
              >
                Home
              </Link>

              <Link
                to="/About"
                className="text-[#005555] hover:text-[#52b9b9] transition"
              >
                About
              </Link>

              <li
                className="relative list-none"
                onMouseEnter={() => setDropdownOpen("properties")}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="hover:text-[#52b9b9] text-[#005555] transition-colors duration-300 focus:outline-none appearance-none">
                  Properties
                </button>
                {dropdownOpen === "properties" && (
                  <div className="absolute top-full left-0 bg-gray-800 text-white rounded-md shadow-lg w-64">
                    {categories.map((cat) => (
                      <div key={cat._id} className="group relative">
                        <button className="w-full text-left px-4 py-2 hover:bg-gray-700">
                          {cat.categoryName}
                        </button>
                        {cat.subCategories.length > 0 && (
                          <div className="absolute top-0 left-full bg-gray-700 text-white rounded-md shadow-lg w-48 hidden group-hover:block">
                            {cat.subCategories.map((sub) => (
                              <Link
                                key={sub.name}
                                to={`/property?category=${cat._id}&subCategory=${sub.name}`}
                                className="block px-4 py-2 hover:bg-gray-600"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </li>

              <Link
                to="/contact"
                className="text-[#005555] hover:text-[#52b9b9] transition"
              >
                Contact Us
              </Link>

              {/* Auth Buttons for mobile */}
              <div className="flex flex-col md:hidden gap-3 mt-4">
                {token ? (
                  <button
                    onClick={handleLogout}
                    className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:bg-blue-600 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition"
                    >
                      LogIn
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Auth Buttons for desktop */}
            <div className="hidden md:flex items-center gap-4">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:bg-blue-600 transition shadow-md"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition shadow-md"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition shadow-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-end w-full">
            <button
              onClick={handleLogout}
              className="bg-[#005555] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition-colors duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
