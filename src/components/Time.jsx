"use client";
import React from "react";

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

        {/* Opening Hours Box */}
        <div className="relative bg-[#0D1514]/60 dark:bg-[#121212]/70 backdrop-blur-sm border border-[#1C1F1E] dark:border-[#2A2A2A] p-8 rounded-lg mb-10">
          {/* faint drink image */}
          {/* <img
            src="/new3.avif"
            alt="drink"
            className="absolute right-6 bottom-6 opacity-10 w-40 md:w-48 lg:w-56 select-none pointer-events-none"
          /> */}

          <h3 className="text-2xl mb-6 font-normal text-white">
            Every Tuesday
          </h3>

          {/* <div className="space-y-3 text-base md:text-lg text-gray-300">
            <div className="flex justify-between">
              <span className="text-[#C5A265]">Monday - Thursday</span>
              <span>5.00 pm – 10.30 pm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C5A265]">Friday - Saturday</span>
              <span>5.00 pm – 11.00 pm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C5A265]">Sunday</span>
              <span>5.00 pm – 9.30 pm</span>
            </div>
          </div> */}
        </div>

        {/* Reservation */}
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Just Call for Reservation{" "}
          <span className="text-[#C5A265] font-medium">0116 2395 644</span>
        </p>

        <button className="bg-black text-[#C7A46B] font-semibold px-6 py-3 rounded-md shadow-md hover:bg-[#d7b784] hover:text-black transition">
          BOOK YOUR TABLE
        </button>
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
