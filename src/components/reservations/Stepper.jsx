import { Check } from "lucide-react";

const labels = ["Date & Party", "Hold", "Your details", "Payment", "Confirmed"];
const labelsMobile = ["Date", "Hold", "Details", "Pay", "Done"];

export function Stepper({ step }) {
  return (
    <div className="hidden md:flex flex-wrap items-center justify-center gap-0" role="list" aria-label="Booking progress">
      {labels.map((l, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <div key={l} className="flex items-center">
            <div className="flex flex-col items-center min-w-[72px]" role="listitem">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  done
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : current
                      ? "bg-[#C5A265] text-white"
                      : "border border-stone-300 bg-white text-neutral-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-neutral-400"
                }`}
              >
                {done ? <Check size={12} className="text-white dark:text-black" aria-hidden strokeWidth={2} /> : i + 1}
              </div>
              <span className="mt-1.5 max-w-[88px] text-center text-[11px] font-medium text-neutral-600 dark:text-neutral-400">
                {l}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div
                className={`mx-1 h-px w-6 sm:w-10 ${done ? "bg-black dark:bg-white" : "bg-stone-200 dark:bg-zinc-700"}`}
                aria-hidden
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function StepperMobile({ step }) {
  return (
    <div className="flex md:hidden items-center gap-1.5" role="list" aria-label="Booking progress">
      {labelsMobile.map((_, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={labelsMobile[i]} className="flex flex-1 items-center gap-1.5">
            <div
              className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                done
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : active
                    ? "bg-[#C5A265] text-white"
                    : "border border-stone-300 bg-white text-neutral-500 dark:border-zinc-600 dark:bg-zinc-800"
              }`}
              role="listitem"
            >
              {done ? <Check size={11} className="text-white dark:text-black" aria-hidden strokeWidth={2} /> : i + 1}
            </div>
            {i < labelsMobile.length - 1 && (
              <div className={`h-px flex-1 ${done ? "bg-black dark:bg-white" : "bg-stone-200 dark:bg-zinc-700"}`} aria-hidden />
            )}
          </div>
        );
      })}
    </div>
  );
}
