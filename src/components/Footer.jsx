import React from "react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#981921] text-gray-200 py-8 px-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Image */}
        <div className="flex justify-center lg:justify-start w-full lg:w-1/3">
          <div className="rounded-full border border-yellow-600 overflow-hidden w-64 h-64 flex items-center justify-center">
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
            <div className="bg-yellow-600 rounded-full p-3 mr-2">
              <span className="text-black font-bold">🍴</span>
            </div>
            <h2 className="text-white text-2xl font-semibold">Harrisons Spice</h2>
          </div>

          {/* Visit Us */}
          <p className="text-yellow-500 font-medium mb-2">✦ VISIT US ✦</p>
          <p>
            <a
              href="https://maps.app.goo.gl/er1GfnFtH3k9oxV79" // replace with actual Google Maps link
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-gray-200"
            >
              23-27 Station Street, Ratby, Leicestershire, LE6 0JQ
            </a>
          </p>
          <p>
            <a href="mailto:reservations@harrisonsspice.co.uk" target="_blank" className="hover:underline text-gray-200">
              reservations@harrisonsspice.co.uk
            </a>
          </p>
          <p>
            <a href="tel:+441162395644" className="text-gray-200">
              Booking Request : <span className="hover:underline">0116 2395 644</span> 
            </a>
          </p>

          <div className="my-6 border-t border-yellow-600 w-12 mx-auto relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-yellow-600">✦</span>
          </div>

          {/* Newsletter */}
          <h3 className="text-white text-xl font-semibold mb-1">Our Newsletter</h3>
          <p className="text-gray-400 mb-4">
            Subscribe us & Get 25% Off. Get latest updates.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2 rounded-l-md bg-[#00684A] border border-gray-500 text-white focus:outline-none"
            />
            <button className="px-6 py-2 bg-yellow-600 text-black font-semibold rounded-r-md hover:bg-yellow-500 transition">
              SUBSCRIBE
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end w-full lg:w-1/3">
          <div className="rounded-full border border-yellow-600 overflow-hidden w-64 h-64 flex items-center justify-center">
            <img
              src="/side.png"
              alt="Delicious Dish"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center">
        <p>© 2025 All Rights Reserved</p>
        <div className="mt-2 text-center font-semibold">
          <p>
            Powered by{" "}
            <a
              href="https://www.ansely.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:underline"
            >
              Ansely
            </a>
          </p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <FaFacebookF className="hover:text-yellow-600 cursor-pointer" />
          <FaInstagram className="hover:text-yellow-600 cursor-pointer" />
          <FaPinterestP className="hover:text-yellow-600 cursor-pointer" />
          <FaYoutube className="hover:text-yellow-600 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
