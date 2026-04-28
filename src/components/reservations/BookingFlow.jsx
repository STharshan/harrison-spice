import { useEffect, useReducer, useState } from "react";
import { getBookingFlowHeroCopy } from "../../constants/bookingFlowHeroCopy.js";
import { formatPenceAsPoundsLabel } from "../../constants/bookingHelpers.js";
import { RESERVATION_CHECKOUT_STORAGE_KEY } from "../../constants/checkoutStorage.js";
import { bookingReducer, initialBookingState } from "../../hooks/bookingReducer.js";
import {
  ReservationPublicConfigProvider,
  useReservationPublicConfig,
} from "../../contexts/ReservationPublicConfigContext.jsx";
import { getBookingByCancellationToken, getBookingApiBase } from "../../services/bookingApi.js";
import { BookingFlowHero } from "./BookingFlowHero.jsx";
import { ScreenLanding } from "./screens/ScreenLanding.jsx";
import { ScreenDate } from "./screens/ScreenDate.jsx";
import { ScreenHold } from "./screens/ScreenHold.jsx";
import { ScreenDetails } from "./screens/ScreenDetails.jsx";
import { ScreenPayment } from "./screens/ScreenPayment.jsx";
import { ScreenSuccess } from "./screens/ScreenSuccess.jsx";
import { ScreenManage } from "./screens/ScreenManage.jsx";
import { ScreenError } from "./screens/ScreenError.jsx";

function useMobileBreakpoint() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function bookingApiBase() {
  return import.meta.env.VITE_BOOKING_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";
}

function ScreenDeepLinkApiMissing({ dispatch }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-8 text-center">
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        Your cancellation link needs the booking service URL. Set{" "}
        <code className="rounded bg-neutral-200 px-1 text-xs text-black dark:bg-zinc-800 dark:text-white">
          VITE_BOOKING_API_BASE_URL
        </code>{" "}
        (for example <code className="text-xs">http://localhost:3000</code>) in the marketing app env, then reload this
        page.
      </p>
      <button
        type="button"
        className="mt-8 rounded-full bg-[#C5A265] px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
        onClick={() => dispatch({ type: "RESET_HOME" })}
      >
        Back to reservations
      </button>
    </div>
  );
}

function ScreenAlreadyCancelledLink({ state, dispatch }) {
  const ref = state.bookingRef || "this booking";
  return (
    <div className="mx-auto max-w-lg px-6 py-8 text-center">
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        <strong className="text-black dark:text-white">{ref}</strong> has already been cancelled. If you need a new
        table, you can book again below.
      </p>
      <button
        type="button"
        className="mt-8 rounded-full bg-[#C5A265] px-8 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
        onClick={() => dispatch({ type: "RESET_HOME" })}
      >
        Book a table
      </button>
    </div>
  );
}

function BookingFlowInner() {
  const [state, dispatch] = useReducer(bookingReducer, initialBookingState);
  const [checkoutReturnLoading, setCheckoutReturnLoading] = useState(() => {
    if (typeof window === "undefined") return false;
    const q = new URLSearchParams(window.location.search);
    return Boolean(q.get("session_id"));
  });
  const mobile = useMobileBreakpoint();
  const cfg = useReservationPublicConfig();

  // Stripe checkout return (`session_id`) takes priority over `cancellation_token` when both are present.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const canceled = params.get("checkout") === "canceled";
    if (canceled) {
      try {
        const raw = sessionStorage.getItem(RESERVATION_CHECKOUT_STORAGE_KEY);
        if (raw) {
          const p = JSON.parse(raw);
          sessionStorage.removeItem(RESERVATION_CHECKOUT_STORAGE_KEY);
          dispatch({ type: "RESTORE_CHECKOUT_DRAFT", payload: p });
        }
      } catch {
        sessionStorage.removeItem(RESERVATION_CHECKOUT_STORAGE_KEY);
      }
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);
      return;
    }

    const sessionId = params.get("session_id");
    if (!sessionId) return;

    const api = bookingApiBase();
    if (!api) {
      dispatch({
        type: "PAYMENT_FAILED",
        reason: "Missing VITE_BOOKING_API_BASE_URL — cannot confirm checkout.",
      });
      window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);
      setCheckoutReturnLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${api}/api/payments/complete-checkout-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          dispatch({
            type: "PAYMENT_FAILED",
            reason: typeof data.message === "string" ? data.message : "Could not confirm payment.",
          });
        } else {
          dispatch({ type: "CHECKOUT_SUCCESS", payload: data });
        }
      } catch {
        if (!cancelled) {
          dispatch({
            type: "PAYMENT_FAILED",
            reason: "Network error confirming your booking. Please contact the restaurant.",
          });
        }
      } finally {
        if (!cancelled) {
          window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);
          setCheckoutReturnLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("session_id")) return;

    const cancelTok = params.get("cancellation_token")?.trim();
    if (!cancelTok) return;

    if (!getBookingApiBase()) {
      dispatch({ type: "OPEN_DEEP_LINK_MISSING_API" });
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await getBookingByCancellationToken(cancelTok);
        if (cancelled) return;
        if (data.alreadyCancelled) {
          dispatch({
            type: "OPEN_ALREADY_CANCELLED_FROM_LINK",
            payload: { bookingRef: data.bookingRef ?? null },
          });
        } else {
          dispatch({
            type: "OPEN_FROM_CANCELLATION_LINK",
            payload: {
              bookingRef: data.bookingRef ?? null,
              bookingDate: data.bookingDate ?? null,
              slotStart: data.slotStart ?? null,
              slotEnd: data.slotEnd ?? null,
              partySize: typeof data.partySize === "number" ? data.partySize : 2,
              cancellationToken: data.cancellationToken ?? cancelTok,
              customerEmail: data.customerEmail ?? "",
              customerName: data.customerName ?? "",
            },
          });
        }
        window.history.replaceState({}, "", `${window.location.pathname}${window.location.hash}`);
      } catch {
        if (!cancelled) dispatch({ type: "GOTO", step: "manage" });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const screen = (() => {
    switch (state.step) {
      case "reservations":
        return <ScreenLanding dispatch={dispatch} mobile={mobile} />;
      case "date":
        return <ScreenDate state={state} dispatch={dispatch} mobile={mobile} />;
      case "hold":
        return <ScreenHold state={state} dispatch={dispatch} mobile={mobile} />;
      case "details":
        return <ScreenDetails state={state} dispatch={dispatch} mobile={mobile} />;
      case "payment":
        return <ScreenPayment state={state} dispatch={dispatch} mobile={mobile} />;
      case "success":
        return <ScreenSuccess state={state} dispatch={dispatch} mobile={mobile} />;
      case "manage":
        return <ScreenManage state={state} dispatch={dispatch} mobile={mobile} />;
      case "already_cancelled_link":
        return <ScreenAlreadyCancelledLink state={state} dispatch={dispatch} />;
      case "deep_link_api_missing":
        return <ScreenDeepLinkApiMissing dispatch={dispatch} />;
      case "error":
        return <ScreenError state={state} dispatch={dispatch} mobile={mobile} />;
      default:
        return null;
    }
  })();

  const isPayment = state.step === "payment";
  const feeLabel =
    cfg?.bookingFeePerPersonPence != null
      ? formatPenceAsPoundsLabel(cfg.bookingFeePerPersonPence)
      : "£10";
  const reminderLine =
    state.step === "success" &&
    cfg?.reminderEnabled &&
    typeof cfg.reminderWindowHours === "number"
      ? `We may email you a reminder within ${cfg.reminderWindowHours} hours of your seating.`
      : null;

  const heroCopy = getBookingFlowHeroCopy(state.step, {
    errorVariant: state.errorVariant,
    errorMsg: state.errorMsg,
    holdMinutes: cfg?.holdDurationMinutes ?? 10,
    feePerGuestLabel: feeLabel ?? "£10",
    customerEmail: state.customerEmail,
    reminderLine,
  });

  if (checkoutReturnLoading) {
    return (
      <div className="bg-neutral-100 dark:bg-black">
        <BookingFlowHero mobile={mobile} title={heroCopy.title} description={heroCopy.description} />
        <div className="py-10">
          <div
            className={`mx-auto flex max-w-[1100px] items-center justify-center ${mobile ? "px-4" : "px-6 md:px-14"}`}
          >
            <div
              className={`w-full rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 ${mobile ? "min-h-[360px]" : "min-h-[520px]"} flex flex-col items-center justify-center gap-4`}
              aria-busy="true"
              aria-live="polite"
            >
              <div
                className="h-10 w-10 animate-spin rounded-full border-2 border-neutral-300 border-t-[#C5A265] dark:border-zinc-600 dark:border-t-[#C5A265]"
                aria-hidden
              />
              <h3 className="text-center font-serif text-2xl text-black dark:text-white">
                Confirming your booking…
              </h3>
              <p className="max-w-md text-center text-sm text-neutral-600 dark:text-neutral-400">
                This can take a few seconds. Please don&apos;t close this tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={` ${isPayment ? "bg-[#f7f4ed] dark:bg-zinc-950" : "bg-neutral-100 dark:bg-black"}`}
    >
      <div className="">
        <BookingFlowHero
          mobile={mobile}
          title={heroCopy.title}
          description={heroCopy.description}
        />
        <div className="py-10">{screen}</div>
      </div>
    </div>
  );
}

export function BookingFlow() {
  return (
    <ReservationPublicConfigProvider>
      <BookingFlowInner />
    </ReservationPublicConfigProvider>
  );
}
