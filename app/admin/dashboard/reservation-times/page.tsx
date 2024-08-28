import { AddReservationTimeForm } from "@/components/admin/reservation-time/AddReservationTime";
import { TriggerTimesForm } from "@/components/admin/reservation-time/TriggerTimesForm";
import { getAllReservationTimes } from "@/database/queries/reservations";
import { triggerReservationTime } from "@/lib/actions/reservation-times-action";

export default async function ReservationTimesPage() {
    const allReservationTimes = await getAllReservationTimes();

    return (
        <main className="flex w-1/2 flex-col gap-10">
            <TriggerTimesForm times={allReservationTimes} />

            <AddReservationTimeForm />
        </main>
    );
}
