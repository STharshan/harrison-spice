import { useEffect, useRef } from "react";
import { fmtDate, fmtIso, fmtSlot } from "../../../constants/bookingHelpers.js";
import { createHold, getBookingApiBase } from "../../../services/bookingApi.js";

export function ScreenHold({ state, dispatch, mobile }) {
  const requestSeq = useRef(0);

  useEffect(() => {
    const seq = ++requestSeq.current;
    let cancelled = false;

    if (!state.date || !state.slot || !state.slotEnd) {
      dispatch({
        type: "HOLD_FAILED",
        variant: "hold_error",
        message: "Missing date or time. Go back and choose again.",
      });
      return;
    }
    if (!getBookingApiBase()) {
      dispatch({
        type: "HOLD_FAILED",
        variant: "hold_error",
        message: "Missing VITE_BOOKING_API_BASE_URL — cannot create a hold.",
      });
      return;
    }

    const bookingDate = fmtIso(state.date);

    (async () => {
      try {
        const data = await createHold({
          bookingDate,
          slotStart: state.slot,
          slotEnd: state.slotEnd,
          partySize: state.partySize,
        });
        if (cancelled || seq !== requestSeq.current) return;
        const expiresMs = Date.parse(data.expiresAt);
        if (!data.holdId || Number.isNaN(expiresMs)) {
          dispatch({
            type: "HOLD_FAILED",
            variant: "hold_error",
            message: "Invalid response from booking server.",
          });
          return;
        }
        dispatch({
          type: "HOLD_CREATED",
          payload: { holdId: data.holdId, holdExpiresAt: expiresMs },
        });
      } catch (e) {
        if (cancelled || seq !== requestSeq.current) return;
        const status = e && typeof e.status === "number" ? e.status : 0;
        if (status === 409) {
          dispatch({ type: "HOLD_FAILED", variant: "slot_taken" });
        } else {
          dispatch({
            type: "HOLD_FAILED",
            variant: "hold_error",
            message: e instanceof Error ? e.message : "Could not hold this table.",
          });
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [state.date, state.slot, state.slotEnd, state.partySize, dispatch]);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 bg-neutral-100 px-6 dark:bg-black ${mobile ? "min-h-[360px]" : "min-h-[520px]"}`}
      aria-busy="true"
      aria-live="polite"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-300 border-t-[#C5A265] dark:border-zinc-600 dark:border-t-[#C5A265]"
        role="presentation"
      />
      <h3 className="font-serif text-xl text-black dark:text-white md:text-2xl">Holding your table…</h3>
      <p className="max-w-sm text-center text-sm text-neutral-600 dark:text-neutral-400">
        Reserving {state.partySize} seats for {fmtSlot(state.slot)} on {fmtDate(state.date)}
      </p>
    </div>
  );
}
