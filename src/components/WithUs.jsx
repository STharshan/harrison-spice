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
    <section className="bg-[#981921] text-white py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-down">
          <h2 className="text-3xl md:text-4xl font-semibold">Why Dine With Us</h2>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {features.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center shadow-lg p-4 rounded-lg"
              data-aos="fade-up"
              data-aos-delay={i * 200} // stagger effect
            >
              <div className="w-full h-72 rounded-t-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-sm tracking-wider">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 text-left">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="shadow-lg p-6 w-65 rounded-lg hover:scale-105 active:scale-105 duration-300 transform-all"
              data-aos="fade-up"
              data-aos-delay={i * 200 + 400} // staggered after features
            >
              <h3 className="text-5xl font-bold text-yellow-400">{stat.number}</h3>
              <p className="mt-2 uppercase text-sm tracking-wide text-yellow-200">
                {stat.label}
              </p>
              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
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
