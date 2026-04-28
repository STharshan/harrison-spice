import { Calendar, Clock, Info, Users } from "lucide-react";
import { fmtDate, fmtSlot, formatPenceAsPoundsLabel } from "../../constants/bookingHelpers.js";

export function OrderSummary({ date, slot, partySize, compact, bookingFeePerPersonPence }) {
  const perGuestLabel =
    typeof bookingFeePerPersonPence === "number"
      ? formatPenceAsPoundsLabel(bookingFeePerPersonPence)
      : null;
  const perHeadPounds =
    typeof bookingFeePerPersonPence === "number" && !Number.isNaN(bookingFeePerPersonPence)
      ? bookingFeePerPersonPence / 100
      : 10;
  const guestLabel = perGuestLabel ?? "£10";
  const total = (partySize || 0) * perHeadPounds;

  return (
    <div
      className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 ${compact ? "p-4" : ""}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
        Your reservation
      </p>
      <h3 className="mt-2 font-serif text-xl text-black dark:text-white md:text-2xl">
        {partySize ? `Table for ${partySize}` : "Table"}
      </h3>
      <div className="my-4 h-px bg-stone-200 dark:bg-zinc-700" />
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Calendar size={14} aria-hidden strokeWidth={1.6} /> Date
          </dt>
          <dd className="font-medium text-black dark:text-white">{fmtDate(date)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Clock size={14} aria-hidden strokeWidth={1.6} /> Time
          </dt>
          <dd className="font-medium text-black dark:text-white">{slot ? fmtSlot(slot) : "—"}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <Users size={14} aria-hidden strokeWidth={1.6} /> Party
          </dt>
          <dd className="font-medium text-black dark:text-white">
            {partySize} {partySize === 1 ? "guest" : "guests"}
          </dd>
        </div>
      </dl>
      <div className="my-3 h-px bg-stone-200 dark:bg-zinc-700" />
      <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-300">
        <span>Non-refundable booking fee</span>
        <span>
          {guestLabel} × {partySize}
        </span>
      </div>
      <div className="mt-2 flex justify-between border-t border-stone-200 pt-3 font-serif text-lg text-black dark:border-zinc-700 dark:text-white">
        <span>Total today</span>
        <span>£{total.toFixed(2)}</span>
      </div>
      <p className="mt-4 flex gap-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
        <Info size={13} className="shrink-0 text-neutral-500 dark:text-neutral-400" aria-hidden strokeWidth={1.7} />
        <span>
          A non-refundable booking fee is charged per guest when you reserve.
        </span>
      </p>
    </div>
  );
}
