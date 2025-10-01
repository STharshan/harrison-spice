import React, { useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MyStorySection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="relative w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10 px-6">
        {/* Left Images */}
        <div
          className="relative flex justify-center items-center"
          data-aos="fade-right"
        >
          <div className="space-y-4 relative z-10">
            <img
              src="/story.jpg"
              alt="Chef cooking"
              className="rounded-lg w-100 h-100"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="text-center md:text-left" data-aos="fade-left">
          <h2 className="text-3xl font-bold mb-4">My Story</h2>
          <p className="text-gray-600 mb-6 text-lg">
            My passion for food has brought many new, fun and delicious dishes
            to the table.
          </p>
          <p className="text-gray-600 text-lg mb-6">
            For me, it’s not just my work. It’s what I love to do. As a chef
            there is nothing better than showing your love for others through
            your food. I never want to settle for what I know. I want to create
            new culinary experiences for myself and those who enjoy my dishes.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 justify-center md:justify-start mb-6" data-aos="fade-up">
            <a href="#" className="text-gray-600 hover:text-black">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="text-gray-600 hover:text-black">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
