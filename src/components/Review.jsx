"use client";
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Review() {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current;

      gsap.set(cards, { yPercent: 30, opacity: 0 });
      gsap.set(cards[0], { yPercent: 0, opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainerRef.current,
          start: "top 80%",
          end: "+=" + cards.length * 400,
          scrub: 1.5,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        tl.to(cards[i], { opacity: 1, yPercent: 0, duration: 1 }, i * 0.5);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
      id="testimonials"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="side.png"
          alt="Hear it from our clients"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Heading */}
      <div className="relative z-10 text-center pt-32 pb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-white">
          Hear it from our clients
        </h2>
      </div>

      {/* Testimonials */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-8 pb-20"
      >
        {testimonials.map((item, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="w-full bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 
            shadow-[0_0_20px_rgba(0,0,0,0.3)] p-6 md:p-8 opacity-0 transform translate-y-8"
          >
            <p className="text-lg md:text-xl font-semibold mb-3">{item.title}</p>
            <p className="text-sm md:text-base opacity-80 mb-4">{item.text}</p>
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold"
                style={{ backgroundColor: item.bg, color: "#360802" }}
              >
                {item.initials}
              </span>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* === CTA BUTTON TO GOOGLE REVIEWS === */}
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
