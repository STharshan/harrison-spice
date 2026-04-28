export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function fmtDate(d) {
  if (!d) return "";
  return `${dayNamesShort[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

export function fmtDateLong(d) {
  if (!d) return "";
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return `${days[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
}

export function fmtIso(d) {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addMinutes(hhmm, mins) {
  const [h, m] = hhmm.split(":").map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(total / 60) % 24;
  const nm = total % 60;
  return `${String(nh).padStart(2, "0")}:${String(nm).padStart(2, "0")}`;
}

export function fmtSlot(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(m).padStart(2, "0")} ${period}`;
}

export function slotsForDate(date) {
  if (!date) return [];
  const dow = date.getDay();
  let lastStart;
  if (dow === 0) lastStart = "20:30";
  else if (dow >= 1 && dow <= 4) lastStart = "21:30";
  else lastStart = "22:00";
  const out = [];
  let t = "17:00";
  while (t <= lastStart) {
    out.push(t);
    t = addMinutes(t, 15);
  }
  return out;
}

export function fakeUnavailable(date, partySize) {
  if (!date) return new Set();
  const seed = date.getDate() * 31 + date.getMonth() * 7 + (partySize || 2);
  const all = slotsForDate(date);
  const unavailable = new Set();
  for (let i = 0; i < all.length; i++) {
    const v = (seed * (i + 13)) % 11;
    const dow = date.getDay();
    const peak = all[i] >= "19:00" && all[i] <= "20:30";
    if (peak && (dow === 5 || dow === 6) && v < 6) unavailable.add(all[i]);
    else if (v < 2) unavailable.add(all[i]);
  }
  return unavailable;
}

/**
 * @param {{ dayOfWeek: number; startTime: string; endTime: string; isActive: boolean }[]} timeSlots
 * @param {number} mondayZeroDayOfWeek Monday = 0 … Sunday = 6 (same as table-booking `time_slots.day_of_week`).
 */
export function formatOpeningLineForDay(timeSlots, mondayZeroDayOfWeek) {
  if (!Array.isArray(timeSlots) || timeSlots.length === 0) return null;
  const active = timeSlots
    .filter((s) => s.dayOfWeek === mondayZeroDayOfWeek && s.isActive)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
  if (!active.length) return "Closed · no online slots this day";
  return active.map((w) => `${fmtSlot(w.startTime)}–${fmtSlot(w.endTime)}`).join(" · ");
}

export function formatPenceAsPoundsLabel(pence) {
  if (typeof pence !== "number" || Number.isNaN(pence)) return null;
  const pounds = pence / 100;
  const s = pounds % 1 === 0 ? pounds.toFixed(0) : pounds.toFixed(2);
  return `£${s}`;
}

/** Google Calendar `dates` segment: UTC compact form per their template URL. */
function toGoogleCalendarUtcCompact(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const iso = date.toISOString();
  return (
    iso.slice(0, 4) +
    iso.slice(5, 7) +
    iso.slice(8, 10) +
    "T" +
    iso.slice(11, 13) +
    iso.slice(14, 16) +
    iso.slice(17, 19) +
    "Z"
  );
}

/**
 * Opens Google Calendar compose with a prefilled event (new tab).
 * @param {{ title: string; details?: string; location?: string; start: Date; end: Date }} opts
 * @returns {string|null}
 */
export function buildGoogleCalendarEventUrl({ title, details = "", location = "", start, end }) {
  if (!(start instanceof Date) || !(end instanceof Date)) return null;
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  if (end.getTime() <= start.getTime()) return null;
  const startS = toGoogleCalendarUtcCompact(start);
  const endS = toGoogleCalendarUtcCompact(end);
  if (!startS || !endS) return null;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${startS}/${endS}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * @param {{ date: Date; slotStart: string; slotEnd?: string | null; durationMinutes?: number }} opts
 * @returns {{ start: Date; end: Date } | null}
 */
export function bookingWallClockRange({ date, slotStart, slotEnd, durationMinutes = 120 }) {
  if (!date || !slotStart || !/^\d{1,2}:\d{2}/.test(String(slotStart).trim())) return null;
  const [h, m] = String(slotStart)
    .trim()
    .slice(0, 5)
    .split(":")
    .map(Number);
  const start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), h, m, 0, 0);
  let end = null;
  if (slotEnd && /^\d{1,2}:\d{2}/.test(String(slotEnd).trim())) {
    const [eh, em] = String(slotEnd)
      .trim()
      .slice(0, 5)
      .split(":")
      .map(Number);
    end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), eh, em, 0, 0);
  }
  if (!end || end.getTime() <= start.getTime()) {
    const mins = typeof durationMinutes === "number" && durationMinutes > 0 ? durationMinutes : 120;
    end = new Date(start.getTime() + mins * 60_000);
  }
  return { start, end };
}
