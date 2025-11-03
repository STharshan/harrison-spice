'use client';

import React, { forwardRef, useMemo, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import sectionsSeed from "./Menu.json";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiPhone,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { LuChefHat } from "react-icons/lu";

// ---------- Utility: Page Splitter ----------
const paginateByHeight = (items, maxHeight = 550) => {
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  items.forEach((item) => {
    const isSmallScreen =
      typeof window !== "undefined" && window.innerWidth < 640;
    const baseHeight = isSmallScreen ? 240 : 130;
    const estimatedHeight =
      baseHeight +
      (item.description ? Math.min(item.description.length / 3, 100) : 0);

    if (currentHeight + estimatedHeight > maxHeight && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [item];
      currentHeight = estimatedHeight;
    } else {
      currentPage.push(item);
      currentHeight += estimatedHeight;
    }
  });

  if (currentPage.length > 0) pages.push(currentPage);
  return pages;
};

// ---------- Shared Page ----------
const Page = forwardRef(({ children, className }, ref) => (
  <div
    ref={ref}
    className={`relative h-full w-full overflow-hidden rounded-2xl ${className || ""}`}
    style={{
      backgroundImage: 'url("/back.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative h-full w-full p-4 sm:p-8 overflow-y-auto text-neutral-800 dark:text-neutral-200">
      {children}
    </div>
  </div>
));
Page.displayName = "Page";

// ---------- Cover Page ----------
const CoverPage = forwardRef(({ restaurant, tagline }, ref) => (
  <Page ref={ref}>
    <div className="flex flex-col h-full justify-center items-center text-center relative ">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-[#981921]/40" />
      <div className="absolute top-4 right-4 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-[#981921]/40" />
      <div className="absolute bottom-4 left-4 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-[#981921]/40" />
      <div className="absolute bottom-4 right-4 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-[#981921]/40" />

      <motion.img
        src="/logo.png"
        alt="Harrison Spice Logo"
        className="w-40 sm:w-56 mb-5 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-3xl sm:text-5xl font-bold text-[#981921]"
        style={{ fontFamily: "serif" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {restaurant}
      </motion.h1>

      <motion.p
        className="text-sm sm:text-lg text-neutral-700 dark:text-neutral-300 mt-3 max-w-md px-3"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {tagline}
      </motion.p>

      <p className="text-xs sm:text-sm text-neutral-600 italic mt-4 dark:text-neutral-400">
        Experience Authentic Indian Cuisine
      </p>
    </div>
    <div className="absolute bottom-5 right-5 text-xs text-[#981921] bg-white/70 dark:bg-black/50 px-3 py-1 rounded-full">
      Swipe to explore →
    </div>
  </Page>
));
CoverPage.displayName = "CoverPage";

// ---------- Section Page ----------
const SectionPage = forwardRef(({ title, subtitle, items }, ref) => (
  <Page ref={ref}>
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2
          className="text-lg sm:text-2xl font-bold text-[#981921]"
          style={{ fontFamily: "serif" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex gap-3 bg-white/70 dark:bg-neutral-800/70 rounded-xl p-3 shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-14 w-14 sm:h-20 sm:w-20 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <p className="text-[#981921] font-semibold text-sm sm:text-base">
                {item.name}
              </p>
              {item.description && (
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-snug">
                  {item.description}
                </p>
              )}
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-bold text-neutral-800 dark:text-white">
                  {item.price}
                </span>
                {item.badge && (
                  <span className="bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-[10px] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Page>
));
SectionPage.displayName = "SectionPage";

// ---------- Info Page ----------
const InfoPage = forwardRef((_, ref) => (
  <Page ref={ref}>
    <div className="flex flex-col justify-between h-full">
      <div>
        <h2
          className="text-xl sm:text-3xl font-bold text-[#981921] mb-3"
          style={{ fontFamily: "serif" }}
        >
          About Us
        </h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-[#981921] to-orange-500 mb-4" />
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Welcome to{" "}
          <span className="font-bold text-[#981921]">Harrison Spice</span>,
          where authentic Indian flavors meet modern dining excellence. Every
          dish is crafted using the finest ingredients and time-honored recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {/* Location */}
        <div className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/70 p-4 rounded-xl shadow">
          <div className="bg-gradient-to-br from-[#981921] to-orange-500 w-10 h-10 flex items-center justify-center rounded-full text-white">
            <FiMapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#981921]">Location</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
              23-27 Station Street, Ratby<br />Leicestershire, LE6 0JQ
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-start gap-3 bg-white/80 dark:bg-neutral-800/70 p-4 rounded-xl shadow">
          <div className="bg-gradient-to-br from-[#981921] to-orange-500 w-10 h-10 flex items-center justify-center rounded-full text-white">
            <FiPhone size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#981921]">Contact</p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              0116 2395 644
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              reservations@harrisonsspice.co.uk
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <img src="/logo.png" alt="Logo" className="w-24 sm:w-32 opacity-90" />
      </div>

      <p className="text-center text-[10px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-4 border-t border-[#981921]/10 pt-3">
        © {new Date().getFullYear()} Harrison Spice. All rights reserved.
      </p>
    </div>
  </Page>
));
InfoPage.displayName = "InfoPage";

// ---------- Back Cover ----------
const BackCoverPage = forwardRef((_, ref) => (
  <Page ref={ref}>
    <div className="flex flex-col h-full items-center justify-center text-center">
      <img src="/logo.png" alt="Logo" className="w-36 sm:w-48 mb-6" />
      <h3
        className="text-2xl sm:text-3xl font-bold text-[#981921]"
        style={{ fontFamily: "serif" }}
      >
        Thank You
      </h3>
      <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base mb-4">
        for dining with us
      </p>
      <LuChefHat className="text-3xl text-neutral-600 dark:text-neutral-400 mb-4" />
      <p className="text-neutral-600 dark:text-neutral-300 text-sm sm:text-lg">
        See you again soon!
      </p>
    </div>
  </Page>
));
BackCoverPage.displayName = "BackCoverPage";

// ---------- Main Component ----------
export default function MenuFlipbook() {
  const flipRef = useRef(null);
  const [page, setPage] = useState(0);
  const [bookSize, setBookSize] = useState({ width: 700, height: 900 });
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // System preference
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setIsMobile(mobile);
      setBookSize({
        width: mobile ? w * 0.9 : Math.min(700, w * 0.8),
        height: mobile ? h * 0.7 : 900,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { pages, sectionPageMap } = useMemo(() => {
    const arr = [];
    const map = {};
    arr.push(
      <CoverPage
        key="cover"
        restaurant="Harrison Spice"
        tagline="Modern Comfort Food & Coastal Cocktails"
      />
    );

    let idx = 1;
    sectionsSeed.forEach((section) => {
      map[section.id] = idx;
      const chunks = paginateByHeight(section.items, 600);
      chunks.forEach((chunk, i) => {
        arr.push(
          <SectionPage
            key={`${section.id}-${i}`}
            title={section.title}
            subtitle={section.subtitle}
            items={chunk}
          />
        );
        idx++;
      });
    });

    arr.push(<InfoPage key="info" />);
    arr.push(<BackCoverPage key="back" />);
    return { pages: arr, sectionPageMap: map };
  }, []);

  const goPrev = () => flipRef.current?.pageFlip()?.flipPrev();
  const goNext = () => flipRef.current?.pageFlip()?.flipNext();
  const goTo = (p) => flipRef.current?.pageFlip()?.flip(p);

  return (
    <div
      className={`px-3 py-8 sm:py-12 dark:bg-black  transition-colors duration-500 ${darkMode ? "bg-neutral-900 text-white" : "bg-neutral-50 text-black"
        }`}
      id="menu"
    >
      {/* Header */}
      <div
        className="flex mx-auto max-w-7xl flex-col sm:flex-row justify-between items-center mb-6"
        data-aos="fade-down"
      >
        <div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#981921]"
            style={{ fontFamily: "serif" }}
          >
            Our Menu
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {!isMobile && (
            <div className="flex items-center gap-3 bg-white dark:bg-neutral-800 rounded-full shadow px-4 py-2">
              <button
                onClick={goPrev}
                className="bg-gradient-to-r from-[#981921] to-orange-500 px-3 py-1.5 text-white rounded-full flex items-center gap-1"
              >
                <FiChevronLeft /> Prev
              </button>
              <span className="text-sm font-bold text-[#981921] dark:text-white">
                {String(page + 1).padStart(2, "0")} / {pages.length}
              </span>
              <button
                onClick={goNext}
                className="bg-gradient-to-r from-[#981921] to-orange-500 px-3 py-1.5 text-white rounded-full flex items-center gap-1"
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Flipbook */}
      <div className="mx-auto flex justify-center mb-8" data-aos="fade-up">
        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          minWidth={320}
          maxWidth={900}
          maxHeight={1200}
          size="stretch"
          flippingTime={900}
          showCover={true}
          drawShadow={true}
          onFlip={(e) => setPage(e.data)}
          ref={flipRef}
        >
          {pages.map((node, idx) => (
            <div key={idx}>{node}</div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigator Buttons */}
      <div
        className="mx-auto max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {sectionsSeed.map((s) => {
          const target = sectionPageMap[s.id];
          const isActive = page === target;
          return (
            <button
              key={s.id}
              onClick={() => goTo(target)}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all
                ${isActive
                  ? "bg-gradient-to-r from-[#981921] to-orange-500 text-black dark:text-white shadow-lg"
                  : "bg-white dark:bg-neutral-800 text-black dark:text-white border border-[#981921] hover:scale-105 shadow-sm"
                }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
