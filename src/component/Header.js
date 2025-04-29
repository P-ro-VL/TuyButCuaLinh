import React, { useState } from "react";
import { FiMenu, FiX, FiUser } from "react-icons/fi"; // Using Feather Icons

import Logo from "../assets/Logo.png";

function Header({ page = "home" }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: "GIỚI THIỆU", current: page == "home", page: "/" }, // Example 'current' state
    { name: "TẤT CẢ", current: page == "search", page: "/search" },
    {
      name: "BỘ SƯU TẬP",
      current: page == "collections",
      page: "/collections",
    },
  ];

  return (
    <nav className="bg-white shadow-sm">
      {" "}
      {/* Using white bg and subtle shadow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Container */}
        <div className="flex items-center justify-between h-16 md:h-20">
          {" "}
          {/* Flex container for items */}
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <a href="/">
              <img src={Logo} style={{ width: "60px", height: "60px" }} />
            </a>
          </div>
          {/* Desktop Navigation Links (Hidden on Mobile) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.page}
                className={`
                                    px-3 py-2 rounded-md text-md font-medium
                                    ${
                                      item.current
                                        ? "text-red-800 font-semibold" // Active link style
                                        : "text-gray-500 hover:text-gray-900" // Inactive link style
                                    }
                                `}
                // Add aria-current if needed for accessibility based on routing
                // aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
          {/* Right side icons (User Icon) */}
          <div className="hidden md:block">
            <a
              href="/"
              className="text-red-800 hover:text-red-600 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500"
            >
              <span className="sr-only">View profile</span>{" "}
              {/* Screen reader text */}
              <FiUser className="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          {/* Mobile Menu Button (Visible on Mobile) */}
          <div className="md:hidden flex items-center">
            {/* Mobile User Icon - Placed before hamburger for visual flow */}
            <a
              href="#profile"
              className="text-red-800 hover:text-red-600 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 mr-2"
            >
              <span className="sr-only">View profile</span>
              <FiUser className="h-6 w-6" aria-hidden="true" />
            </a>
            {/* Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-red-800 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" /> // Close icon
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" /> // Menu icon
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu (Dropdown) */}
      {/* Use a transition for smoother open/close */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 border-t border-gray-200" : "max-h-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.page}
              className={`
                                block px-3 py-2 rounded-md text-base font-medium
                                ${
                                  item.current
                                    ? "bg-red-50 text-red-800 font-semibold" // Active mobile link
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900" // Inactive mobile link
                                }
                             `}
              // aria-current={item.current ? 'page' : undefined}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Header;
