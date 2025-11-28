import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Apply stored theme from localStorage when mounted
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="bg-black border-b border-gray-300 dark:border-gray-700 shadow-sm fixed top-0 left-0 w-full z-50 transition-colors duration-300">
        <div className="px-4 py-2 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="logo.png"
              alt="Harrison's Spice Logo"
              width={200}
              height={60}
              className="h-16 w-auto rounded-lg"
            />
          </div>

          {/* Navigation Links */}
          <nav className="hidden text-lg flex-grow md:flex justify-center space-x-6 font-semibold text-white dark:text-gray-100">
            <HashLink
              smooth
              to="/#home"
              className="hover:text-[#C5A265] transition-colors"
            >
              Home
            </HashLink>
            <HashLink
              smooth
              to="/#about"
              className="hover:text-[#C5A265] transition-colors"
            >
              About
            </HashLink>
            <HashLink
              smooth
              to="/#menu"
              className="hover:text-[#C5A265] transition-colors"
            >
              Menu
            </HashLink>
            <HashLink
              smooth
              to="/#review"
              className="hover:text-[#C5A265] transition-colors"
            >
              Review
            </HashLink>
            <HashLink
              smooth
              to="/#contact"
              className="hover:text-[#C5A265] transition-colors"
            >
              Contact
            </HashLink>
          </nav>

          {/* Right Section (Reservation + Theme Toggle) */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="bg-[#C5A265] transition-transform duration-300 hover:scale-105 active:scale-105 py-2 px-3 rounded-lg font-semibold text-white hover:bg-white hover:text-black">
              Make Reservation
            </button>
          </div>

          {/* ✅ Theme toggle in mobile menu */}
          <div className="ml-2">
            <ThemeToggle />
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center p-2 rounded-md focus:outline-none text-white dark:text-gray-100"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 hover:text-[#C5A265]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 hover:text-[#C5A265]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"
          } md:hidden top-20 fixed left-0 w-full bg-[#1a1a1a] py-4 z-40 transition-colors duration-300`}
      >
        <div className="flex flex-col items-center space-y-4 font-semibold text-white dark:text-gray-100">
          <HashLink
            smooth
            to="/#home"
            className="hover:text-[#C5A265] transition-colors"
          >
            Home
          </HashLink>
          <HashLink
            smooth
            to="/#menu"
            className="hover:text-[#C5A265] transition-colors"
          >
            Menu
          </HashLink>
          <HashLink
            smooth
            to="/#about"
            className="hover:text-[#C5A265]transition-colors"
          >
            About
          </HashLink>
          <HashLink
            smooth
            to="/#review"
            className="hover:text-[#C5A265]transition-colors"
          >
            Review
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="hover:text-[#C5A265] transition-colors"
          >
            Contact
          </HashLink>

          <button className="bg-[#C5A265] py-2 px-3 rounded-lg font-semibold transition-transform duration-300 hover:scale-105 active:scale-105 text-white hover:bg-black hover:text-white">
            Make Reservation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
