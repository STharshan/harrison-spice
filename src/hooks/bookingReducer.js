export const initialBookingState = {
  step: "reservations",
  date: null,
  slot: null,
  slotEnd: null,
  partySize: 2,
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  specialRequests: "",
  emailOptOut: false,
  holdId: null,
  holdExpiresAt: 0,
  paymentIntentId: null,
  bookingRef: null,
  cancellationToken: null,
  errorVariant: null,
  errorMsg: null,
};

export function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  r.setHours(0, 0, 0, 0);
  return r;
}

export function bookingReducer(state, action) {
  switch (action.type) {
    case "GOTO":
      return {
        ...state,
        step: action.step,
        ...(action.step === "payment" ? { errorVariant: null, errorMsg: null } : {}),
      };
    case "BEGIN":
      return { ...state, step: "date" };
    case "CONFIRM_DATE":
      return {
        ...state,
        ...action.payload,
        holdId: null,
        holdExpiresAt: 0,
        step: "hold",
      };
    case "BACK_TO_DATE":
      return { ...state, step: "date" };
    case "HOLD_CREATED":
      return {
        ...state,
        step: "details",
        holdId: action.payload.holdId,
        holdExpiresAt: action.payload.holdExpiresAt,
      };
    case "HOLD_FAILED":
      return {
        ...state,
        step: "error",
        errorVariant: action.variant === "slot_taken" ? "slot_taken" : "hold_error",
        errorMsg: typeof action.message === "string" ? action.message : null,
      };
    case "HOLD_EXPIRED":
      if (state.step !== "details" && state.step !== "payment") return state;
      return {
        ...state,
        step: "date",
        holdId: null,
        holdExpiresAt: 0,
        errorVariant: null,
        errorMsg: null,
      };
    case "SUBMIT_DETAILS":
      return { ...state, ...action.payload, step: "payment" };
    case "PAYMENT_OK":
      return {
        ...state,
        paymentIntentId: action.paymentIntentId,
        bookingRef: `HS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
        step: "success",
      };
    case "PAYMENT_FAILED":
      return {
        ...state,
        step: "error",
        errorVariant: "payment",
        errorMsg: action.reason,
      };
    case "RESET_SOFT":
      return {
        ...state,
        step: "date",
        holdId: null,
        holdExpiresAt: 0,
        errorVariant: null,
        errorMsg: null,
      };
    case "RESET":
      return { ...initialBookingState, step: "date" };
    case "RESET_HOME":
      return { ...initialBookingState };
    case "CHECKOUT_SUCCESS": {
      const p = action.payload;
      return {
        ...initialBookingState,
        step: "success",
        bookingRef: p.bookingRef ?? null,
        paymentIntentId: p.paymentIntentId ?? null,
        cancellationToken: p.cancellationToken ?? null,
        customerName: p.customerName ?? "",
        customerEmail: p.customerEmail ?? "",
        customerPhone: p.customerPhone ?? "",
        partySize: typeof p.partySize === "number" ? p.partySize : initialBookingState.partySize,
        date: p.bookingDate ? new Date(`${p.bookingDate}T12:00:00`) : null,
        slot: p.slotStart ?? null,
        slotEnd: p.slotEnd ?? null,
        specialRequests: p.specialRequests ?? "",
      };
    }
    case "RESTORE_CHECKOUT_DRAFT": {
      const p = action.payload;
      return {
        ...initialBookingState,
        step: "payment",
        holdId: p.holdId ?? null,
        holdExpiresAt: typeof p.holdExpiresAt === "number" ? p.holdExpiresAt : 0,
        partySize: typeof p.partySize === "number" ? p.partySize : 2,
        date: p.date ? new Date(p.date) : null,
        slot: p.slot ?? null,
        slotEnd: p.slotEnd ?? null,
        customerName: p.customerName ?? "",
        customerEmail: p.customerEmail ?? "",
        customerPhone: p.customerPhone ?? "",
        specialRequests: p.specialRequests ?? "",
        emailOptOut: Boolean(p.emailOptOut),
      };
    }
    case "OPEN_FROM_CANCELLATION_LINK": {
      const p = action.payload;
      return {
        ...initialBookingState,
        step: "manage",
        bookingRef: p.bookingRef ?? null,
        cancellationToken: p.cancellationToken ?? null,
        customerEmail: p.customerEmail ?? "",
        customerName: p.customerName ?? "",
        partySize: typeof p.partySize === "number" ? p.partySize : initialBookingState.partySize,
        date: p.bookingDate ? new Date(`${p.bookingDate}T12:00:00`) : null,
        slot: p.slotStart ?? null,
        slotEnd: p.slotEnd ?? null,
      };
    }
    case "OPEN_ALREADY_CANCELLED_FROM_LINK": {
      const p = action.payload;
      return {
        ...initialBookingState,
        step: "already_cancelled_link",
        bookingRef: p.bookingRef ?? null,
      };
    }
    case "OPEN_DEEP_LINK_MISSING_API":
      return {
        ...initialBookingState,
        step: "deep_link_api_missing",
      };
    default:
      return state;
  }
}
