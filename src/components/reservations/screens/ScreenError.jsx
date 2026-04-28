import { AlertTriangle, ChevronRight } from "lucide-react";

const map = {
  expired: {
    eyebrow: "Hold expired",
    title: "Your table hold has timed out",
    body: "We held your seats for 10 minutes — but the time's up. Your card hasn't been charged. Please pick a new time and we'll get you sorted.",
    cta: "Choose a new time",
    actionType: "RESET_SOFT",
    tone: "warn",
  },
  slot_taken: {
    eyebrow: "Just missed it",
    title: "That slot was taken moments ago",
    body: "Tables go quickly on Friday and Saturday evenings. Pick another time and we'll hold it again.",
    cta: "Pick another time",
    actionType: "RESET_SOFT",
    tone: "warn",
  },
  hold_error: {
    eyebrow: "Hold issue",
    title: "We could not secure this table",
    body: "Check your connection or try a different time. You have not been charged.",
    cta: "Back to date & time",
    actionType: "RESET_SOFT",
    tone: "warn",
  },
  payment: {
    eyebrow: "Payment unsuccessful",
    title: "Your card was declined",
    body: "Don't worry — your seats are still held for the next few minutes. Try again with the same card, or use a different one.",
    cta: "Try payment again",
    actionType: "GOTO_PAYMENT",
    tone: "error",
  },
};

export function ScreenError({ state, dispatch, mobile }) {
  const variant = state.errorVariant || "expired";
  const base = map[variant] || map.expired;
  const m = {
    ...base,
    title:
      variant === "payment" && state.errorMsg
        ? state.errorMsg
        : variant === "hold_error" && state.errorMsg
          ? state.errorMsg
          : base.title,
  };

  const onPrimary = () => {
    if (m.actionType === "GOTO_PAYMENT") dispatch({ type: "GOTO", step: "payment" });
    else dispatch({ type: "RESET_SOFT" });
  };

  const isError = m.tone === "error";

  return (
    <div className={`bg-neutral-100 dark:bg-black ${mobile ? "min-h-[420px] px-4 py-10" : "min-h-[500px] px-6 py-14 md:px-14"}`}>
      <div className="mx-auto max-w-lg rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-11">
        <div
          className={`mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full ${
            isError ? "bg-red-100 dark:bg-red-950/40" : "bg-amber-100 dark:bg-amber-950/30"
          }`}
        >
          <AlertTriangle
            size={28}
            aria-hidden
            strokeWidth={1.7}
            className={isError ? "text-red-700 dark:text-red-400" : "text-amber-800 dark:text-amber-200"}
          />
        </div>
        <p
          className={`mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] ${isError ? "text-red-600 dark:text-red-400" : "text-amber-800 dark:text-amber-200"}`}
        >
          {m.eyebrow}
        </p>
        <h2 className={`mt-2 font-serif text-2xl text-black dark:text-white ${mobile ? "text-2xl" : "text-3xl md:text-4xl"}`}>
          {m.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">{m.body}</p>
        <div className={`mt-8 flex justify-center gap-2.5 ${mobile ? "flex-col" : "flex-row"}`}>
          <button
            type="button"
            className="rounded-full border border-stone-300 px-5 py-3 text-sm font-medium dark:border-zinc-600 dark:text-white"
            onClick={() => dispatch({ type: "RESET_HOME" })}
          >
            Start over
          </button>
          <button
            type="button"
            className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C5A265] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
            onClick={onPrimary}
          >
            {m.cta}
            <ChevronRight size={14} aria-hidden strokeWidth={2} className="text-white group-hover:text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
