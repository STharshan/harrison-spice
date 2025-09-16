import React, { forwardRef, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { motion } from "framer-motion";
import sectionsSeed from "./Menu.json";

// ---------- Utility ----------
const chunkArray = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

const paginateByHeight = (items, maxHeight = 550) => {
  const pages = [];
  let currentPage = [];
  let currentHeight = 0;

  items.forEach((item) => {
    // detect small screen
    const isSmallScreen = window.innerWidth < 640; // Tailwind "sm" breakpoint
    const baseHeight = isSmallScreen ? 200 : 100;

    // Estimate height based on description length
    const estimatedHeight =
      baseHeight +
      (item.description ? Math.min(item.description.length / 4, 100) : 0);

    if (currentHeight + estimatedHeight > maxHeight && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [item];
      currentHeight = estimatedHeight;
    } else {
      currentPage.push(item);
      currentHeight += estimatedHeight;
    }
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

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
    <div className="h-full w-full p-6 sm:p-10">{children}</div>
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
        className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#68a879]"
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 rounded-2xl border bg-white/70 px-4 py-2 text-sm"
      >
        Open today • 17:00 – 23:00
      </motion.div>
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
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-[#68a879]">
          {title}
        </h2>
        {subtitle && <p className="text-sm text-neutral-500">{subtitle}</p>}
      </div>
      <div className="grid grid-cols-1 gap-4 pb-5">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex gap-3 rounded-2xl border bg-white/60 p-4 shadow-sm backdrop-blur"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <p className="text-base font-semibold">{item.name}</p>
              {item.description && (
                <p className="text-sm text-neutral-600">{item.description}</p>
              )}
              <div className="mt-1 flex justify-between items-center">
                <p className="text-base font-semibold">{item.price}</p>
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
      <h2 className="text-2xl font-bold tracking-tight text-[#68a879]">
        About Us
      </h2>
      <p className="mt-2 text-sm text-neutral-700">
        Welcome to{" "}
        <span className="font-semibold">Harrison Spice</span>, where
        seasonal produce meets cozy vibes. Our kitchen crafts familiar classics
        with a modern twist. Thank you for dining with us!
      </p>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white/60 p-4">
          <p className="text-sm font-semibold">Location</p>
          <p className="text-sm text-neutral-600">
            Station Street, Ratby, Leicestershire, LE6 0JQ
          </p>
        </div>
        <div className="rounded-2xl border bg-white/60 p-4">
          <p className="text-sm font-semibold">Contact</p>
          <p className="text-sm text-neutral-600">
            0116 2395 644 • reservations@harrisonsspice.co.uk
          </p>
        </div>
      </div>

      <div className="mt-auto text-[11px] text-neutral-500">
        © {new Date().getFullYear()} Harrison Spice All rights reserved.
      </div>
    </div>
  </Page>
));
InfoPage.displayName = "InfoPage";

const BackCoverPage = forwardRef((_, ref) => (
  <Page ref={ref} className="bg-gradient-to-tr from-neutral-100 to-neutral-50">
    <div className="flex h-full items-center justify-center">
      <p className="text-sm text-neutral-600">See you again soon 👋</p>
    </div>
  </Page>
));
BackCoverPage.displayName = "BackCoverPage";

// ---------- Main Component ----------
export default function MenuFlipbook() {
  const flipRef = useRef(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 3; // max items per page

  const pages = useMemo(() => {
    const arr = [];

    arr.push(
      <CoverPage
        key="cover"
        restaurant="Harrison Spice"
        tagline="Modern comfort food & coastal cocktails"
      />
    );

    sectionsSeed.forEach((section) => {
      const chunks = paginateByHeight(section.items, 500); // tune maxHeight
      chunks.forEach((chunk, idx) => {
        arr.push(
          <SectionPage
            key={`${section.id}-${idx}`}
            title={
              section.title + (chunks.length > 1 ? ` (Page ${idx + 1})` : "")
            }
            subtitle={section.subtitle}
            items={chunk}
          />
        );
      });
    });

    arr.push(<InfoPage key="info" />);
    arr.push(<BackCoverPage key="back" />);
    return arr;
  }, []);

  const total = pages.length;

  const goPrev = () => flipRef.current?.pageFlip()?.flipPrev();
  const goNext = () => flipRef.current?.pageFlip()?.flipNext();
  const goTo = (p) => flipRef.current?.pageFlip()?.flip(p);

  return (
    <div className="mx-auto max-w-6xl px-3 py-6 sm:py-10 scroll-m-15" id="menu">
      {/* Header / Controls */}
      <div className="mb-4 flex flex-col items-center justify-between gap-3 sm:mb-6 sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#68a879]">
            Restaurant Menu
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={goPrev}
            aria-label="Previous page"
            className="rounded-2xl border px-3 py-2 text-sm shadow-sm transition hover:bg-neutral-50 active:scale-[0.98]"
          >
            ◀ Prev
          </button>
          <span className="select-none text-sm tabular-nums">
            {String(page + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
          <button
            onClick={goNext}
            aria-label="Next page"
            className="rounded-2xl border px-3 py-2 text-sm shadow-sm transition hover:bg-neutral-50 active:scale-[0.98]"
          >
            Next ▶
          </button>
        </div>
      </div>

      {/* Book */}
      <div className="mx-auto flex w-full max-w-5xl justify-center">
        <HTMLFlipBook
          width={520}
          height={700}
          minWidth={300}
          maxWidth={650}
          maxHeight={900}
          size="stretch"
          drawShadow={true}
          flippingTime={700}
          usePortrait={true}
          startPage={0}
          autoSize={true}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={(e) => setPage(e.data)}
          ref={flipRef}
          className="[perspective:1800px]"
        >
          {pages.map((node, idx) => (
            <div key={idx} className="h-full w-full">
              {node}
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Quick Navigator */}
      <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-4">
        {sectionsSeed.map((s, i) => {
          const target = i + 1; // first page of section after cover
          const active = page === target;
          return (
            <button
              key={s.id}
              onClick={() => goTo(target)}
              className={
                "rounded-2xl border px-3 py-2 text-sm shadow-sm transition hover:bg-neutral-50 " +
                (active ? "border-amber-400 ring-2 ring-amber-200" : "")
              }
            >
              {s.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}