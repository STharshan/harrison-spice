import React, { useEffect } from "react";
import { FaUtensils } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      id="home"
      className="relative h-[100vh] bg-white dark:bg-black transition-colors duration-300"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1
            data-aos="fade-up"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#00684A] mb-6 drop-shadow-md transition-colors duration-300"
          >
            Welcome to Harrison&apos;s Spice
          </h1>

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl sm:text-2xl md:text-3xl text-[#00684A] mb-8 drop-shadow-sm transition-colors duration-300"
          >
            Refined Indian cuisine with a modern twist in the heart of Ratby
          </p>

          {/* Buttons */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* View Menu Button */}
            <a href="#menu">
              <button className="group bg-[#00684A] hover:scale-105 active:scale-105 hover:shadow-lg hover:shadow-[#47e2b6] active:shadow-[#47e2b6] flex items-center text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md">
                <FaUtensils className="mr-2 h-5 w-5 transform transition-all duration-300 group-hover:-translate-x-1" />
                <span className="transform transition-all duration-300 group-hover:translate-x-1">
                  View Menu
                </span>
              </button>
            </a>

            {/* Make Reservation Button */}
            <a href="tel:01162395644">
              <button className="group border hover:scale-105 hover:shadow-lg active:shadow-lg active:shadow-[#e76971] hover:shadow-[#e76971] text-[#981921] hover:bg-[#981921] flex items-center hover:text-white py-2 px-6 rounded-lg font-semibold bg-transparent transition-all duration-300 shadow-md">
                <FiPhone className="mr-2 h-5 w-5 transform transition-all duration-300 group-hover:-translate-x-1" />
                <span className="transform transition-all duration-300 group-hover:translate-x-1">
                  Make Reservation
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
