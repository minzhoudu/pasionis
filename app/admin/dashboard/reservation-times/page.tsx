import { AddReservationTimeForm } from "@/components/admin/add-reservation-time/AddReservationTime";
import { getAllReservationTimes } from "@/database/queries/reservations";

export default async function ReservationTimesPage() {
    const allReservationTimes = await getAllReservationTimes();

    return (
        <main className="flex w-1/2 flex-col gap-10">
            <div className="grid grid-cols-3 gap-7 self-center">
                {allReservationTimes.map((reservationTime) => (
                    <div
                        key={reservationTime._id}
                        className="border px-2 py-1 text-center"
                    >
                        {reservationTime.time}
                    </div>
                ))}
            </div>

            <AddReservationTimeForm />
        </main>
    );
}
