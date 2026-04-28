import { useMemo, useState } from "react";
import { Check, ChevronLeft, Phone } from "lucide-react";
import { fmtDateLong, fmtIso, fmtSlot } from "../../../constants/bookingHelpers.js";
import { useReservationPublicConfig } from "../../../contexts/ReservationPublicConfigContext.jsx";
import { cancelBooking, getBookingApiBase, lookupBookingsByEmail } from "../../../services/bookingApi.js";

function depositPounds(partySize, feePence) {
  const per =
    typeof feePence === "number" && !Number.isNaN(feePence) ? feePence / 100 : 10;
  return ((partySize || 0) * per).toFixed(2);
}

export function ScreenManage({ state, dispatch, mobile }) {
  const pub = useReservationPublicConfig();
  const feePence = pub?.bookingFeePerPersonPence ?? null;

  const flowBooking = useMemo(() => {
    if (!state.cancellationToken || !state.bookingRef || !state.date || !state.slot) return null;
    return {
      bookingRef: state.bookingRef,
      bookingDate: fmtIso(state.date),
      slotStart: state.slot,
      slotEnd: state.slotEnd || state.slot,
      partySize: state.partySize,
      cancellationToken: state.cancellationToken,
    };
  }, [
    state.cancellationToken,
    state.bookingRef,
    state.date,
    state.slot,
    state.slotEnd,
    state.partySize,
  ]);

  const [dismissFlow, setDismissFlow] = useState(false);
  const [lookupEmail, setLookupEmail] = useState(state.customerEmail || "");
  const [lookupRef, setLookupRef] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupErr, setLookupErr] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState("view");
  const [cancelLoading, setCancelLoading] = useState(false);
  const [cancelErr, setCancelErr] = useState("");

  const booking = selected ?? (flowBooking && !dismissFlow ? flowBooking : null);

  async function runLookup(e) {
    e.preventDefault();
    setLookupErr("");
    setResults([]);
    setSelected(null);
    if (!getBookingApiBase()) {
      setLookupErr("Missing VITE_BOOKING_API_BASE_URL.");
      return;
    }
    setLookupLoading(true);
    try {
      const data = await lookupBookingsByEmail({
        email: lookupEmail.trim(),
        bookingRef: lookupRef.trim() || undefined,
      });
      const list = Array.isArray(data.bookings) ? data.bookings : [];
      setResults(list);
      if (!list.length) setLookupErr("No bookings found for that email.");
      if (list.length === 1 && list[0].cancellationToken) setSelected(list[0]);
    } catch (err) {
      setLookupErr(err instanceof Error ? err.message : "Lookup failed.");
    } finally {
      setLookupLoading(false);
    }
  }

  async function confirmCancel() {
    const token = booking?.cancellationToken;
    if (!token) {
      setCancelErr("Missing cancellation token.");
      return;
    }
    setCancelErr("");
    setCancelLoading(true);
    try {
      await cancelBooking({ cancellationToken: token });
      setStep("cancelled");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not cancel.";
      setCancelErr(msg);
    } finally {
      setCancelLoading(false);
    }
  }

  const ref = booking?.bookingRef || state.bookingRef || "—";
  const party = booking?.partySize ?? state.partySize;
  const deposit = depositPounds(party, feePence);

  const dateForDisplay = booking?.bookingDate
    ? new Date(`${booking.bookingDate}T12:00:00`)
    : state.date;
  const slotForDisplay = booking?.slotStart ?? state.slot;

  if (!booking) {
    return (
      <div className={`min-h-[600px] bg-neutral-100 dark:bg-black ${mobile ? "px-4 py-6" : "px-6 py-10 md:px-14"}`}>
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            className="mb-4 flex items-center gap-1 text-sm font-medium text-[#C5A265] hover:underline"
            onClick={() => {
              if (flowBooking && dismissFlow) {
                setDismissFlow(false);
                setResults([]);
                setLookupErr("");
                dispatch({ type: "GOTO", step: "success" });
                return;
              }
              dispatch({ type: "RESET_HOME" });
            }}
          >
            <ChevronLeft size={14} aria-hidden strokeWidth={2} /> Back
          </button>
          <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-9">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              Find a booking
            </p>
            <h2 className="mt-1 font-serif text-2xl text-black dark:text-white md:text-3xl">Look up by email</h2>
            <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
              Enter the email you used to book. Optionally add your booking reference to narrow the search.
            </p>
            <form className="mt-6 space-y-4" onSubmit={runLookup}>
              <div>
                <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400" htmlFor="hs-lookup-email">
                  Email
                </label>
                <input
                  id="hs-lookup-email"
                  type="email"
                  required
                  value={lookupEmail}
                  onChange={(e) => setLookupEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-black dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400" htmlFor="hs-lookup-ref">
                  Booking reference (optional)
                </label>
                <input
                  id="hs-lookup-ref"
                  type="text"
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2 text-black dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
                  placeholder="e.g. HS-ABC123"
                />
              </div>
              {lookupErr ? (
                <p className="text-sm text-red-600 dark:text-red-400" role="alert">
                  {lookupErr}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={lookupLoading}
                className="w-full rounded-full bg-[#C5A265] py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black disabled:opacity-50"
              >
                {lookupLoading ? "Searching…" : "Find bookings"}
              </button>
            </form>
            {results.length > 0 && !selected ? (
              <ul className="mt-8 space-y-2 border-t border-stone-200 pt-6 dark:border-zinc-700">
                {results.map((row) => (
                  <li key={`${row.bookingRef}-${row.bookingDate}-${row.slotStart}`}>
                    <button
                      type="button"
                      className="flex w-full flex-col rounded-lg border border-stone-200 px-4 py-3 text-left text-sm hover:border-[#C5A265] dark:border-zinc-600 dark:hover:border-[#C5A265]"
                      onClick={() => {
                        setSelected(row);
                        setStep("view");
                      }}
                    >
                      <span className="font-semibold text-black dark:text-white">{row.bookingRef || "Booking"}</span>
                      <span className="text-neutral-600 dark:text-neutral-400">
                        {row.bookingDate} · {fmtSlot(row.slotStart)} · {row.partySize} guests
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-[600px] bg-neutral-100 dark:bg-black ${mobile ? "px-4 py-6" : "px-6 py-10 md:px-14"}`}>
      <div className="mx-auto max-w-2xl">
        <button
          type="button"
          className="mb-4 flex items-center gap-1 text-sm font-medium text-[#C5A265] hover:underline"
          onClick={() => {
            if (selected) {
              setSelected(null);
              setStep("view");
              if (results.length <= 1) setResults([]);
              return;
            }
            dispatch({ type: "GOTO", step: "success" });
          }}
        >
          <ChevronLeft size={14} aria-hidden strokeWidth={2} /> Back to confirmation
        </button>
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-9">
          {step === "view" ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                Manage your booking
              </p>
              <h2 className="mt-1 font-serif text-2xl text-black dark:text-white md:text-3xl">Reservation {ref}</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
                Need to make a change? Online cancellation follows the rules on your confirmation (typically within 24
                hours of booking for a deposit refund).
              </p>
              <div className="my-6 h-px bg-stone-200 dark:bg-zinc-700" />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500 dark:text-neutral-400">Date</dt>
                  <dd className="text-black dark:text-white">{dateForDisplay ? fmtDateLong(dateForDisplay) : "—"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500 dark:text-neutral-400">Time</dt>
                  <dd className="text-black dark:text-white">{slotForDisplay ? fmtSlot(slotForDisplay) : "—"}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500 dark:text-neutral-400">Party</dt>
                  <dd className="text-black dark:text-white">{party} guests</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-neutral-500 dark:text-neutral-400">Deposit</dt>
                  <dd className="text-black dark:text-white">£{deposit}</dd>
                </div>
              </dl>
              {flowBooking && !dismissFlow ? (
                <button
                  type="button"
                  className="mt-6 text-sm font-medium text-[#C5A265] underline-offset-2 hover:underline"
                  onClick={() => {
                    setDismissFlow(true);
                    setSelected(null);
                    setResults([]);
                    setLookupErr("");
                  }}
                >
                  Find a different booking
                </button>
              ) : null}
              <div className="my-6 h-px bg-stone-200 dark:bg-zinc-700" />
              <div className={`flex gap-2.5 ${mobile ? "flex-col" : "flex-row"}`}>
                <a
                  href="tel:+441162395644"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 py-3 text-center text-sm font-medium text-black hover:bg-neutral-50 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800"
                  title="Call the restaurant to change your date or time"
                >
                  <Phone size={16} aria-hidden strokeWidth={1.8} />
                  Call to change date or time
                </a>
                <button
                  type="button"
                  className="flex-1 rounded-full border border-red-200 py-3 text-sm font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/30"
                  onClick={() => setStep("confirm")}
                >
                  Cancel reservation
                </button>
              </div>
            </>
          ) : null}
          {step === "confirm" ? (
            <>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-red-600 dark:text-red-400">
                Confirm cancellation
              </p>
              <h2 className="mt-1 font-serif text-2xl text-black dark:text-white md:text-3xl">Cancel reservation {ref}?</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
                If your booking is still within the online cancellation window, your deposit of £{deposit} will be
                refunded to your card.
              </p>
              {cancelErr ? (
                <p className="mt-4 text-sm text-red-600 dark:text-red-400" role="alert">
                  {cancelErr}
                </p>
              ) : null}
              <div className={`mt-8 flex gap-2.5 ${mobile ? "flex-col-reverse" : "flex-row"}`}>
                <button
                  type="button"
                  className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium dark:border-zinc-600 dark:text-white disabled:opacity-50"
                  disabled={cancelLoading}
                  onClick={() => {
                    setCancelErr("");
                    setStep("view");
                  }}
                >
                  Keep reservation
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50"
                  disabled={cancelLoading}
                  onClick={confirmCancel}
                >
                  {cancelLoading ? "Cancelling…" : "Yes, cancel"}
                </button>
              </div>
            </>
          ) : null}
          {step === "cancelled" ? (
            <div className="py-5 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-stone-200 bg-neutral-100 dark:border-zinc-700 dark:bg-zinc-800">
                <Check size={26} className="text-[#C5A265]" aria-hidden strokeWidth={2} />
              </div>
              <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                Reservation cancelled
              </p>
              <h2 className="mt-2 font-serif text-2xl text-black dark:text-white">We&apos;re sorry to miss you</h2>
              <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
                If a refund applies, it will be returned to your original payment method.
              </p>
              <button
                type="button"
                className="mt-8 rounded-full bg-[#C5A265] px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                onClick={() => dispatch({ type: "RESET" })}
              >
                Book another date
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
