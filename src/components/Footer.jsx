import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";
import { PiChefHatBold } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black text-gray-200 dark:text-gray-300 py-5 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Image */}
        <div className="flex justify-center lg:justify-start w-full lg:w-1/3">
          <div className="rounded-full border border-[#C5A265] dark:border-[#C5A265] overflow-hidden w-64 h-64 flex items-center justify-center">
            <img
              src="/side.png"
              alt="Restaurant Interior"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="text-center lg:text-center flex-1">
          {/* Logo */}
          <div className="flex justify-center items-center mb-4">
            <div className="bg-[#C5A265] dark:bg-[#C5A265] rounded-full p-3 mr-2">
              <PiChefHatBold className="text-black w-6 h-6" />
            </div>
            <h2 className="text-black dark:text-[#C5A265] text-2xl font-semibold">
              Harrisons Spice
            </h2>
          </div>

          {/* Visit Us */}
          <p className="text-[#C5A265] dark:text-[#C5A265] font-medium mb-2">✦ VISIT US ✦</p>
          <p>
            <a
              href="https://maps.app.goo.gl/er1GfnFtH3k9oxV79"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-black dark:text-gray-300"
            >
              23-27 Station Street, Ratby, Leicestershire, <br /> LE6 0JQ
            </a>
          </p>
          <p>
            <a
              href="mailto:reservations@harrisonsspice.co.uk"
              className="hover:underline text-black dark:text-gray-300"
            >
              reservations@harrisonsspice.co.uk
            </a>
          </p>
          <p>
            <a href="tel:+441162395644" className="text-black dark:text-gray-300">
              Booking Request : <span className="hover:underline">0116 2395 644</span>
            </a>
          </p>

          <div className="my-6 border-t border-[#C5A265] dark:border-[#C5A265] w-12 mx-auto relative">
            <span className="absolute left-1/2 -translate-x-1/2 text-[#C5A265] dark:text-[#C5A265]">✦</span>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4 mt-4">
            <FaFacebookF className="hover:text-blue-600 text-black dark:hover:text-[#C5A265] cursor-pointer transition-colors duration-300" />
            <FaInstagram className="hover:text-pink-600 text-black dark:hover:text-[#C5A265] cursor-pointer transition-colors duration-300" />
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/3">
          <div className="rounded-full border border-[#C5A265] dark:border-[#C5A265] overflow-hidden w-64 h-64 flex items-center justify-center">
            <img
              src="/side.png"
              alt="Delicious Dish"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-5 border-t border-gray-700 dark:border-gray-600 pt-6 transition-colors duration-300">
        <div className="container mt-2 mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Left - Links */}
          <div className="flex gap-4 text-black dark:text-gray-400 text-sm">
            <a
              href="/privacy-policy"
              className="hover:text-[#C5A265] dark:hover:text-[#C5A265] transition hover:underline"
            >
              Privacy Policy
            </a>
            <span>|</span>
            <a
              href="/terms&condition"
              className="hover:text-[#C5A265] dark:hover:text-[#C5A265] transition hover:underline"
            >
              Terms & Conditions
            </a>
          </div>

          {/* Center - Copyright */}
          <div className="text-center text-sm text-black dark:text-gray-400">
            <p>© 2025 All Rights Reserved</p>
          </div>

          {/* Right - Powered by */}
          <div className="text-sm font-semibold text-black dark:text-gray-400">
            <p>
              Powered by{" "}
              <a
                href="https://www.ansely.co.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-[#C5A265] hover:underline"
              >
                Ansely
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
