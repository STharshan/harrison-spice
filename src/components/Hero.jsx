import React from "react";
import { FaUtensils } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

const Hero = () => {

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

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1
            data-aos="fade-up"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#C5A265] mb-6 drop-shadow-md"
          >
            Welcome to Harrison&apos;s Spice
          </h1>

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-xl sm:text-2xl md:text-3xl text-[#C5A265] mb-8 drop-shadow-sm"
          >
            Refined Indian cuisine with a modern twist in the heart of Ratby
          </p>

          {/* Buttons */}
          <div
            data-aos="zoom-in"
            data-aos-delay="400"
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            {/* View Menu */}
            <button className="group bg-[#C5A265] hover:scale-105 hover:shadow-lg shadow-black flex items-center text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300">
              <FaUtensils className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />

              {/* Mobile text */}
              <button
                onClick={openOrderMenu}
                className="sm:hidden transition-transform group-hover:translate-x-1">
                Order Now
              </button>

              {/* Desktop text */}
              <a
                href="#menu"
                className="hidden sm:inline transition-transform group-hover:translate-x-1">
                View Menu
              </a>
            </button>


            {/* Reservation */}
            <a href="tel:01162395644">
              <button className="group border border-[#C5A265] hover:scale-105 hover:shadow-lg hover:shadow-[#C5A265] text-white bg-transparent hover:bg-black flex items-center py-2 px-6 rounded-lg font-semibold transition-all duration-300">
                <FiPhone className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span className="transition-transform group-hover:translate-x-1">
                  Make Reservation
                </span>
              </button>
            </a>
          </div>
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
    </section>
  );
};

export default Hero;
