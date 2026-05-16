import React, { forwardRef, useMemo, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import sectionsSeed from "./Menu.json";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { LuChefHat } from "react-icons/lu";

// ---------- Utility: Page Splitter ----------
const paginateByItemCount = (items, itemsPerPage) => {
  const pages = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }
  return pages;
};

// ---------- Shared Page ----------
const Page = forwardRef(({ children, className }, ref) => (
  <div
    ref={ref}
    className={`relative h-full w-full overflow-hidden rounded-[28px] border border-white/20 shadow-[0_24px_70px_rgba(15,23,42,0.45)] ${className || ""}`}
    style={{
      backgroundImage: 'url("/back.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0 " />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.35),_transparent_48%)]" />
    <div className="relative h-full w-full overflow-y-auto p-4 text-[#2a2117] lg:p-6">
      {children}
    </div>
  </div>
));
Page.displayName = "Page";

// ---------- Cover Page ----------
const CoverPage = forwardRef(({ restaurant, tagline }, ref) => (
  <Page ref={ref}>
    <div className="flex flex-col h-full justify-center items-center text-center relative ">
      <div className="absolute top-4 left-4 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-l-2 border-[#C5A265]/40" />
      <div className="absolute top-4 right-4 w-12 sm:w-16 h-12 sm:h-16 border-t-2 border-r-2 border-[#C5A265]/40" />
      <div className="absolute bottom-4 left-4 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-l-2 border-[#C5A265]/40" />
      <div className="absolute bottom-4 right-4 w-12 sm:w-16 h-12 sm:h-16 border-b-2 border-r-2 border-[#C5A265]/40" />

      <motion.img
        src="/logo.png"
        alt="Harrison Spice Logo"
        loading="lazy"
        className="w-40 sm:w-56 mb-5 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <motion.h1
        className="text-3xl sm:text-5xl font-bold text-[#C5A265]"
        style={{ fontFamily: "serif" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {restaurant}
      </motion.h1>

      <motion.p
        className="mt-3 max-w-md px-3 text-sm text-[#36291c] sm:text-lg"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {tagline}
      </motion.p>

      <p className="mt-4 text-xs italic text-[#4b3827] sm:text-sm">
        Experience Authentic Indian Cuisine
      </p>
    </div>
    <div className="absolute bottom-5 right-5 rounded-full border border-[#C5A265]/35 bg-white/80 px-3 py-1 text-xs font-medium text-[#8f6b2e] shadow-lg backdrop-blur-sm">
      Swipe to explore →
    </div>
  </Page>
));
CoverPage.displayName = "CoverPage";

// ---------- Section Page ----------
const SectionPage = forwardRef(({ title, subtitle, items }, ref) => (
  <Page ref={ref}>
    <div className="flex flex-col h-full">
      <div className="mb-3">
        <h2
          className="text-xl lg:text-2xl font-bold text-[#C5A265]"
          style={{ fontFamily: "serif" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-white">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="group flex gap-2.5 rounded-2xl border border-white/60 bg-white/78 p-3 shadow-[0_12px_30px_rgba(68,43,16,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(68,43,16,0.22)]"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-semibold text-[#8c6724] lg:text-base">
                  {item.name}
                </p>
                <span className="shrink-0 rounded-full bg-[#f4e1b5] px-2.5 py-1 text-sm font-bold text-[#51360f] shadow-sm">
                  {item.price}
                </span>
              </div>
              {item.description && (
                <p className="mt-1 text-xs leading-relaxed text-[#4e3d2d] lg:text-sm line-clamp-2">
                  {item.description}
                </p>
              )}
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#9d7f49]">
                  Signature Flavor
                </span>
                {item.badge && (
                  <span className="rounded-full border border-amber-300/80 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
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
          className="text-xl sm:text-3xl font-bold text-[#C5A265] mb-3"
          style={{ fontFamily: "serif" }}
        >
          About Us
        </h2>
        <div className="w-16 h-0.5 bg-linear-to-r from-[#C5A265] to-orange-500 mb-4" />
        <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
          Welcome to{" "}
          <span className="font-bold text-[#C5A265]">Harrison Spice</span>,
          where authentic Indian flavors meet modern dining excellence. Every
          dish is crafted using the finest ingredients and time-honored recipes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        <div className="flex items-start gap-3 rounded-xl border border-white/60 bg-white/80 p-4 shadow">
          <div className="bg-linear-to-br from-[#C5A265] to-orange-500 w-10 h-10 flex items-center justify-center rounded-full text-white">
            <FiMapPin size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#C5A265]">Location</p>
            <p className="text-xs leading-snug text-neutral-600">
              23-27 Station Street, Ratby<br />Leicestershire, LE6 0JQ
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-white/60 bg-white/80 p-4 shadow">
          <div className="bg-linear-to-br from-[#C5A265] to-orange-500 w-10 h-10 flex items-center justify-center rounded-full text-white">
            <FiPhone size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-[#C5A265]">Contact</p>
            <p className="text-xs text-neutral-600">
              0116 2395 644
            </p>
            <p className="text-xs text-neutral-600">
              reservations@harrisonsspice.co.uk
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <img src="/logo.png" alt="Logo" loading="lazy" className="w-24 sm:w-32 opacity-90" />
      </div>

      <p className="mt-4 border-t border-[#C5A265]/10 pt-3 text-center text-[10px] text-neutral-500 sm:text-xs">
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
      <img src="/logo.png" alt="Logo" loading="lazy" className="w-36 sm:w-48 mb-6" />
      <h3
        className="text-2xl sm:text-3xl font-bold text-[#C5A265]"
        style={{ fontFamily: "serif" }}
      >
        Thank You
      </h3>
      <p className="mb-4 text-sm text-neutral-700 sm:text-base">
        for dining with us
      </p>
      <LuChefHat className="mb-4 text-3xl text-neutral-600" />
      <p className="text-sm text-neutral-600 sm:text-lg">
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
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      setIsMobile(mobile);
      
      // Desktop: 6 items, Tablet & Mobile: 4 items
      if (w >= 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(4);
      }
      
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
        tagline="Modern Indian Comfort Food"
      />
    );

    let idx = 1;
    sectionsSeed.forEach((section) => {
      map[section.id] = idx;
      const chunks = paginateByItemCount(section.items, itemsPerPage);
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
  }, [itemsPerPage]);

  const goPrev = () => flipRef.current?.pageFlip()?.flipPrev();
  const goNext = () => flipRef.current?.pageFlip()?.flipNext();
  const goTo = (p) => flipRef.current?.pageFlip()?.flip(p);

  return (
    <div
      className="bg-black px-3 py-8 transition-colors duration-500"
      id="menu"
    >
      {/* Header */}
      <div
        className="flex mx-auto max-w-7xl flex-col sm:flex-row justify-between items-center mb-6"
        data-aos="fade-down"
      >
        <div>
          <h1
            className="text-3xl font-bold text-white drop-shadow-[0_5px_18px_rgba(63,33,4,0.28)] sm:text-4xl"
            style={{ fontFamily: "serif" }}
          >
            Our Menu
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {!isMobile && (
            <div className="flex items-center gap-3 rounded-full border border-white/50 bg-white/90 px-4 py-2 shadow-xl backdrop-blur-sm">
              <button
                onClick={goPrev}
                className="flex items-center gap-1 rounded-full bg-[#C5A265] px-3 py-1.5 text-white transition hover:bg-[#ad872e]"
              >
                <FiChevronLeft /> Prev
              </button>
              <span className="text-sm font-bold text-[#7b5c25]">
                {String(page + 1).padStart(2, "0")} / {pages.length}
              </span>
              <button
                onClick={goNext}
                className="flex items-center gap-1 rounded-full bg-[#C5A265] px-3 py-1.5 text-white transition hover:bg-[#ad872e]"
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
          {pages.map((node) => node)}
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
              className={`rounded-xl px-3 py-2 text-sm font-semibold transition-all
                ${isActive
                  ? "bg-[#2c190d] text-white shadow-[0_14px_28px_rgba(44,25,13,0.28)]"
                  : "border border-white/60 bg-white/88 text-[#3f2b19] shadow-sm backdrop-blur-sm hover:scale-105 hover:bg-white"
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
