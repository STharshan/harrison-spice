export function getBookingApiBase() {
  return import.meta.env.VITE_BOOKING_API_BASE_URL?.trim().replace(/\/$/, "") ?? "";
}

/**
 * @param {string} path
 * @param {RequestInit} [init]
 */
export async function bookingFetchJson(path, init = {}) {
  const base = getBookingApiBase();
  if (!base) {
    const err = new Error("Missing VITE_BOOKING_API_BASE_URL");
    err.code = "NO_BASE";
    throw err;
  }
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = {
    "Content-Type": "application/json",
    ...(init.headers && typeof init.headers === "object" ? init.headers : {}),
  };
  const res = await fetch(url, { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = typeof data.message === "string" ? data.message : res.statusText || "Request failed";
    const err = new Error(msg);
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

/** @param {string} dateIso YYYY-MM-DD */
export function getAvailability(dateIso) {
  const q = encodeURIComponent(dateIso);
  return bookingFetchJson(`/api/availability?date=${q}`);
}

export function getHours() {
  return bookingFetchJson("/api/settings/hours");
}

export function getPublicBookingSettings() {
  return bookingFetchJson("/api/settings/public-booking");
}

/** @param {{ bookingDate: string, slotStart: string, slotEnd: string, partySize: number }} body */
export function createHold(body) {
  return bookingFetchJson("/api/bookings/hold", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** @param {{ email: string, bookingRef?: string }} body */
export function lookupBookingsByEmail(body) {
  return bookingFetchJson("/api/bookings/lookup-by-email", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** @param {{ cancellationToken: string }} body */
export function cancelBooking(body) {
  return bookingFetchJson("/api/bookings/cancel", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** @param {string} token UUID */
export function getBookingByCancellationToken(token) {
  const q = encodeURIComponent(token);
  return bookingFetchJson(`/api/bookings/by-cancellation-token?token=${q}`, {
    method: "GET",
  });
}
