import { ChevronRight } from "lucide-react";
import { formatPenceAsPoundsLabel } from "../../../constants/bookingHelpers.js";
import { useReservationPublicConfig } from "../../../contexts/ReservationPublicConfigContext.jsx";

export function ScreenLanding({ dispatch, mobile }) {
  const pub = useReservationPublicConfig();
  const guestLabel =
    typeof pub?.bookingFeePerPersonPence === "number"
      ? formatPenceAsPoundsLabel(pub.bookingFeePerPersonPence)
      : "£10";

  const steps = [
    { n: "01", t: "Pick a date", s: "Choose your date, party and seating time." },
    { n: "02", t: "Confirm details", s: "Tell us who you are and any allergies." },
    {
      n: "03",
      t: "Non-refundable booking fee",
      s: `${guestLabel} per guest, charged when you reserve.`,
    },
  ];

  return (
    <>
      <section className={`bg-neutral-100 dark:bg-black ${mobile ? "px-4 py-7" : "px-6 py-12 md:px-14 md:py-14"}`}>
        <div className="mx-auto max-w-5xl">
          <div className={`grid gap-4 ${mobile ? "grid-cols-1" : "md:grid-cols-3"}`}>
            {steps.map((item) => (
              <div
                key={item.n}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="font-serif text-2xl font-semibold text-[#C5A265]">{item.n}</div>
                <div className="mt-1 font-serif text-lg text-black dark:text-white">{item.t}</div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{item.s}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => dispatch({ type: "BEGIN" })}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#C5A265] px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A265] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
            >
              Begin reservation
              <ChevronRight size={14} aria-hidden strokeWidth={2} className="text-white group-hover:text-black" />
            </button>
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
              Parties of 11 or more · please call{" "}
              <a href="tel:+441162395644" className="font-semibold text-black underline dark:text-white">
                0116 2395 644
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
