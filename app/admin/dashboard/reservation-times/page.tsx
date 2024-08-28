import { AddReservationTimeForm } from "@/components/admin/reservation-time/AddReservationTime";
import { TriggerTimesForm } from "@/components/admin/reservation-time/TriggerTimesForm";
import { getAllReservationTimes } from "@/database/queries/reservations";
import { triggerReservationTime } from "@/lib/actions/reservation-times-action";

export default async function ReservationTimesPage() {
    const allReservationTimes = await getAllReservationTimes();

    return (
        <main className="flex w-1/2 flex-col gap-10">
            <h1 className="self-center rounded-md border-b border-red-700 px-5 py-3 text-center text-xl font-bold">
                KONFIGURIŠI TERMINE
            </h1>

            <TriggerTimesForm times={allReservationTimes} />

            <AddReservationTimeForm />
        </main>
    );
}
