"use client";

import React, { useEffect, useState } from "react";

export default function WhatWeOffer() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hovered, setHovered] = useState(false);

    const services = [
        {
            video: "/a1.mp4",
            title: "Premium Quality",
            description:
                "Fresh ingredients and authentic spices sourced directly from the Indian sub-continent.",
        },
        {
            video: "/a2.mp4",
            title: "Expert Chefs",
            description:
                "Our experienced chefs blend traditional techniques with modern culinary innovation.",
        },
        {
            video: "/a3.mp4",
            title: "Warm Hospitality",
            description:
                "Friendly service and a welcoming atmosphere that makes every visit memorable.",
        },
    ];

    useEffect(() => {
        if (!hovered) {
            const timer = setInterval(() => {
                setActiveIndex((p) => (p + 1) % services.length);
            }, 4000);
            return () => clearInterval(timer);
        }
    }, [hovered]);

    const getCardStyle = (index) => {
        const total = services.length;
        const offset = (index - activeIndex + total) % total;

        switch (offset) {
            case 0:
                return "scale-100 opacity-100 z-30";
            case 1:
                return "translate-x-[50%] sm:translate-x-[60%] md:translate-x-[70%] scale-90 sm:scale-95 opacity-50 sm:opacity-70 z-20";
            case total - 1:
                return "translate-x-[-50%] sm:translate-x-[-60%] md:translate-x-[-70%] scale-90 sm:scale-95 opacity-50 sm:opacity-70 z-20";
            default:
                return "opacity-0 scale-90 z-0";
        }
    };

    return (
        <section className="relative py-12 px-4 sm:px-6 md:px-12 overflow-visible bg-white dark:bg-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto text-center font-serif relative z-10">

                {/* CARD SLIDER */}
                <div
                    className="relative flex items-center justify-center h-[450px] sm:h-[480px] md:h-[520px] overflow-visible"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {services.map((s, i) => (
                        <div
                            key={i}
                            className={`absolute top-0 left-0 right-0 mx-auto w-[85%] xs:w-[80%] sm:w-[70%] md:w-[60%] lg:w-[420px] 
                            transition-all duration-[800ms] ease-[cubic-bezier(0.77,0,0.175,1)] transform ${getCardStyle(i)}`}
                        >
                            <div className="rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 h-[380px] sm:h-[400px] md:h-[420px] flex flex-col 
                                border border-[#E8D9A8]/70 bg-white dark:bg-zinc-900 shadow-[0_8px_24px_rgba(0,0,0,0.1)] 
                                dark:shadow-[0_12px_40px_rgba(255,215,0,0.1)] dark:border-[#C5A265]"
                            >
                                {/* VIDEO */}
                                <div className="relative h-[200px] sm:h-[220px] md:h-[240px] overflow-hidden">
                                    <video
                                        src={s.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-90 dark:opacity-80"
                                    />
                                </div>

                                {/* CARD CONTENT */}
                                <div className="p-4 sm:p-5 md:p-6 text-left flex flex-col justify-between flex-grow font-[Inter]">
                                    <div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-black dark:text-white">
                                            {s.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm leading-relaxed text-[#333] dark:text-gray-300">
                                            {s.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* LEFT BUTTON */}
                    <button
                        onClick={() =>
                            setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
                        }
                        aria-label="Previous slide"
                        className="absolute left-2 sm:left-4 md:left-6 mt-100 w-8 h-8 sm:w-10 sm:h-10 
                        rounded-full shadow-md text-base sm:text-lg font-bold transition-all duration-300 
                        hover:scale-110 active:scale-95 
                        bg-white text-black dark:bg-zinc-800 dark:text-white bg-opacity-80 hover:bg-opacity-100"
                    >
                        ‹
                    </button>

                    {/* RIGHT BUTTON */}
                    <button
                        onClick={() => setActiveIndex((prev) => (prev + 1) % services.length)}
                        aria-label="Next slide"
                        className="absolute right-2 sm:right-4 md:right-6 mt-100 w-8 h-8 sm:w-10 sm:h-10 
                        rounded-full shadow-md text-base sm:text-lg font-bold transition-all duration-300 
                        hover:scale-110 active:scale-95 
                        bg-white text-black dark:bg-zinc-800 dark:text-white bg-opacity-80 hover:bg-opacity-100"
                    >
                        ›
                    </button>
                </div>

                {/* DOT INDICATORS */}
                <div className="flex justify-center gap-2 mt-4">
                    {services.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 
                            ${
                                i === activeIndex
                                    ? "bg-[#C5A265] dark:bg-[#C5A265] w-6 sm:w-8"
                                    : "bg-[#C5A265] dark:bg-[#C5A265]"
                            }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
}
