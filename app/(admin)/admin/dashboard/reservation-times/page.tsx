import { AddReservationTimeForm } from "@/components/admin/reservation-time/AddReservationTime";
import { EnableWeekendReservations } from "@/components/admin/reservation-time/EnableWeekendReservations";
import { TriggerTimesForm } from "@/components/admin/reservation-time/TriggerTimesForm";
import { getAllReservationTimes } from "@/database/queries/reservations";
import { getLoggedinUser } from "@/database/queries/users";
import { isWorkingOnWeekend } from "@/lib/actions/reservation-actions";
import { redirect } from "next/navigation";

export default async function ReservationTimesPage() {
    const allReservationTimes = await getAllReservationTimes();
    const loggedInUser = await getLoggedinUser();
    const settings = await isWorkingOnWeekend();

    if (!loggedInUser) {
        redirect("/login");
    }

    const { role } = loggedInUser;

    return (
        <main className="flex flex-col gap-10 lg:w-1/2">
            <h1 className="self-center rounded-md border-b border-red-700 px-5 py-3 text-center text-xs font-bold lg:text-xl">
                KONFIGURIŠI TERMINE
            </h1>

            <TriggerTimesForm times={allReservationTimes} role={role} />

            <EnableWeekendReservations settings={settings} />

            {role === "owner" && <AddReservationTimeForm />}
        </main>
    );
}
