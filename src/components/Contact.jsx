"use client";
import React from "react";

const Contact = () => {
  return (
    <section
      className="bg-[#981921] dark:bg-black text-white dark:text-gray-200 py-20 px-6 lg:px-20 scroll-m-15"
      id="contact"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 relative">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Arched Image */}
          <div className="relative w-80 h-96 overflow-hidden rounded-t-full border border-[#C5A265] p-1">
            <img
              src="/side.png"
              alt="Restaurant Interior"
              className="w-full h-full object-cover rounded-t-full"
            />
          </div>

          {/* Visit Info */}
          <div className="mt-8 space-y-2">
            <h3 className="text-[#C5A265] font-medium tracking-wide">
              ✦ VISIT US ✦
            </h3>
            <p className="text-gray-300 dark:text-gray-400">
              <a
                href="https://maps.app.goo.gl/er1GfnFtH3k9oxV79"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                23-27 Station Street, Ratby, Leicestershire, LE6 0JQ
              </a>
            </p>

            <p className="text-gray-300 dark:text-gray-400 mt-3">
              Monday - Thursday — 5.00 pm – 10.30 pm
            </p>
            <p className="text-gray-300 dark:text-gray-400">
              Friday - Saturday — 5.00 pm – 11.00 pm
            </p>
            <p className="text-gray-300 dark:text-gray-400">
              Sunday — 5.00 pm – 9.30 pm
            </p>

            <p className="text-gray-300 dark:text-gray-400 mt-4">
              Booking:{" "}
              <a href="tel:+441162395644" className="hover:underline">
                0116 2395 644
              </a>
            </p>
            <p className="text-gray-300 dark:text-gray-400">
              Email:{" "}
              <a
                href="mailto:reservations@harrisonsspice.co.uk"
                target="_blank"
                className="hover:underline"
              >
                reservations@harrisonsspice.co.uk
              </a>
            </p>
          </div>
        </div>

        {/* CENTER DIVIDER */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full">
          <div className="h-full w-px bg-[#C5A265] mx-auto relative">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C5A265]"></span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C5A265]"></span>
          </div>
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="md:pl-12">
          <h3 className="text-[#C5A265] text-sm tracking-wider mb-3">
            ✦ WRITE TO US ✦
          </h3>
          <h2 className="text-4xl font-serif mb-3">Message us</h2>
          <p className="text-gray-300 dark:text-gray-400 mb-8">
            Contact us — we aim to reply within 24 hours and are happy to help!
          </p>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 bg-transparent border border-gray-500 dark:border-gray-600 focus:border-[#C5A265] outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 bg-transparent border border-gray-500 dark:border-gray-600 focus:border-[#C5A265] outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 bg-transparent border border-gray-500 dark:border-gray-600 focus:border-[#C5A265] outline-none placeholder-gray-400 dark:placeholder-gray-500"
            />
            <textarea
              rows="4"
              placeholder="Special Request"
              className="w-full px-4 py-3 bg-transparent border border-gray-500 dark:border-gray-600 focus:border-[#C5A265] outline-none placeholder-gray-400 dark:placeholder-gray-500"
            ></textarea>

            <button
              type="submit"
              className="bg-[#C5A265] text-black px-8 py-3 font-semibold tracking-wide cursor-pointer hover:bg-[#c28927] transition "
            >
              SEND YOUR MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
