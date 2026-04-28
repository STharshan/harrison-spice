import { useMemo } from "react";
import { HashLink } from "react-router-hash-link";
import { Calendar, ChevronRight, Clock, Mail, MapPin, Phone, Users } from "lucide-react";
import {
  bookingWallClockRange,
  buildGoogleCalendarEventUrl,
  fmtDateLong,
  fmtSlot,
} from "../../../constants/bookingHelpers.js";
import { useReservationPublicConfig } from "../../../contexts/ReservationPublicConfigContext.jsx";

export function ScreenSuccess({ state, dispatch, mobile }) {
  const pub = useReservationPublicConfig();
  const ref = state.bookingRef || `HS-${Date.now().toString(36).slice(-6).toUpperCase()}`;
  const feePence = pub?.bookingFeePerPersonPence;
  const perHeadPounds =
    typeof feePence === "number" && !Number.isNaN(feePence) ? feePence / 100 : 10;
  const depositPaid = ((state.partySize || 0) * perHeadPounds).toFixed(2);

  const googleCalendarUrl = useMemo(() => {
    const range = bookingWallClockRange({
      date: state.date,
      slotStart: state.slot,
      slotEnd: state.slotEnd,
      durationMinutes: pub?.bookingDurationMinutes,
    });
    if (!range) return null;
    return buildGoogleCalendarEventUrl({
      title: `Harrison's Spice — Table for ${state.partySize} (${ref})`,
      details: `Booking reference: ${ref}\nGuests: ${state.partySize}`,
      location: "23–27 Station Street, Ratby, Leicestershire LE6 0JQ, UK",
      start: range.start,
      end: range.end,
    });
  }, [state.date, state.slot, state.slotEnd, state.partySize, ref, pub?.bookingDurationMinutes]);

  return (
    <div>
      <section className={`bg-neutral-100 dark:bg-black ${mobile ? "px-4 py-6" : "px-6 py-10 md:px-14"}`}>
        <div className={`mx-auto grid max-w-[1100px] gap-5 md:gap-8 ${mobile ? "grid-cols-1" : "md:grid-cols-[1fr_0.9fr]"}`}>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  Reservation
                </p>
                <h3 className="mt-1 font-serif text-xl text-black dark:text-white md:text-2xl">Table for {state.partySize}</h3>
              </div>
              <div className="rounded-full border border-[#C5A265]/40 bg-[#C5A265]/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-black dark:text-white">
                {ref}
              </div>
            </div>
            <div className="my-5 h-px bg-stone-200 dark:bg-zinc-700" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Calendar size={14} aria-hidden strokeWidth={1.6} /> Date
                </dt>
                <dd className="font-medium text-black dark:text-white">{fmtDateLong(state.date)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Clock size={14} aria-hidden strokeWidth={1.6} /> Time
                </dt>
                <dd className="font-medium text-black dark:text-white">{fmtSlot(state.slot)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Users size={14} aria-hidden strokeWidth={1.6} /> Guests
                </dt>
                <dd className="font-medium text-black dark:text-white">{state.partySize}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Mail size={14} aria-hidden strokeWidth={1.6} /> Email
                </dt>
                <dd className="font-medium text-black dark:text-white">{state.customerEmail}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
                  <Phone size={14} aria-hidden strokeWidth={1.6} /> Phone
                </dt>
                <dd className="font-medium text-black dark:text-white">{state.customerPhone}</dd>
              </div>
            </dl>
            {state.specialRequests ? (
              <>
                <div className="my-4 h-px bg-stone-200 dark:bg-zinc-700" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  Notes for the team
                </p>
                <p className="mt-2 font-serif text-sm text-zinc-800 dark:text-neutral-200">&ldquo;{state.specialRequests}&rdquo;</p>
              </>
            ) : null}
            <div className="my-4 h-px bg-stone-200 dark:bg-zinc-700" />
            <div className="flex justify-between font-serif text-lg text-black dark:text-white">
              <span>Deposit paid</span>
              <span>£{depositPaid}</span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">Refunded against your bill on the night.</p>

            <div className={`mt-6 flex flex-wrap gap-2 ${mobile ? "flex-col" : ""}`}>
              {googleCalendarUrl ? (
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-50 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800"
                >
                  <Calendar size={14} aria-hidden strokeWidth={1.6} /> Add to Google Calendar
                </a>
              ) : (
                <span className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-full border border-stone-200 px-4 py-2.5 text-sm font-medium text-neutral-400 dark:border-zinc-700 dark:text-neutral-500">
                  <Calendar size={14} aria-hidden strokeWidth={1.6} /> Add to Google Calendar
                </span>
              )}
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-2.5 text-sm font-medium text-black hover:bg-neutral-50 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800"
                onClick={() => dispatch({ type: "GOTO", step: "manage" })}
              >
                Manage booking <ChevronRight size={14} aria-hidden strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-stone-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">Visit us</p>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-800 dark:text-neutral-200">
                <div className="flex gap-2">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#C5A265]" aria-hidden strokeWidth={1.6} />
                  <div>
                    23–27 Station Street
                    <br />
                    Ratby, Leicestershire
                    <br />
                    LE6 0JQ
                  </div>
                </div>
                <div className="h-px bg-stone-200 dark:bg-zinc-700" />
                <div className="flex gap-2">
                  <Phone size={14} className="shrink-0 text-[#C5A265]" aria-hidden strokeWidth={1.6} />
                  <a href="tel:+441162395644" className="hover:underline">
                    0116 2395 644
                  </a>
                </div>
                <div className="flex gap-2">
                  <Mail size={14} className="shrink-0 text-[#C5A265]" aria-hidden strokeWidth={1.6} />
                  <a href="mailto:reservations@harrisonsspice.co.uk" className="hover:underline">
                    reservations@harrisonsspice.co.uk
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-xl border-0 bg-black p-5 text-white dark:bg-zinc-950 md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C5A265]">While you wait</p>
              <h3 className="mt-2 font-serif text-xl text-white md:text-2xl">Browse our menu</h3>
              <p className="mt-2 text-sm text-white/75">40 dishes — refined Indian cuisine with a modern twist.</p>
              <HashLink
                to="/#menu"
                smooth
                className="mt-4 inline-flex items-center justify-center rounded-full bg-[#C5A265] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
              >
                View menu
              </HashLink>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-[1100px] text-center">
          <button
            type="button"
            className="text-sm font-medium text-[#C5A265] underline-offset-4 hover:underline"
            onClick={() => dispatch({ type: "RESET" })}
          >
            Make another reservation
          </button>
        </div>
      </section>
    </div>
  );
}
