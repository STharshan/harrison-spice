import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getHours, getPublicBookingSettings } from "../services/bookingApi.js";

const ReservationPublicConfigContext = createContext(null);

export function useReservationPublicConfig() {
  return useContext(ReservationPublicConfigContext);
}

export function ReservationPublicConfigProvider({ children }) {
  const [publicPayload, setPublicPayload] = useState(null);
  const [timeSlots, setTimeSlots] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [pub, hours] = await Promise.all([getPublicBookingSettings(), getHours()]);
        if (!cancelled) {
          setPublicPayload(pub);
          setTimeSlots(hours?.timeSlots ?? []);
          setLoadError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setLoadError(e instanceof Error ? e.message : "Could not load booking settings");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => {
    const booking = publicPayload?.booking;
    const notifications = publicPayload?.notifications;
    return {
      loadError,
      timeSlots,
      bookingFeePerPersonPence: booking?.bookingFeePerPersonPence ?? null,
      bookingDurationMinutes: booking?.bookingDurationMinutes ?? null,
      slotIntervalMinutes: booking?.slotIntervalMinutes ?? null,
      holdDurationMinutes:
        typeof publicPayload?.holdDurationMinutes === "number"
          ? publicPayload.holdDurationMinutes
          : 10,
      reminderEnabled: Boolean(notifications?.reminderEnabled),
      reminderWindowHours:
        typeof notifications?.reminderWindowHours === "number"
          ? notifications.reminderWindowHours
          : null,
      preventBeyondClosing: Boolean(publicPayload?.scheduling?.preventBeyondClosing),
    };
  }, [publicPayload, timeSlots, loadError]);

  return (
    <ReservationPublicConfigContext.Provider value={value}>
      {children}
    </ReservationPublicConfigContext.Provider>
  );
}
