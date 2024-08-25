import { DiscardReservation } from "@/components/admin/discard-reservation/DiscardReservation";
import {
    deleteReservation,
    getAllReservations,
} from "@/lib/actions/reservation-actions";
import { getLoggedinUser } from "@/lib/actions/user";

export default async function AdminDashboard() {
    const allReservations = await getAllReservations();
    const loggedInUser = await getLoggedinUser();

    return (
        <section className="flex flex-col gap-16">
            <h1 className="text-center text-xl font-bold">REZERVACIJE</h1>

            <div className="max-h-96 overflow-y-auto">
                <table className="min-w-full overflow-hidden rounded-lg bg-gray-900 shadow-md">
                    <thead>
                        <tr className="bg-gray-800 text-sm uppercase leading-normal text-gray-400">
                            <th className="px-6 py-3 text-left">
                                Ime i prezime
                            </th>
                            <th className="px-6 py-3 text-left">Email</th>
                            <th className="px-6 py-3 text-left">Datum</th>
                            <th className="px-6 py-3 text-left">Vreme</th>
                            {loggedInUser?.role === "owner" && (
                                <th className="px-6 py-3 text-left">
                                    Otkaži rezervaciju
                                </th>
                            )}
                        </tr>
                    </thead>
                    {allReservations.length > 0 ? (
                        <tbody className="text-sm font-light text-gray-300">
                            {allReservations.map((reservation) => (
                                <tr
                                    key={reservation._id}
                                    className="border-b border-gray-700 hover:bg-gray-800"
                                >
                                    <td className="whitespace-nowrap px-6 py-3 text-left">
                                        {reservation.fullName}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-left">
                                        {reservation.email}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-left">
                                        {new Date(
                                            reservation.date,
                                        ).toLocaleDateString("sr-RS")}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-3 text-left">
                                        {reservation.time}
                                    </td>
                                    {loggedInUser?.role === "owner" && (
                                        <td className="whitespace-nowrap px-6 py-3 text-center">
                                            <form
                                                action={deleteReservation.bind(
                                                    null,
                                                    reservation._id.toString(),
                                                )}
                                            >
                                                <DiscardReservation
                                                    email={reservation.email}
                                                    vreme={reservation.time}
                                                    datum={reservation.date}
                                                />
                                            </form>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        <tbody className="text-sm font-light text-gray-300">
                            <tr className="border-b border-gray-700 hover:bg-gray-800">
                                <td
                                    className="whitespace-nowrap px-6 py-3 text-left"
                                    colSpan={4}
                                >
                                    Nema rezervacija.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </section>
    );
}
