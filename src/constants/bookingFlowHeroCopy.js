/**
 * @param {string} step
 * @param {{
 *   errorVariant?: string | null;
 *   errorMsg?: string | null;
 *   holdMinutes?: number;
 *   feePerGuestLabel?: string;
 *   customerEmail?: string | null;
 *   reminderLine?: string | null;
 * }} [ctx]
 * @returns {{ title: string; description: string }}
 */
export function getBookingFlowHeroCopy(step, ctx = {}) {
  const { errorVariant, errorMsg } = ctx;
  const holdM = typeof ctx.holdMinutes === "number" && ctx.holdMinutes > 0 ? ctx.holdMinutes : 10;
  const feeLabel = typeof ctx.feePerGuestLabel === "string" && ctx.feePerGuestLabel ? ctx.feePerGuestLabel : "£10";

  switch (step) {
    case "reservations":
      return {
        title: "Reserve your table",
        description:
          "Refined Indian cuisine in the heart of Ratby. Book in three quick steps — no account required.",
      };
    case "date":
      return {
        title: "Choose your date & time",
        description: `Pick your party size, then a date and seating. We will hold the table for ${holdM} minutes while you finish.`,
      };
    case "hold":
      return {
        title: "Securing your table",
        description: "Please wait a moment while we reserve your seats.",
      };
    case "details":
      return {
        title: "Your details",
        description:
          "We will send your confirmation to your email. Tell us about allergies or special occasions if you like.",
      };
    case "payment":
      return {
        title: "Non-refundable booking fee",
        description: `${feeLabel} per guest, charged when you reserve. You will complete payment securely on Stripe.`,
      };
    case "success": {
      const email =
        typeof ctx.customerEmail === "string" && ctx.customerEmail.trim()
          ? ctx.customerEmail.trim()
          : "your email";
      const reminder =
        typeof ctx.reminderLine === "string" && ctx.reminderLine.trim()
          ? ` ${ctx.reminderLine.trim()}`
          : "";
      return {
        title: "You are booked",
        description: `We can't wait to host you. A confirmation has been sent to ${email}.${reminder}`,
      };
    }
    case "manage":
      return {
        title: "Manage your reservation",
        description: "Change your plans or cancel in line with our deposit policy.",
      };
    case "already_cancelled_link":
      return {
        title: "Booking already cancelled",
        description:
          "This reservation is no longer active. You can make a new booking whenever you like.",
      };
    case "deep_link_api_missing":
      return {
        title: "Cannot open booking link",
        description:
          "The site is missing the booking API URL. Ask the venue to set VITE_BOOKING_API_BASE_URL (e.g. your Next server origin).",
      };
    case "error": {
      const variant = errorVariant || "expired";
      if (variant === "payment") {
        const title =
          typeof errorMsg === "string" && errorMsg.trim()
            ? errorMsg.trim()
            : "Your card was declined";
        return {
          title,
          description:
            "Try again or use a different card. Your seats may still be held briefly.",
        };
      }
      if (variant === "hold_error") {
        return {
          title:
            typeof errorMsg === "string" && errorMsg.trim()
              ? errorMsg.trim()
              : "We could not secure this table",
          description: "Go back to choose a date and time, or try again in a moment.",
        };
      }
      if (variant === "slot_taken") {
        return {
          title: "That slot was taken",
          description:
            "Pick another time and we will hold it again. You have not been charged.",
        };
      }
      return {
        title: "Your table hold has timed out",
        description: `We held your seats for ${holdM} minutes. You have not been charged. Choose a new time to continue.`,
      };
    }
    default:
      return {
        title: "Reserve your table",
        description: "Book your table at Harrison's Spice.",
      };
  }
}
