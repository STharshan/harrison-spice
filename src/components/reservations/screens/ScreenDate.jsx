import { useEffect, useState } from "react";
import {
  monthNames,
  dayNamesShort,
  fmtIso,
  fmtDateLong,
  fmtSlot,
  formatOpeningLineForDay,
} from "../../../constants/bookingHelpers.js";
import { getAvailability, getBookingApiBase } from "../../../services/bookingApi.js";
import { useReservationPublicConfig } from "../../../contexts/ReservationPublicConfigContext.jsx";
import { Calendar, ChevronLeft, ChevronRight, Clock, Info } from "lucide-react";
import { Stepper, StepperMobile } from "../Stepper.jsx";

export function ScreenDate({ state, dispatch, mobile }) {
  const cfg = useReservationPublicConfig();
  const MAX_PARTY_SIZE = 99;
  const [partySize, setPartySize] = useState(state.partySize || 2);
  const [viewMonth, setViewMonth] = useState(() => {
    const d = state.date ? new Date(state.date) : new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [date, setDate] = useState(state.date || null);
  const [slotStart, setSlotStart] = useState(state.slot || null);
  const [slotEnd, setSlotEnd] = useState(state.slotEnd || null);

  const [availability, setAvailability] = useState(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [availError, setAvailError] = useState("");

  useEffect(() => {
    if (state.date) setDate(new Date(state.date));
    if (state.slot) setSlotStart(state.slot);
    if (state.slotEnd) setSlotEnd(state.slotEnd);
    if (typeof state.partySize === "number") setPartySize(state.partySize);
  }, [state.date, state.slot, state.slotEnd, state.partySize]);

  useEffect(() => {
    setSlotStart(null);
    setSlotEnd(null);
  }, [date, partySize]);

  const apiBase = getBookingApiBase();

  useEffect(() => {
    if (!date || !apiBase) {
      setAvailability(null);
      setAvailError(apiBase ? "" : "");
      return;
    }
    const dateIso = fmtIso(date);
    let cancelled = false;
    setAvailLoading(true);
    setAvailError("");
    getAvailability(dateIso)
      .then((data) => {
        if (!cancelled) setAvailability(data);
      })
      .catch((e) => {
        if (!cancelled) {
          setAvailability(null);
          setAvailError(e instanceof Error ? e.message : "Could not load availability");
        }
      })
      .finally(() => {
        if (!cancelled) setAvailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [date, partySize, apiBase]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 3);

  const mondayDowForHours = date ? (date.getDay() + 6) % 7 : 0;
  const openingLine =
    date && cfg?.timeSlots?.length
      ? formatOpeningLineForDay(cfg.timeSlots, mondayDowForHours)
      : null;

  const blocked = Boolean(availability?.blocked);
  const availReason = typeof availability?.reason === "string" ? availability.reason.trim() : "";
  const slots = Array.isArray(availability?.slots) ? availability.slots : [];

  const selectedSlot =
    slotStart && slotEnd ? slots.find((s) => s.slotStart === slotStart && s.slotEnd === slotEnd) : null;
  const selectedSlotAvailableSeats =
    selectedSlot && typeof selectedSlot.availableSeats === "number" ? selectedSlot.availableSeats : null;
  const maxPartySizeForCurrentSelection =
    typeof selectedSlotAvailableSeats === "number" ? Math.max(1, selectedSlotAvailableSeats) : MAX_PARTY_SIZE;

  const firstDow = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  useEffect(() => {
    if (!slotStart || !slotEnd) return;
    if (typeof selectedSlotAvailableSeats !== "number") return;
    if (selectedSlotAvailableSeats <= 0) {
      setSlotStart(null);
      setSlotEnd(null);
      setPartySize(1);
      return;
    }
    setPartySize((p) => Math.min(Math.max(1, p), selectedSlotAvailableSeats));
  }, [slotStart, slotEnd, selectedSlotAvailableSeats]);

  const canContinue = Boolean(date && slotStart && slotEnd && partySize >= 1 && !blocked && !availLoading);

  const holdM = cfg?.holdDurationMinutes ?? 10;
  const tableM = cfg?.bookingDurationMinutes ?? null;
  const tableNote =
    typeof tableM === "number" && tableM > 0
      ? `Tables are reserved for about ${tableM} minutes.`
      : "Tables are reserved for your seating duration.";

  return (
    <div className={mobile ? "px-4 pb-10 pt-5" : "px-6 pb-16 pt-8 md:px-14"}>
      <div className={`mb-6 flex justify-center md:mb-8 ${mobile ? "" : ""}`}>
        {mobile ? <StepperMobile step={0} /> : <Stepper step={0} />}
      </div>

      <div
        className={`mx-auto grid max-w-[1100px] gap-5 md:gap-8 ${mobile ? "grid-cols-1" : "md:grid-cols-[1.1fr_0.9fr]"}`}
      >
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            Step One
          </p>
          <h2 className="mt-1 font-serif text-2xl text-black dark:text-white md:text-3xl">Choose a date</h2>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                How many guests?
              </div>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {slotStart && slotEnd && typeof selectedSlotAvailableSeats === "number"
                  ? `Up to ${selectedSlotAvailableSeats} guests available for this time`
                  : "Choose your party size · subject to availability"}
              </p>
            </div>
            <div className="flex items-center gap-0 rounded-full border border-stone-300 dark:border-zinc-600">
              <button
                type="button"
                className="rounded-l-full px-4 py-2 text-lg font-medium text-black hover:bg-neutral-100 disabled:opacity-40 dark:text-white dark:hover:bg-zinc-800"
                disabled={partySize <= 1}
                aria-label="Decrease party size"
                onClick={() => setPartySize((p) => Math.max(1, p - 1))}
              >
                −
              </button>
              <div className="min-w-[2.5rem] text-center text-lg font-semibold text-black dark:text-white">{partySize}</div>
              <button
                type="button"
                className="rounded-r-full px-4 py-2 text-lg font-medium text-black hover:bg-neutral-100 disabled:opacity-40 dark:text-white dark:hover:bg-zinc-800"
                disabled={partySize >= maxPartySizeForCurrentSelection}
                aria-label="Increase party size"
                onClick={() => setPartySize((p) => Math.min(maxPartySizeForCurrentSelection, p + 1))}
              >
                +
              </button>
            </div>
          </div>

          <div className="my-6 h-px bg-stone-200 dark:bg-zinc-700" />

          <div className="rounded-xl border border-stone-200 dark:border-zinc-700">
            <div className="flex items-center justify-between border-b border-stone-200 px-2 py-3 dark:border-zinc-700">
              <button
                type="button"
                className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 dark:text-neutral-300 dark:hover:bg-zinc-800"
                disabled={viewMonth.getFullYear() === today.getFullYear() && viewMonth.getMonth() === today.getMonth()}
                aria-label="Previous month"
                onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}
              >
                <ChevronLeft size={16} aria-hidden strokeWidth={2} />
              </button>
              <div className="font-serif text-lg text-black dark:text-white">
                {monthNames[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-zinc-800"
                aria-label="Next month"
                onClick={() => setViewMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}
              >
                <ChevronRight size={16} aria-hidden strokeWidth={2} />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 px-2 pb-1 pt-2 text-center text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {dayNamesShort.map((d) => (
                <div key={d}>{mobile ? d[0] : d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 p-2">
              {cells.map((c, i) => {
                if (!c) return <div key={`e-${i}`} />;
                const past = c < today;
                const beyond = c > maxDate;
                const sel = date && fmtIso(c) === fmtIso(date);
                const isToday = fmtIso(c) === fmtIso(today);
                return (
                  <button
                    key={fmtIso(c)}
                    type="button"
                    disabled={past || beyond}
                    onClick={() => setDate(c)}
                    className={`aspect-square rounded-lg text-sm font-medium transition ${
                      sel
                        ? "bg-[#C5A265] text-white"
                        : isToday
                          ? "border border-[#C5A265] text-[#C5A265]"
                          : "text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-zinc-800"
                    } disabled:cursor-not-allowed disabled:opacity-25`}
                  >
                    {c.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Clock size={13} aria-hidden strokeWidth={1.6} />
            {openingLine ?? "Opening hours appear here when booking settings load."}
          </p>
          {!apiBase ? (
            <p className="mt-2 text-xs text-amber-800 dark:text-amber-200">
              Set <code className="rounded bg-neutral-100 px-1 dark:bg-zinc-800">VITE_BOOKING_API_BASE_URL</code> to load
              live availability.
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            Step Two
          </p>
          <h3 className="mt-1 font-serif text-xl text-black dark:text-white md:text-2xl">Choose a time</h3>
          {!date ? (
            <div className="mt-6 rounded-xl border border-dashed border-stone-300 bg-neutral-50 px-6 py-8 text-center dark:border-zinc-600 dark:bg-zinc-800/50">
              <Calendar size={26} className="mx-auto text-[#C5A265]" aria-hidden strokeWidth={1.6} />
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">Select a date to see available seatings</p>
            </div>
          ) : (
            <>
              <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                {fmtDateLong(date)} · party of {partySize}
              </p>
              {availLoading ? (
                <div className="mt-5" aria-busy="true" aria-live="polite">
                  <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-neutral-50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800/50">
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-[#C5A265] dark:border-zinc-600 dark:border-t-[#C5A265]"
                      aria-hidden
                    />
                    <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      Loading available times…
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={`slot-skel-${i}`}
                        className="h-10 min-w-[5.5rem] animate-pulse rounded-lg border border-stone-200 bg-white dark:border-zinc-600 dark:bg-zinc-900"
                        role="presentation"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
              {availError ? (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
                  {availError}
                </p>
              ) : null}
              {blocked ? (
                <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
                  {availReason || "Online bookings are not available for this date."}
                </p>
              ) : null}
              {!blocked && !availLoading && !availError ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {slots.map((s) => {
                    const start = s.slotStart;
                    const end = s.slotEnd;
                    const ok = typeof s.availableSeats === "number" && s.availableSeats >= partySize;
                    const taken = !ok;
                    return (
                      <button
                        key={`${start}-${end}`}
                        type="button"
                        disabled={taken}
                        onClick={() => {
                          setSlotStart(start);
                          setSlotEnd(end);
                        }}
                        className={`min-w-[5.5rem] rounded-lg border px-3 py-2 text-sm font-medium transition ${
                          slotStart === start
                            ? "border-[#C5A265] bg-[#C5A265] text-white"
                            : "border-stone-200 bg-white text-black hover:border-[#C5A265] dark:border-zinc-600 dark:bg-zinc-900 dark:text-white"
                        } disabled:cursor-not-allowed disabled:opacity-40`}
                      >
                        {fmtSlot(start)}
                      </button>
                    );
                  })}
                </div>
              ) : null}
              {!blocked && !availLoading && !availError && slots.length === 0 ? (
                <div className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <p>No seatings are configured for this date.</p>
                  {availReason ? (
                    <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
                      {availReason}
                    </p>
                  ) : null}
                </div>
              ) : null}
              <p className="mt-4 flex gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <Info size={13} className="shrink-0" aria-hidden strokeWidth={1.7} />
                {tableNote} Greyed times do not fit your party size.
              </p>
            </>
          )}

          <button
            type="button"
            disabled={!canContinue}
            onClick={() =>
              dispatch({
                type: "CONFIRM_DATE",
                payload: { date, slot: slotStart, slotEnd, partySize },
              })
            }
            className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#C5A265] py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40 dark:hover:text-black"
          >
            Hold this table
            <ChevronRight size={14} aria-hidden strokeWidth={2} className="text-white group-hover:text-black" />
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
            We&apos;ll hold the seats for {holdM} minutes while you complete booking.
          </p>
        </div>
      </div>
    </div>
  );
}
