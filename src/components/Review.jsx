"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      text: "Marvellous food and service. Could not recommend enough. Both the lamb and chicken were on point. The dhaal too. Starters hit the spot and the mains filled the stomachs to content. Excellent variety with no drop in quality between the dishes. As a Bengali myself, I appreciate how Authentic and well cooked these dishes were, not many chefs can produce such food and give you that 'home' comfort feeling.",
      name: "Hussain Gani",
      initials: "H",
      bg: "#BCFFBB",
    },
    {
      text: "We live in the village and our friends and ourselves frequently eat at Harrisons Spice, either in the restaurant or takeaway. The team are super friendly and helpful and the food is always absolutely excellent. We are foodies and it still surprises us how good it is, time after time. It is our go to place for big parties, special occasions, date night and family meals. Being a bring your own makes it even better! We are very lucky to have this gem of a restaurant in our village. Thanks to Tulle and the team.",
      name: "Paul Hope",
      initials: "PH",
      bg: "#BBD2FF",
    },
    {
      text: "Fantastic all round experience. Booked last minute and with a bit of juggling of our time they squeezed us in. Greeted warmly and friendly. Had one with peanut allergy and was told confidently no peanuts on site. Poppadoms and pickle tray to start lime pickle was amazing. We ordered 6 different curries so we could all try each otheral and they were all wonderful, succulent chicken, tender lamb, huge king prawns and omg the paneer was amazing.",
      name: "Pamela Tilley",
      initials: "PT",
      bg: "#F5FFBB",
    },
    {
      text: "Really good food. Myself and my friends walked in. Service was friendly and fast. Good value and the atmosphere was great . Will See you again soon.",
      name: "Dan Brookes",
      initials: "DB",
      bg: "#FFBBF0",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  return (
    <section className="relative bg-black text-white overflow-hidden" id="review">
      
      {/* Heading with Logo */}
      <div className="relative z-10 text-center pt-16 pb-12 flex flex-col items-center">
        <img
          src="logo.png"
          alt="Harrisons Spice Logo"
          className="w-32 md:w-40 mb-6 object-contain"
        />
        <h2 className="text-4xl md:text-5xl font-semibold text-[#C5A265]">
          Hear it from our clients
        </h2>
      </div>

      {/* Carousel Container */}
      <div
        className="relative z-10 max-w-3xl mx-auto px-4 pb-20"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Carousel */}
        <div className="relative">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 
            bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 md:p-3 
            transition-all duration-300 border border-white/20"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 
            bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-2 md:p-3 
            transition-all duration-300 border border-white/20"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Review Cards */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((item, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 
                  shadow-[0_0_20px_rgba(0,0,0,0.3)] p-6 md:p-8">
                    <p className="text-sm md:text-base opacity-80 mb-6 leading-relaxed">
                      {item.text}
                    </p>
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm"
                        style={{ backgroundColor: item.bg, color: "#360802" }}
                      >
                        {item.initials}
                      </span>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-[#C5A265] w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA BUTTON TO GOOGLE REVIEWS */}
      <div className="relative z-10 pb-28 text-center">
        <a
          href="https://www.google.com/search?sca_esv=cb427c73f925e7d3&rlz=1C5CHFA_enCA1132CA1132&sxsrf=AE3TifNP1hfnOUI-vDbstuSqJ_1SgFsKWA:1764250864617&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5UMQSIpzR6CcUH4NJtD0qduShT0hwUWz22zNi5zwvrrL9rGE4VMMjyk4LFbaG_SBI1HGyIDoRbuBHyHKOQzEwxE9Png&q=Harrisons+Spice+Reviews&sa=X&ved=2ahUKEwja7dHQupKRAxUdQPUHHWCMAC8Q0bkNegQIIRAE&biw=1366&bih=633&dpr=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-3 text-lg font-semibold rounded-full 
          bg-[#C5A265] hover:bg-white text-black transition-all duration-300 shadow-lg"
        >
          Google Review
        </a>
      </div>
    </section>
  );
}
