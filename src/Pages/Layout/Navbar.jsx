import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuthToken, clearAuthSession } from "../../redux/slices/authUtlis";
import { getCategories } from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Image/logo.png.png";
import ProfileMenu from "../../CommonComponent/ProfileMenu";
import Chatbot from "./Chatbox";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
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
      <div className="mx-auto flex items-center justify-between">
        {!isDashboard ? (
          <>
            <div className="flex items-center">
              <img
                src={Logo}
                alt="Company Logo"
                className="h-10 w-auto sm:h-12 object-contain"
              />
            </div>

            {/* Mobile Menu Button */}
            <span
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-3xl text-[#112757]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <IoClose /> : <IoMenu />}
            </span>

            {/* Navbar Links */}
            <div
              className={`${
                isMenuOpen ? "flex" : "hidden"
              } flex-col md:flex md:flex-row md:items-center absolute md:relative top-full left-20 w-full md:w-auto bg-white md:bg-transparent md:space-x-10 gap-6 md:gap-0 p-6 md:p-0 shadow-md md:shadow-none z-40 rounded-b-xl md:rounded-none`}
            >
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-[#112757] hover:text-[#52b9b9] transition"
              >
                Home
              </Link>

              <li
                className={`relative list-none ${
                  isMenuOpen ? "block" : "md:inline-block"
                }`}
                onMouseEnter={() =>
                  !isMenuOpen && setDropdownOpen("properties")
                }
                onMouseLeave={() => !isMenuOpen && setDropdownOpen(null)}
              >
                <Link
                  className="hover:text-[#52b9b9] text-[#112757] transition-colors duration-300 focus:outline-none appearance-none flex items-center"
                  onClick={() =>
                    isMenuOpen &&
                    setDropdownOpen(
                      dropdownOpen === "properties" ? null : "properties"
                    )
                  }
                  type="button"
                >
                  Properties
                  <span className="ml-1"></span>
                </Link>
                {/* Desktop Dropdown */}
                {!isMenuOpen && dropdownOpen === "properties" && (
                  <div className="absolute top-full left-0 bg-gray-800 text-white rounded-md shadow-lg w-64 z-50">
                    {categories.map((cat) => (
                      <div key={cat._id} className="group relative">
                        <button className="underline decoration-[3px] underline-offset-4 w-full text-left px-4 py-[3px] hover:bg-gray-700">
                          {cat.categoryName}
                        </button>
                        {cat.subCategories.length > 0 && (
                          <div className="absolute top-0 left-full bg-[#112757] text-white rounded-md shadow-lg w-48 hidden group-hover:block">
                            {cat.subCategories.map((sub) => (
                              <Link
                                key={sub.name}
                                to={`/property?category=${cat._id}&subCategory=${sub.name}`}
                                className="underline decoration-[3px] underline-offset-4 block px-4 py-2"
                                onClick={() => setIsMenuOpen(false)}
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
                {/* Mobile Dropdown */}

                {isMenuOpen && dropdownOpen === "properties" && (
                  <div className="bg-gray-100 text-[#112757] rounded-md shadow-lg mt-2 w-full max-h-64 overflow-y-auto">
                    {categories.map((cat) => (
                      <div key={cat._id} className="border-b last:border-b-0">
                        <button
                          className="flex items-center justify-between w-50 px-4 py-2 font-semibold focus:outline-none"
                          onClick={() =>
                            setExpandedCategory(
                              expandedCategory === cat._id ? null : cat._id
                            )
                          }
                        >
                          <span>{cat.categoryName}</span>
                          {cat.subCategories.length > 0 && (
                            <span className="ml-2">
                              {expandedCategory === cat._id ? "▲" : "▼"}
                            </span>
                          )}
                        </button>
                        {cat.subCategories.length > 0 &&
                          expandedCategory === cat._id && (
                            <div className="pl-6">
                              {cat.subCategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  onClick={() => setIsMenuOpen(false)}
                                  to={`/property?category=${cat._id}&subCategory=${sub.name}`}
                                  className="block px-4 py-2 hover:bg-gray-200"
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
                to="/About"
                className="text-[#112757] hover:text-[#52b9b9] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              <Link
                to="/contact"
                className="text-[#112757] hover:text-[#52b9b9] transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              {/* Auth Buttons for mobile */}
              <div className="flex flex-col md:hidden gap-3 mt-2">
                {token ? (
                  <ProfileMenu />
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="bg-[#112757] text-white px-3 w-25 py-1 text-sm rounded-md font-medium hover:text-[#52b9b9] transition md:px-5 md:py-2 md:text-base"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      LogIn
                    </Link>
                    <Link
                      to="/signup"
                      className="bg-[#112757] w-25 text-white px-3 py-1 text-sm rounded-md font-medium hover:text-[#52b9b9] transition md:px-5 md:py-2 md:text-base"
                      onClick={() => setIsMenuOpen(false)}
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
                <ProfileMenu />
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-[#112757] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition shadow-md"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-[#112757] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition shadow-md"
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
              className="bg-[#112757] text-white px-5 py-2 rounded-md font-medium hover:text-[#52b9b9] transition-colors duration-300 shadow-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <Chatbot />
    </nav>
  );
}

export default Navbar;
