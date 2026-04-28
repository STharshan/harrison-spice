import { useState } from "react";
import { AlertTriangle, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useReservationPublicConfig } from "../../../contexts/ReservationPublicConfigContext.jsx";
import { HoldTimer } from "../HoldTimer.jsx";
import { OrderSummary } from "../OrderSummary.jsx";
import { Stepper, StepperMobile } from "../Stepper.jsx";

const STORAGE_KEY = "hs_saved_guest";

export function ScreenDetails({ state, dispatch, mobile }) {
  const pub = useReservationPublicConfig();
  const saved = (() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch {
      return null;
    }
  })();

  const [form, setForm] = useState({
    customerName: state.customerName || saved?.customerName || "",
    customerEmail: state.customerEmail || saved?.customerEmail || "",
    customerPhone: state.customerPhone || saved?.customerPhone || "",
    specialRequests: state.specialRequests || "",
    emailOptOut: state.emailOptOut || false,
    saveDetails: Boolean(saved),
  });
  const [touched, setTouched] = useState({});

  const errors = {};
  if (!form.customerName.trim()) errors.customerName = "Please enter a name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) errors.customerEmail = "Enter a valid email";
  if (form.customerPhone.replace(/\D/g, "").length < 5) errors.customerPhone = "Enter a phone number";
  if (form.specialRequests.length > 2000) errors.specialRequests = "Max 2000 characters";
  const valid = Object.keys(errors).length === 0;

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    setTouched({ customerName: true, customerEmail: true, customerPhone: true });
    if (!valid) return;
    if (form.saveDetails) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          customerPhone: form.customerPhone,
        })
      );
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    dispatch({
      type: "SUBMIT_DETAILS",
      payload: {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        specialRequests: form.specialRequests,
        emailOptOut: form.emailOptOut,
      },
    });
  };

  return (
    <div className={`bg-neutral-100 dark:bg-black ${mobile ? "px-4 pb-10 pt-4" : "px-6 pb-16 pt-6 md:px-14"}`}>
      <div className="mx-auto mb-6 flex max-w-[1100px] flex-wrap items-center justify-between gap-3 md:mb-8">
        {mobile ? <StepperMobile step={2} /> : <Stepper step={2} />}
        <HoldTimer state={state} dispatch={dispatch} />
      </div>

      <div
        className={`mx-auto grid max-w-[1100px] gap-5 md:gap-8 ${mobile ? "grid-cols-1" : "md:grid-cols-[1.1fr_0.9fr]"}`}
      >
        <form
          className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 md:p-9"
          onSubmit={submit}
          noValidate
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
            Step Three
          </p>
          <h2 className="mt-1 font-serif text-2xl text-black dark:text-white md:text-3xl">Your details</h2>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-base">
            We&apos;ll send your confirmation here. No account required — but you can save these details for next time.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="cn" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                Full name
              </label>
              <input
                id="cn"
                className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-[15px] text-black outline-none transition focus:border-[#C5A265] focus:ring-2 focus:ring-[#C5A265]/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
                placeholder="e.g. Pamela Tilley"
                value={form.customerName}
                maxLength={200}
                onChange={(e) => update("customerName", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, customerName: true }))}
              />
              {touched.customerName && errors.customerName ? (
                <p className="mt-1 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400" role="alert">
                  <AlertTriangle size={13} aria-hidden strokeWidth={1.7} /> {errors.customerName}
                </p>
              ) : null}
            </div>

            <div className={`grid gap-4 ${mobile ? "grid-cols-1" : "md:grid-cols-2"}`}>
              <div>
                <label htmlFor="ce" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  Email
                </label>
                <input
                  id="ce"
                  type="email"
                  className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-[#C5A265] focus:ring-2 focus:ring-[#C5A265]/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
                  placeholder="you@email.com"
                  value={form.customerEmail}
                  onChange={(e) => update("customerEmail", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, customerEmail: true }))}
                />
                {touched.customerEmail && errors.customerEmail ? (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400" role="alert">
                    <AlertTriangle size={13} aria-hidden strokeWidth={1.7} /> {errors.customerEmail}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor="cp" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                  Phone
                </label>
                <input
                  id="cp"
                  type="tel"
                  className="mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-[15px] outline-none focus:border-[#C5A265] focus:ring-2 focus:ring-[#C5A265]/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
                  placeholder="07…"
                  value={form.customerPhone}
                  onChange={(e) => update("customerPhone", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, customerPhone: true }))}
                />
                {touched.customerPhone && errors.customerPhone ? (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400" role="alert">
                    <AlertTriangle size={13} aria-hidden strokeWidth={1.7} /> {errors.customerPhone}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label htmlFor="sr" className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500 dark:text-neutral-400">
                Special requests <span className="font-normal normal-case tracking-normal text-neutral-400">(optional)</span>
              </label>
              <textarea
                id="sr"
                rows={4}
                className="mt-1.5 min-h-[96px] w-full resize-y rounded-lg border border-stone-300 bg-white px-3.5 py-3 text-[15px] leading-relaxed outline-none focus:border-[#C5A265] focus:ring-2 focus:ring-[#C5A265]/25 dark:border-zinc-600 dark:bg-zinc-950 dark:text-white"
                placeholder="Allergies, accessibility needs, occasion…"
                value={form.specialRequests}
                maxLength={2000}
                onChange={(e) => update("specialRequests", e.target.value.slice(0, 2000))}
              />
              <div className="mt-1 flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>Allergens, dietary needs, anniversary notes.</span>
                <span className="tabular-nums">{form.specialRequests.length}/2000</span>
              </div>
            </div>

            <div className="h-px bg-stone-200 dark:bg-zinc-700" />

            <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-stone-300 text-[#C5A265] focus:ring-[#C5A265]"
                checked={form.saveDetails}
                onChange={(e) => update("saveDetails", e.target.checked)}
              />
              <span>Save my details on this device for next time</span>
            </label>
            <label className="flex cursor-pointer items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-stone-300 text-[#C5A265] focus:ring-[#C5A265]"
                checked={!form.emailOptOut}
                onChange={(e) => update("emailOptOut", !e.target.checked)}
              />
              <span>Email me occasional news from Harrison&apos;s Spice (events, banquet nights)</span>
            </label>
          </div>

          <div className={`mt-8 flex gap-2.5 ${mobile ? "flex-col-reverse" : "flex-row"}`}>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-1 rounded-full border border-stone-300 bg-transparent px-5 py-3 text-sm font-medium text-black hover:bg-neutral-50 dark:border-zinc-600 dark:text-white dark:hover:bg-zinc-800"
              onClick={() => dispatch({ type: "BACK_TO_DATE" })}
            >
              <ChevronLeft size={14} aria-hidden strokeWidth={2} /> Back
            </button>
            <button
              type="submit"
              disabled={!valid}
              className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#C5A265] px-6 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to payment
              <ChevronRight size={14} aria-hidden strokeWidth={2} className="text-white group-hover:text-black" />
            </button>
          </div>
        </form>

        <div className="flex flex-col gap-4 self-start">
          <OrderSummary
            date={state.date}
            slot={state.slot}
            partySize={state.partySize}
            bookingFeePerPersonPence={pub?.bookingFeePerPersonPence ?? null}
          />
          <div className="flex gap-3 rounded-xl border border-stone-200 bg-white p-3.5 text-xs leading-relaxed text-neutral-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-neutral-400">
            <Lock size={14} className="mt-0.5 shrink-0 text-[#C5A265]" aria-hidden strokeWidth={1.7} />
            <span>
              Your details are sent securely. Payment will be handled by Stripe — Harrison&apos;s Spice never sees your
              card number.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
