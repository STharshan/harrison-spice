"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const featuredMenus = [
  {
    title: "ASIAN STYLE",
    description: "Asian style canape and bowl food menu can have any theme you like.",
    image: "/f1.jpg",
  },
  {
    title: "CANAPE",
    description: "Asian style canape and bowl food menu can have any theme you like.",
    image: "/f2.jpg",
  },
  {
    title: "DELUXE",
    description: "Asian style canape and bowl food menu can have any theme you like.",
    image: "/f3.jpg",
  },
];

const FeaturedMenus = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-16 bg-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif mb-4" data-aos="fade-up">
          My Featured Menus
        </h2>
        <p
          className="text-gray-500 text-lg font-semibold max-w-md mx-auto mb-12"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          My passion for food has brought many new, fun and delicious dishes to the table.
        </p>

        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {featuredMenus.map((menu, index) => (
            <div
              key={index}
              className="relative bg-opacity-70 hover:shadow-[#981921] active:shadow-[#981921] text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 200} // Stagger animation
            >
              <img
                src={menu.image}
                alt={menu.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-opacity-40 text-black font-semibold flex flex-col justify-center items-center p-6">
                <h3 className="text-xl font-serif mb-2">{menu.title}</h3>
                <p className="text-md mb-4">{menu.description}</p>
                <a
                  href="#"
                  className="underline hover:text-gray-900"
                >
                  Continue Reading ...
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenus;
