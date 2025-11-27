"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const makiItems = [
  {
    name: "Lamb Shank",
    description:
      "A tantalizing blend of spicy tuna, cucumber, and avocado, harmoniously rolled in nori and seasoned rice.",
    price: "£x",
    image: "/n4.png",
  },
  {
    name: "Monk Fish",
    description:
      "Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures.",
    price: "£x",
    image: "/n3.png",
  },
  {
    name: "Duck Meat",
    description:
      "Shiitake mushrooms, avocado, and pickled daikon radish nestle within a roll of seasoned rice, coated with nutty sesame seeds.",
    price: "£x",
    image: "/n2.png",
  },
  {
    name: "King Prawn",
    description:
      "A vibrant assortment of julienned carrots, bell peppers, and cucumber, tightly encased in a nori-wrapped rice roll.",
    price: "£x",
    image: "/n1.png",
  },
];

export default function FeaturedMenu() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <section className="bg-white dark:bg-black py-20 px-6 font-serif transition-colors duration-500">
      {/* Section Title */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2
          className="text-4xl md:text-5xl font-light text-gray-800 dark:text-[#f5f0e1] tracking-widest"
          data-aos="fade-down"
        >
          <span className="border-b text-[#C5A265] border-gray-400 dark:border-gray-600 pb-2">
            MAKI
          </span>
        </h2>
      </div>

      {/* Menu Items */}
      <div className="space-y-10 max-w-5xl mx-auto">
        {makiItems.map((item, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 
                       bg-gray-100 dark:bg-[#151515]/60 rounded-2xl p-6 
                       hover:bg-gray-200 dark:hover:bg-[#1c1c1c]/80 
                       transition-all duration-300 shadow-md dark:shadow-none"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full sm:w-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <h3 className="text-xl md:text-2xl text-gray-800 dark:text-[#f5f0e1] font-light uppercase tracking-widest">
                  {item.name}
                </h3>
                <span className="text-gray-700 dark:text-[#f5f0e1] text-lg">
                  {item.price}
                </span>
              </div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
