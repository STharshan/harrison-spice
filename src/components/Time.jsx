import React from "react";
import { HashLink } from "react-router-hash-link";

export default function EventBooking() {
  return (
    <section className="bg-[#C5A265] dark:bg-black text-black dark:text-white px-6 md:px-12 lg:px-20 py-15 flex flex-col lg:flex-row items-center justify-between relative overflow-hidden font-serif transition-colors duration-500">
      {/* === LEFT CONTENT === */}
      <div className="z-10 max-w-xl">
        <p className="text-black uppercase tracking-widest mb-4 text-sm">
          Event Booking
        </p>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-10">
          Banquet Night
        </h2>

        <div className="relative max-w-xs w-full bg-[#0D1514]/60 dark:bg-[#121212]/70 backdrop-blur-md border border-[#1C1F1E] dark:border-[#2A2A2A] p-6 rounded-xl mb-10 shadow-lg hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl sm:text-2xl font-semibold text-white text-center">
            Every Tuesday
          </h3>
        </div>

        {/* Reservation */}
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Just Call for Reservation:{" "}
          <a href="tel:01162395644" className="text-[#C5A265] font-sans font-medium hover:underline">
            0116 2395 644
          </a>
        </p>

        <HashLink 
          to="/#contact"
          smooth
          className="bg-[#C7A46B] font-semibold px-6 py-3 rounded-md shadow-md hover:bg-[#d7b784] hover:text-black transition">
          BOOK YOUR TABLE
        </HashLink>
      </div>

      {/* === RIGHT IMAGE === */}
      <div className="relative mt-16 lg:mt-0">
        {/* Chili Image */}
        <img
          src="/new2.avif"
          alt="chili"
          className="absolute top-10 -left-40 w-20 md:w-24 lg:w-28 animate-bounce"
        />

        {/* Meat Dish Image */}
        <img
          src="/event.png"
          alt="dish"
          className="relative w-80 md:w-[26rem] lg:w-[30rem] object-contain"
        />
      </div>
    </section>
  );
}
