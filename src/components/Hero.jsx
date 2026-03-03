import { FaUtensils } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { openOrderMenu } from "../utils/openOrderMenu";

const Hero = () => {
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
        poster="/fall.png"
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="absolute top-1/2 left-1/2 w-[120vw] h-[120vh] 
        -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#C5A265] mb-6 drop-shadow-md">
            Welcome to Harrison&apos;s Spice
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl md:text-3xl text-[#C5A265] mb-8 drop-shadow-sm">
            Refined Indian cuisine with a modern twist in the heart of Ratby
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            
            {/* Order / View Menu */}
            <div className="group bg-[#C5A265] hover:scale-105 hover:shadow-lg shadow-black flex items-center text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300">
              <FaUtensils className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />

              {/* Mobile */}
              <button
                onClick={openOrderMenu}
                className="sm:hidden transition-transform group-hover:translate-x-1"
              >
                Order Now
              </button>

              {/* Desktop */}
              <a
                href="#menu"
                className="hidden sm:inline transition-transform group-hover:translate-x-1"
              >
                View Menu
              </a>
            </div>

            {/* Reservation */}
            <a href="tel:+441162395644">
              <div className="group border border-[#C5A265] hover:scale-105 hover:shadow-lg hover:shadow-[#C5A265] text-white bg-transparent hover:bg-black flex items-center py-2 px-6 rounded-lg font-semibold transition-all duration-300">
                <FiPhone className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                <span className="transition-transform group-hover:translate-x-1">
                  Make Reservation
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;