import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Apply stored theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // 🛒 OPEN ORDER MENU (WORKS EVERY TIME)
  const openOrderMenu = () => {
    // Load script once
    if (!document.getElementById("glf-script")) {
      const script = document.createElement("script");
      script.src = "https://www.fbgcdn.com/embedder/js/ewm2.js";
      script.async = true;
      script.defer = true;
      script.id = "glf-script";
      document.body.appendChild(script);
    }

    // Trigger widget every click
    const interval = setInterval(() => {
      const btn = document.querySelector(".glf-button");
      if (btn) {
        btn.click();
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <>
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

          {/* Desktop Navigation */}
          <nav className="hidden text-lg flex-grow md:flex justify-center space-x-6 font-semibold text-white dark:text-gray-100">
            <HashLink smooth to="/#home" className="hover:text-[#C5A265]">
              Home
            </HashLink>
            <HashLink smooth to="/#about" className="hover:text-[#C5A265]">
              About
            </HashLink>
            <HashLink smooth to="/#menu" className="hover:text-[#C5A265]">
              Menu
            </HashLink>
            <HashLink smooth to="/#review" className="hover:text-[#C5A265]">
              Review
            </HashLink>
            <HashLink smooth to="/#contact" className="hover:text-[#C5A265]">
              Contact
            </HashLink>
          </nav>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={openOrderMenu}
              className="bg-[#C5A265] transition-transform duration-300 hover:scale-105 py-2 px-3 rounded-lg font-semibold text-white hover:bg-white hover:text-black"
            >
              Order Now
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="ml-2">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-white"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`${isMenuOpen ? "block" : "hidden"} md:hidden top-20 fixed left-0 w-full bg-[#1a1a1a] py-4 z-40`}
      >
        <div className="flex flex-col items-center space-y-4 font-semibold text-white">
          <HashLink smooth to="/#home">Home</HashLink>
          <HashLink smooth to="/#menu">Menu</HashLink>
          <HashLink smooth to="/#about">About</HashLink>
          <HashLink smooth to="/#review">Review</HashLink>
          <HashLink smooth to="/#contact">Contact</HashLink>

          <button
            onClick={() => {
              openOrderMenu();
              setIsMenuOpen(false);
            }}
            className="bg-[#C5A265] py-2 px-3 rounded-lg font-semibold hover:bg-black"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* 🔹 HIDDEN WIDGET TRIGGER (REQUIRED) */}
      <span
        className="glf-button"
        data-glf-cuid="c9acbc14-8aa6-4d14-af94-14159d5fe9b7"
        data-glf-ruid="ceb1cabf-e92d-4a29-9345-46ab1c24b01d"
        style={{ display: "none" }}
      >
        Order
      </span>
    </>
  );
};

export default Navbar;
