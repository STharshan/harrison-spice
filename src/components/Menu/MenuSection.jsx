'use client'

import React, { forwardRef, useMemo, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import sectionsSeed from "./Menu.json";
import AOS from "aos";
import "aos/dist/aos.css";

// ---------- Utility ----------
const paginateByHeight = (items, maxHeight = 550) => {
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  items.forEach((item) => {
    const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;
    const baseHeight = isSmallScreen ? 220 : 120;
    const estimatedHeight =
      baseHeight + (item.description ? Math.min(item.description.length / 4, 100) : 0);

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
    className={
      "relative h-full w-full bg-neutral-50 [box-shadow:0_10px_30px_rgba(0,0,0,0.12)] overflow-hidden " +
      (className || "")
    }
  >
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-transparent to-neutral-200" />
    <div className="h-full w-full p-4 sm:p-8">{children}</div>
  </div>
));
Page.displayName = "Page";

// ---------- Specific Pages ----------
const CoverPage = forwardRef(({ restaurant, tagline }, ref) => (
  <Page ref={ref} className="bg-gradient-to-br from-amber-50 to-orange-100">
    <div className="flex h-full flex-col items-center justify-center text-center">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#68a879]"
      >
        {restaurant}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-3 text-base sm:text-lg text-neutral-600"
      >
        {tagline}
      </motion.p>

    </div>
    <div className="absolute bottom-4 right-4 text-xs text-neutral-500">
      Swipe / drag to flip ➔
    </div>
  </Page>
));
CoverPage.displayName = "CoverPage";

const SectionPage = forwardRef(({ title, subtitle, items }, ref) => (
  <Page ref={ref}>
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#68a879] backdrop-blur">{title}</h2>
        {subtitle && <p className="text-sm text-black backdrop-blur">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 gap-3 pb-5">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex gap-3 rounded-2xl border bg-white/60 p-3 sm:p-4 shadow-sm backdrop-blur"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <p className="text-base font-semibold">{item.name}</p>
              {item.description && (
                <p className="text-sm text-neutral-600">{item.description}</p>
              )}
              <div className="mt-1 flex justify-between items-center">
                <p className="text-sm sm:text-base font-semibold">{item.price}</p>
                {item.badge && (
                  <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
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

const InfoPage = forwardRef((_, ref) => (
  <Page ref={ref}>
    <div className="flex h-full flex-col">
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#68a879]">About Us</h2>
      <p className="mt-2 text-sm text-neutral-700">
        Welcome to <span className="font-semibold">Harrison Spice</span>, where seasonal
        produce meets cozy vibes. Our kitchen crafts familiar classics with a modern twist.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white/60 p-4">
          <p className="text-sm font-semibold">Location</p>
          <p className="text-sm text-neutral-600">
            23-27 Station Street, Ratby Leicestershire, LE6 0JQ
          </p>
        </div>
        <div className="rounded-2xl border bg-white/60 p-4">
          <p className="text-sm font-semibold">Contact</p>
          <p className="text-sm text-neutral-600">0116 2395 644</p>
          <p className="text-sm text-neutral-600">reservations@harrisonsspice.co.uk</p>
        </div>
      </div>

      <div className="mt-auto text-[11px] text-neutral-500">
        © {new Date().getFullYear()} Harrison Spice. All rights reserved.
      </div>
    </div>
  </Page>
));
InfoPage.displayName = "InfoPage";

const BackCoverPage = forwardRef((_, ref) => (
  <Page ref={ref} className="bg-gradient-to-tr from-neutral-100 to-neutral-50">
    <div className="flex h-full items-center justify-center">
      <p className="text-neutral-600">See you again soon 👋</p>
    </div>
  </Page>
));
BackCoverPage.displayName = "BackCoverPage";

// ---------- Main Component ----------
export default function MenuFlipbook() {
  const flipRef = useRef(null);
  const [page, setPage] = useState(0);
  const [bookSize, setBookSize] = useState({ width: 700, height: 900 });

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Responsive width/height
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 640;
      setBookSize({
        width: isMobile ? screenWidth * 0.9 : 700,
        height: isMobile ? window.innerHeight * 0.7 : 900,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

    let currentIndex = 1;
    sectionsSeed.forEach((section) => {
      map[section.id] = currentIndex;
      const chunks = paginateByHeight(section.items, 700);
      chunks.forEach((chunk, idx) => {
        arr.push(
          <SectionPage
            key={`${section.id}-${idx}`}
            title={section.title + (chunks.length > 1 ? ` (Page ${idx + 1})` : "")}
            subtitle={section.subtitle}
            items={chunk}
          />
        );
        currentIndex++;
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
      className="mx-auto max-w-6xl px-3 py-6 sm:py-10 scroll-m-14 bg-white"
      id="menu"
    >
      {/* Header / Controls */}
      <div
        className="mb-4 flex flex-col items-center justify-between gap-3 sm:mb-6 sm:flex-row"
        data-aos="fade-down"
      >
        <h1 className="text-2xl font-bold tracking-tight text-emerald-700">Restaurant Menu</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            className="rounded-2xl border px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
          >
            ◀ Prev
          </button>
          <span className="text-sm tabular-nums select-none">
            {String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
          </span>
          <button
            onClick={goNext}
            className="rounded-2xl border px-3 py-2 text-sm shadow-sm hover:bg-neutral-50"
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Book */}
      <div className="mx-auto flex w-full justify-center" data-aos="fade-up" data-aos-delay="100">
        <HTMLFlipBook
          width={bookSize.width}
          height={bookSize.height}
          minWidth={320}
          maxWidth={900}
          maxHeight={1200}
          size="stretch"
          flippingTime={800}
          usePortrait={true}
          showCover={true}
          drawShadow={true}
          autoSize={true}
          mobileScrollSupport={true}
          onFlip={(e) => setPage(e.data)}
          ref={flipRef}
          className="w-full"
        >
          {pages.map((node, idx) => (
            <div key={idx} className="h-full w-full">
              {node}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Quick Navigator */}
      <div
        className="mx-auto mt-27 grid grid-cols-2 sm:grid-cols-4 gap-2"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {sectionsSeed.map((s) => {
          const target = sectionPageMap[s.id];
          const isActive =
            page === target || page === target - 1 || page === target + 1;

          return (
            <button
              key={s.id}
              onClick={() => goTo(target)}
              className={`
                rounded-2xl border px-3 py-2 text-sm shadow-sm hover:bg-neutral-50 
                ${isActive ? "border-[#981921] ring-2 ring-[#d6121f]" : "border-neutral-300"}
              `}
            >
              {s.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}