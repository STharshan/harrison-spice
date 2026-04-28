import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { fmtDate, fmtSlot } from "../../constants/bookingHelpers.js";

export function HoldTimer({ state, dispatch }) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, Math.floor((state.holdExpiresAt - now) / 1000));

  useEffect(() => {
    if (
      remaining === 0 &&
      state.holdExpiresAt > 0 &&
      (state.step === "details" || state.step === "payment")
    ) {
      dispatch({ type: "HOLD_EXPIRED" });
    }
  }, [remaining, state.holdExpiresAt, state.step, dispatch]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const warn = remaining < 120 && remaining > 0;
  const danger = remaining < 30 && remaining > 0;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold tabular-nums ${
        danger
          ? "border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          : warn
            ? "border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-100"
            : "border-stone-200 bg-white text-neutral-800 dark:border-zinc-600 dark:bg-zinc-800 dark:text-neutral-100"
      }`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <Clock size={14} className="text-current shrink-0" aria-hidden strokeWidth={1.6} />
      <span>
        Table held · {mm}:{ss}
      </span>
      <span className="sr-only">
        {`Hold expires in ${remaining} seconds. Reservation for ${fmtSlot(state.slot)} on ${fmtDate(state.date)}.`}
      </span>
    </div>
  );
}
