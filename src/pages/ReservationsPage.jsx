import { BookingFlow } from "../components/reservations/BookingFlow.jsx";

export default function ReservationsPage() {
  return (
    <main className="bg-neutral-100 pt-20 dark:bg-black md:pt-22" id="reservations-main">
      <BookingFlow />
    </main>
  );
}
