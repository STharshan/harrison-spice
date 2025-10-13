'use client'

import React, { forwardRef, useMemo, useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import sectionsSeed from "./Menu.json";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { LuChefHat } from "react-icons/lu";
import { FiMapPin, FiPhone } from "react-icons/fi";

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
      "relative h-full w-full overflow-hidden " + (className || "")
    }
    style={{
      backgroundImage: 'url("/back.jpg")', // local public folder image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Semi-transparent overlay for text readability */}
    <div className="absolute inset-0 bg-white/30 dark:bg-black/30 pointer-events-none" />

    {/* Content */}
    <div className="relative h-full w-full p-4 sm:p-8">
      {children}
    </div>
  </div>
));
Page.displayName = "Page";


// ---------- Specific Pages ----------
const CoverPage = forwardRef(({ restaurant, tagline }, ref) => (
  <Page ref={ref}>
    <div className="flex h-full flex-col items-center justify-center text-center relative">
      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#981921]/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#981921]/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#981921]/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#981921]/30" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <img
          src="logo.png"
          alt="Harrison Spice Logo"
          className="w-56 h-auto sm:w-72 mx-auto drop-shadow-2xl"
        />
      </motion.div>

      {/* Restaurant Name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#981921] mb-4"
        style={{ fontFamily: 'serif' }}
      >
        {restaurant}
      </motion.h1>

      {/* Decorative divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#981921] to-transparent mb-4"
      />

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="text-base sm:text-xl text-neutral-700 font-medium max-w-md px-4"
      >
        {tagline}
      </motion.p>

      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        className="mt-6 text-sm text-neutral-600 italic"
      >
        Experience Authentic Indian Cuisine
      </motion.div>
    </div>

    <div className="absolute bottom-6 right-6 text-xs text-[#981921] font-semibold bg-white/70 px-3 py-2 rounded-full backdrop-blur-sm">
      Swipe to explore →
    </div>
  </Page>
));
CoverPage.displayName = "CoverPage";


const SectionPage = forwardRef(({ title, subtitle, items }, ref) => (
  <Page ref={ref}>
    <div className="flex h-full flex-col">
      <div className="mb-3">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#981921] backdrop-blur">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-black backdrop-blur">{subtitle}</p>
        )}
      </div>
      <div className="grid grid-cols-1 gap-3 pb-5">
        {items.map((item) => (
          <div
            key={item.name}
            className="
              flex gap-3 rounded-2xl bg-white/60 p-3 sm:p-4 shadow-lg backdrop-blur
              transition-all duration-300 transform
              hover:scale-[1.02] hover:shadow-md hover:bg-white/80 hover:shadow-[#B8985B]
              active:scale-[0.98] active:shadow-sm
              cursor-pointer
            "
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              />
            )}
            <div className="flex-1">
              <p className="text-base font-semibold text-[#981921] group-hover:text-[#d6121f] transition-colors duration-300">
                {item.name}
              </p>
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
    <div className="flex h-full flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#981921] mb-4" style={{ fontFamily: 'serif' }}>
          About Us
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-[#981921] to-orange-500 mb-4" />
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          Welcome to <span className="font-bold text-[#981921]">Harrison Spice</span>, where authentic Indian flavors meet contemporary dining excellence. Our kitchen crafts traditional recipes with premium ingredients, bringing you an unforgettable culinary journey.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border border-[#981921]/20 bg-white/80 p-5 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#981921] to-orange-500 flex items-center justify-center text-white text-lg">
              <FiMapPin size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#981921] mb-1">Location</p>
              <p className="text-xs sm:text-sm text-neutral-600">
                23-27 Station Street, Ratby<br />
                Leicestershire, LE6 0JQ
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#981921]/20 bg-white/80 p-5 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#981921] to-orange-500 flex items-center justify-center text-white text-lg">
              <FiPhone size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-[#981921] mb-1">Contact</p>
              <p className="text-xs sm:text-sm text-neutral-600">0116 2395 644</p>
              <p className="text-xs  text-neutral-600">reservations@harrisonsspice.co.uk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center my-6">
        <img
          src="/logo.png"
          alt="Harrison Spice Logo"
          className="w-32 h-auto opacity-90"
        />
      </div>

      {/* Footer */}
      <div className="text-center text-[11px] text-neutral-500 border-t border-[#981921]/10 pt-4">
        © {new Date().getFullYear()} Harrison Spice. All rights reserved.
      </div>
    </div>
  </Page>
));
InfoPage.displayName = "InfoPage";


const BackCoverPage = forwardRef((_, ref) => (
  <Page ref={ref}>
    <div className="flex h-full flex-col items-center justify-center text-center relative">
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#981921]/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#981921]/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#981921]/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#981921]/30" />

      {/* Logo Icon */}
      <div className="flex items-center justify-center mb-8">
        <img
          src="/logo.png" // replace with your company logo path
          alt="Harrison Spice Logo"
          className="w-40 h-auto sm:w-48 drop-shadow-2xl"
        />
      </div>
      <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#981921] to-transparent mb-4" />

      <h3 className="text-2xl sm:text-3xl font-bold text-[#981921] mb-3" style={{ fontFamily: 'serif' }}>
        Thank You
      </h3>
      <p className="text-neutral-700 text-sm sm:text-base mb-2">for dining with us</p>

      {/* React Icon instead of 🙏 */}
      <div className="text-neutral-600 text-2xl sm:text-3xl mb-4">
        <LuChefHat className="inline-block" />
      </div>

      <p className="text-neutral-600 text-lg">See you again soon!</p>

      <div className="mt-8 text-xs text-neutral-500">
        Follow us for special offers & updates
      </div>
    </div>
  </Page>
));
BackCoverPage.displayName = "BackCoverPage";


// ---------- Main Component ----------
export default function MenuFlipbook() {
  const flipRef = useRef(null);
  const [page, setPage] = useState(0);
  const [bookSize, setBookSize] = useState({ width: 700, height: 900 });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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
      const chunks = paginateByHeight(section.items, 600);
      chunks.forEach((chunk, idx) => {
        arr.push(
          <SectionPage
            key={`${section.id}-${idx}`}
            title={section.title + (chunks.length > 1 ? ` (${idx + 1})` : "")}
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
      className="mx-auto max-w-7xl px-3 py-8 sm:py-12 scroll-m-14 bg-gradient-to-b from-amber-50/30 to-white"
      id="menu"
    >
      {/* Header */}
      <div
        className="mb-6 flex flex-col items-center justify-between gap-4 sm:mb-8 sm:flex-row"
        data-aos="fade-down"
      >
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#981921]" style={{ fontFamily: 'serif' }}>
            Our Menu
          </h1>
          <p className="text-sm text-neutral-600 mt-1">Discover our culinary delights</p>
        </div>

        <div className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2">
          <button
            onClick={goPrev}
            className="rounded-full bg-gradient-to-r from-[#981921] to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1"
          >
            <FiChevronLeft className="w-4 h-4" />
            Prev
          </button>

          <span className="text-sm font-bold tabular-nums text-[#981921] min-w-[60px] text-center">
            {String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
          </span>

          <button
            onClick={goNext}
            className="rounded-full bg-gradient-to-r from-[#981921] to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-1"
          >
            Next
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Flipbook */}
      <div className="mx-auto flex w-full justify-center mb-8" data-aos="fade-up" data-aos-delay="100">
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
        className="mx-auto max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {sectionsSeed.map((s) => {
          const target = sectionPageMap[s.id];
          const isActive = page === target || page === target - 1 || page === target + 1;

          return (
            <button
              key={s.id}
              onClick={() => goTo(target)}
              className={`
                rounded-xl px-4 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105
                ${isActive
                  ? "bg-gradient-to-r from-[#981921] to-orange-500 text-white ring-4 ring-[#981921]/20"
                  : "bg-white text-[#981921] border border-[#981921]/20 hover:border-[#981921]/40"
                }
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