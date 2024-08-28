import { ReservationsTable } from "@/components/admin/reservations-table/ReservationsTable";
import { getLoggedinUser } from "@/database/queries/users";
import { getAllReservations } from "@/lib/actions/reservation-actions";
import { FilterType } from "@/types";

type AdminDashboardProps = {
    searchParams: {
        selectedFilter?: FilterType;
    };
};

export default async function AdminDashboard({
    searchParams: { selectedFilter },
}: AdminDashboardProps) {
    const allReservations = await getAllReservations();
    const loggedInUser = await getLoggedinUser();

    return (
        <section className="flex flex-col gap-10">
            <h1 className="self-center rounded-md border-b border-red-700 px-5 py-3 text-center font-bold lg:text-xl">
                REZERVACIJE
            </h1>

            <ReservationsTable
                selectedFilter={selectedFilter}
                reservations={allReservations}
                role={loggedInUser?.role}
            />
        </section>
    );
}
