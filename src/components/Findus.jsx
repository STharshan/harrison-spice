import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FindUs = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      offset: 100, // trigger animation 100px before element
      easing: "ease-in-out",
      once: true, // animate only once
    });
  }, []);

  return (
    <section className="py-10 px-4 bg-[#C7A46B] dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-10 text-white dark:text-[#C5A265]"
          data-aos="fade-down"
        >
          Find Us
        </h2>

        <div
          className="rounded-lg overflow-hidden shadow-lg w-full h-[400px]"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <iframe
            title="Google Map - 23-27 Station Rd, Ratby, Leicester LE6 0JQ, UK"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d151.2963491493174!2d-1.2439683728261592!3d52.64658156397697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487761550ffa0049%3A0xc4c06f785307435a!2sHarrisons%20Spice!5e0!3m2!1sen!2slk!4v1764337675815!5m2!1sen!2slk"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 w-full h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
