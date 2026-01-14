import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect for a "beautiful" sticky feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply stored theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const openOrderMenu = () => {
    if (!document.getElementById("glf-script")) {
      const script = document.createElement("script");
      script.src = "https://www.fbgcdn.com/embedder/js/ewm2.js";
      script.async = true;
      script.defer = true;
      script.id = "glf-script";
      document.body.appendChild(script);
    }

    const interval = setInterval(() => {
      const btn = document.querySelector(".glf-button");
      if (btn) {
        btn.click();
        clearInterval(interval);
      }
    }, 200);
  };

  const handleMobileLinkClick = () => setIsMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-black/90 dark:bg-gray-900/90 backdrop-blur-md py-2 shadow-lg" 
            : "bg-black dark:bg-gray-900 py-4"
        } border-b border-white/10`}
      >
        <div className="px-6 flex items-center justify-between max-w-7xl mx-auto">
          
          {/* 1. Logo Section */}
          <div className="flex-shrink-0">
            <img
              src="logo.png"
              alt="Logo"
              className="h-12 md:h-14 w-auto rounded-lg transition-transform hover:scale-105"
            />
          </div>

          {/* 2. Desktop Navigation (Hidden on Mobile) */}
          <nav className="hidden lg:flex items-center space-x-8 font-medium text-white">
            {["home", "about", "menu", "review", "contact"].map((section) => (
              <HashLink
                key={section}
                smooth
                to={`/#${section}`}
                className="hover:text-[#C5A265] transition-colors relative group"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C5A265] transition-all group-hover:w-full"></span>
              </HashLink>
            ))}
          </nav>

          {/* 3. Action Section (Theme & Buttons) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <ThemeToggle />
            
            {/* Desktop Order Button */}
            <button
              onClick={openOrderMenu}
              className="hidden md:block bg-[#C5A265] py-2 px-5 rounded-full font-bold text-white hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              Order Now
            </button>

            {/* Mobile Hamburger - Perfectly Aligned */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-center">
                <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
                <span className={`h-0.5 w-full bg-white transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-transform duration-500 ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-white font-bold text-2xl">
          {["home", "about", "menu", "review", "contact"].map((section, idx) => (
            <HashLink
              key={section}
              smooth
              to={`/#${section}`}
              onClick={handleMobileLinkClick}
              className={`hover:text-[#C5A265] transform transition-all delay-${idx * 100} ${isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </HashLink>
          ))}

          <button
            onClick={() => {
              openOrderMenu();
              handleMobileLinkClick();
            }}
            className="bg-[#C5A265] py-3 px-10 rounded-full text-xl shadow-xl active:scale-95 transition-transform"
          >
            Order Now
          </button>
        </div>
      </div>

      {/* Hidden Widget */}
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