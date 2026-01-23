import React, { useState } from "react";
import {
  GiKnifeFork,
  GiMeal,
  GiChefToque,
} from "react-icons/gi"; // Restaurant/Food Icons
import { FiArrowRight, FiX } from "react-icons/fi";

const items = [
  {
    title: "Refined Indian Sub-Continental Cuisine",
    short:
      "A carefully curated menu blending traditional classics with innovative signature dishes, combining rich Eastern flavours with a modern Western touch.",
    img: "/w3.jpeg",
    icon: <GiMeal className="w-6 h-6 text-white" />,
  },
  {
    title: "Creative Culinary Excellence",
    short:
      "Every dish is crafted with precision, creativity, and authenticity - delivering a unique dining experience that celebrates both heritage and innovation.",
    img: "/w2.jpg",
    icon: <GiChefToque className="w-6 h-6 text-white" />,
  },
  {
    title: "Service Beyond Expectations",
    short:
      "Our courteous, knowledgeable team is trained to provide warm, attentive, and impeccable service that elevates your entire dining experience.",
    img: "/w1.jpg",
    icon: <GiKnifeFork className="w-6 h-6 text-white" />,
  },
];

export default function About() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden bg-[#C5A265] dark:bg-black"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white dark:text-[#C5A265]">
            About Us
          </h2>
          <p className="text-lg text-white/90 dark:text-gray-300 max-w-3xl mx-auto">
            We deliver exceptional food, service, and ambiance for an unforgettable dining experience.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              {/* Image */}
              <div className="w-full h-[280px] rounded-2xl overflow-hidden">
                <img src={item.img} loading="lazy" className="w-full h-full object-cover" />
              </div>

              {/* Overlay Card */}
              <div className=" -mt-10 w-[90%] rounded-2xl shadow-md p-6 relative h-[200px] flex flex-col justify-between dark:bg-[#C5A265] text-white bg-black dark:text-white">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center dark:bg-black/20">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed line-clamp-3">{item.short}</p>
                  </div>
                </div>

                {/* Arrow button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelected(item)}
                    className="w-10 h-10 rounded-full bg-white text-[#C5A265] flex items-center justify-center shadow-md hover:scale-110 transition dark:bg-black dark:text-[#C5A265]"
                  >
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            onClick={() => setSelected(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
          ></div>

          {/* Modal */}
          <div className="relative rounded-2xl max-w-2xl w-full p-8 shadow-2xl bg-white text-black dark:bg-[#1A1A1A] dark:text-white transform transition-all animate-slideUp">
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#C5A265] flex items-center justify-center text-white">
                {selected.icon}
              </div>
              <h3 className="text-2xl font-bold">{selected.title}</h3>
            </div>

            <p className="whitespace-pre-line leading-relaxed text-black dark:text-gray-300">
              {selected.full || "Delightful dining experience awaits!"}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
