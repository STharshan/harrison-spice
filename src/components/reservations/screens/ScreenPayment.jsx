import { useState } from "react";
import { Lock } from "lucide-react";
import { fmtDate, fmtSlot, formatPenceAsPoundsLabel } from "../../../constants/bookingHelpers.js";
import { RESERVATION_CHECKOUT_STORAGE_KEY } from "../../../constants/checkoutStorage.js";
import { useReservationPublicConfig } from "../../../contexts/ReservationPublicConfigContext.jsx";
import { HoldTimer } from "../HoldTimer.jsx";

function bookingApiBase() {
  const base = import.meta.env.VITE_BOOKING_API_BASE_URL?.trim().replace(/\/$/, "");
  return base || "";
}

export function ScreenPayment({ state, dispatch, mobile }) {
  const pub = useReservationPublicConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const feePence = pub?.bookingFeePerPersonPence;
  const perHeadPounds =
    typeof feePence === "number" && !Number.isNaN(feePence) ? feePence / 100 : 10;
  const total = (state.partySize || 0) * perHeadPounds;
  const guestFeeLabel = typeof feePence === "number" ? formatPenceAsPoundsLabel(feePence) : "£10";
  const base = bookingApiBase();

  async function startStripeCheckout() {
    setError("");
    if (!base) {
      setError(
        "Missing VITE_BOOKING_API_BASE_URL. Add your booking API origin (e.g. https://your-booking-app.vercel.app).",
      );
      return;
    }
    if (!state.holdId) {
      setError("No active hold. Go back and choose a time again.");
      return;
    }

    const draft = {
      holdId: state.holdId,
      holdExpiresAt: state.holdExpiresAt,
      partySize: state.partySize,
      date: state.date ? state.date.toISOString() : null,
      slot: state.slot,
      slotEnd: state.slotEnd,
      customerName: state.customerName,
      customerEmail: state.customerEmail,
      customerPhone: state.customerPhone,
      specialRequests: state.specialRequests,
      emailOptOut: state.emailOptOut,
    };
    try {
      sessionStorage.setItem(RESERVATION_CHECKOUT_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage failures
    }

    setLoading(true);
    try {
      const res = await fetch(`${base}/api/payments/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          holdId: state.holdId,
          customerName: state.customerName,
          customerEmail: state.customerEmail,
          customerPhone: state.customerPhone,
          specialRequests: state.specialRequests || undefined,
          emailOptOut: state.emailOptOut || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.message === "string" ? data.message : "Could not start checkout.");
        setLoading(false);
        return;
      }
      if (!data.url) {
        setError("Checkout did not return a URL.");
        setLoading(false);
        return;
      }
      window.location.assign(data.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Network error starting checkout.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-full bg-[#f7f4ed] dark:bg-zinc-950">
      <div
        className={`mx-auto grid max-w-[1100px] ${mobile ? "grid-cols-1" : "min-h-[600px] md:grid-cols-2"}`}
      >
        <div
          className={`border-stone-200 bg-[#fffdf8] dark:border-zinc-800 dark:bg-zinc-900/80 ${mobile ? "border-b px-5 py-6" : "border-r px-8 py-10 md:px-14"}`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            Pay Harrison&apos;s Spice
          </p>
          <p className="mt-2 font-serif text-4xl font-semibold text-black dark:text-white md:text-5xl">
            £{total.toFixed(2)}
          </p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Non-refundable booking fee · {guestFeeLabel} per guest · {state.partySize} guests
          </p>
          <div className="my-6 h-px bg-stone-200 dark:bg-zinc-700" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500 dark:text-neutral-400">Reservation</dt>
              <dd className="font-medium text-black dark:text-white">
                Table for {state.partySize}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500 dark:text-neutral-400">Date</dt>
              <dd className="font-medium text-black dark:text-white">{fmtDate(state.date)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500 dark:text-neutral-400">Time</dt>
              <dd className="font-medium text-black dark:text-white">{fmtSlot(state.slot)}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500 dark:text-neutral-400">Guest</dt>
              <dd className="font-medium text-black dark:text-white">{state.customerName}</dd>
            </div>
            <div className="mt-3 flex justify-between border-t border-stone-200 pt-3 font-serif text-lg dark:border-zinc-700">
              <span className="text-black dark:text-white">Total</span>
              <span className="text-black dark:text-white">£{total.toFixed(2)}</span>
            </div>
          </dl>
          <div className="mt-6">
            <HoldTimer state={state} dispatch={dispatch} />
          </div>
          {!mobile ? (
            <p className="mt-8 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              You will be redirected to <span className="font-bold text-[#635BFF]">Stripe</span> to
              pay securely.
            </p>
          ) : null}
        </div>

        <div
          className={`bg-[#f7f4ed] dark:bg-zinc-950 ${mobile ? "px-5 py-6" : "px-8 py-10 md:px-14"}`}
        >
          <h3 className="mb-3 font-serif text-xl text-black dark:text-white md:text-2xl">
            Continue to payment
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            You will leave this site briefly. After paying on Stripe you will return here with your
            confirmation.
          </p>

          <div className="mb-6 rounded-lg border border-stone-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
              Billing email
            </p>
            <p className="mt-1 text-[15px] font-medium text-black dark:text-white">
              {state.customerEmail}
            </p>
          </div>

          {error ? (
            <p className="mb-4 text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          {!base ? (
            <p className="mb-4 text-sm text-amber-800 dark:text-amber-200">
              Set{" "}
              <code className="rounded bg-white/80 px-1 dark:bg-zinc-800">
                VITE_BOOKING_API_BASE_URL
              </code>{" "}
              in <code className="rounded bg-white/80 px-1 dark:bg-zinc-800">.env</code> to your
              deployed booking API (no trailing slash).
            </p>
          ) : null}

          <button
            type="button"
            disabled={loading}
            onClick={startStripeCheckout}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-[15px] font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black" />
                Opening Stripe…
              </>
            ) : (
              <>
                <Lock
                  size={14}
                  className="text-white dark:text-black"
                  aria-hidden
                  strokeWidth={1.7}
                />
                Pay £{total.toFixed(2)} with Stripe
              </>
            )}
          </button>

          <button
            type="button"
            className="mt-4 w-full text-center text-sm font-medium text-neutral-600 underline-offset-2 hover:text-[#C5A265] hover:underline dark:text-neutral-400"
            onClick={() => dispatch({ type: "BACK_TO_DATE" })}
          >
            Back to date &amp; time
          </button>
        </div>
      </div>
    </div>
  );
}
