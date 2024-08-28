import { AddReservationTimeForm } from "@/components/admin/reservation-time/AddReservationTime";
import { TriggerTimesForm } from "@/components/admin/reservation-time/TriggerTimesForm";
import { getAllReservationTimes } from "@/database/queries/reservations";
import { triggerReservationTime } from "@/lib/actions/reservation-times-action";

export default async function ReservationTimesPage() {
    const allReservationTimes = await getAllReservationTimes();

    return (
        <main className="flex flex-col gap-10 lg:w-1/2">
            <h1 className="self-center rounded-md border-b border-red-700 px-5 py-3 text-center text-xs font-bold lg:text-xl">
                KONFIGURIŠI TERMINE
            </h1>

            <TriggerTimesForm times={allReservationTimes} />

            <AddReservationTimeForm />
        </main>
    );
}
