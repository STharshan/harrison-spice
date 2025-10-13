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
    <section className="py-10 px-4 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-10 text-[#00684A] dark:text-white"
          data-aos="fade-down"
        >
          Find Us
        </h2>

        <div
          className="rounded-lg overflow-hidden shadow-lg w-full h-[400px] border-2 border-[#981921] dark:border-yellow-400"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <iframe
            title="Google Map - 23-27 Station Rd, Ratby, Leicester LE6 0JQ, UK"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2420.740365125066!2d-1.2465065241078574!3d52.64660362684948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48775efbc36c8d07%3A0xe0828581570217f0!2s23-27%20Station%20Rd%2C%20Ratby%2C%20Leicester%20LE6%200JQ%2C%20UK!5e0!3m2!1sen!2slk!4v1758021041283!5m2!1sen!2slk"
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
