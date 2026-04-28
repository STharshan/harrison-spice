/**
 * @param {{ mobile: boolean; title: string; description: string }} props
 */
export function BookingFlowHero({ mobile, title, description }) {
  return (
    <section
      className={`relative bg-black text-center text-white dark:bg-zinc-950 ${mobile ? "px-5 py-9" : "px-6 py-14 md:py-20"}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A265]">Reservations</p>
      <h1 className={`mt-3 font-serif font-normal text-white ${mobile ? "text-3xl" : "text-5xl md:text-6xl"}`}>{title}</h1>
      <div className="mx-auto mt-4 flex max-w-[240px] items-center justify-center gap-2">
        <span className="h-px flex-1 bg-white/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[#C5A265]" aria-hidden />
        <span className="h-px flex-1 bg-white/30" />
      </div>
      <p
        className={`mx-auto mt-4 max-w-lg text-white/80 ${mobile ? "text-[15px] leading-relaxed" : "text-lg"}`}
      >
        {description}
      </p>
    </section>
  );
}
