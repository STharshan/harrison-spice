"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyDineWithUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const features = [
    { image: "/side.png", title: "SKILLED CHEF" },
    { image: "/side.png", title: "HYGIENIC FOOD" },
    { image: "/side.png", title: "FRESH AMBIENCE" },
    { image: "/side.png", title: "SECRET RECIPE" },
  ];

  const stats = [
    {
      number: "60+",
      label: "MONTHLY VISITORS",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry has been.",
    },
    {
      number: "22+",
      label: "POSITIVE REVIEWS",
      text: "Simply dummy text of the printing and typesetting industry lorem Ipsum has been.",
    },
    {
      number: "135+",
      label: "SECRET RECIPES",
      text: "Simply dummy text of the printing and typesetting lorem Ipsum has been industry.",
    },
    {
      number: "10+",
      label: "AWARD & HONORS",
      text: "Ipsum is simply dummy text printing and typesetting industry lorem Ipsum.",
    },
  ];

  return (
    <section className="bg-[#981921] dark:bg-black text-white dark:text-gray-200 py-16 px-6 lg:px-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-semibold text-white dark:text-white transition-colors duration-500">
            Why Dine With Us
          </h2>
        </div>

        {/* Combined Features + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6">
          {/* Features */}
          {features.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center shadow-lg dark:shadow-gray-700 p-6 rounded-lg bg-white dark:bg-[#981921] hover:scale-105 active:scale-105 transition-all duration-300 md:col-span-2"
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <div className="w-full h-68 rounded-t-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm tracking-wider text-gray-800 dark:text-gray-200">
                {item.title}
              </p>
            </div>
          ))}

          {/* Stats */}
          {stats.map((stat, i) => (
            <div
              key={i}
              className="shadow-lg dark:shadow-gray-700 p-6 rounded-lg bg-white dark:bg-[#981921] hover:scale-105 active:scale-105 transition-all duration-300 md:col-span-2"
              data-aos="fade-up"
              data-aos-delay={i * 200 + 400}
            >
              <h3 className="text-5xl font-bold text-yellow-400">{stat.number}</h3>
              <p className="mt-2 uppercase text-sm tracking-wide text-yellow-200">
                {stat.label}
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDineWithUs;
