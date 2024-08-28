"use client";

import { deleteReservation } from "@/lib/actions/reservation-actions";
import { FilterType, ReservationType } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { FaCheck, FaRegClock } from "react-icons/fa";
import { AdminReservation, DiscardReservation } from "./components";
import { isPastReservation, showCheck } from "./helpers";
import { useGetFilteredReservations } from "./hooks/useGetFilteredReservations";

type ReservationsTableProps = {
    selectedFilter?: FilterType;
    reservations: ReservationType[];
    role?: "owner" | "admin" | "user";
};

export const ReservationsTable = ({
    selectedFilter,
    reservations,
    role,
}: ReservationsTableProps) => {
    const router = useRouter();
    const pathName = usePathname();

    const [reservationFilter, setReservationFilter] = useState<FilterType>(
        selectedFilter || "currentReservations",
    );

    const { filteredReservations } = useGetFilteredReservations(
        reservations,
        reservationFilter,
    );

    const handleFilterChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setReservationFilter(e.target.value as FilterType);
        router.push(`${pathName}?selectedFilter=${e.target.value}`, {});
    };

    return (
        <div>
            <select
                onChange={handleFilterChange}
                value={reservationFilter}
                name="reservationsFilter"
                className="mb-2 rounded-md bg-primary px-3 py-1 text-primary-foreground outline-none"
            >
                <option value="allReservations">Sve rezervacije</option>
                <option value="currentReservations">Danas</option>
                <option value="tomorrowReservations">Sutra</option>
                <option value="futureReservations">Narednih 7 dana</option>
            </select>

            <div className="max-h-72 max-w-80 overflow-y-auto overflow-x-scroll lg:max-w-full">
                <table className="min-w-full overflow-hidden rounded-lg bg-gray-900 shadow-md">
                    <thead>
                        <tr className="bg-gray-800 text-xs uppercase leading-normal text-gray-400 lg:text-sm">
                            <th className="px-4 py-2 text-left lg:px-6 lg:py-3">
                                Ime i prezime
                            </th>
                            <th className="px-4 py-2 text-left lg:px-6 lg:py-3">
                                Br.Telefona
                            </th>
                            <th className="px-4 py-2 text-left lg:px-6 lg:py-3">
                                Datum
                            </th>
                            <th className="px-4 py-2 text-left lg:px-6 lg:py-3">
                                Vreme
                            </th>
                            {showCheck(reservationFilter) && (
                                <th className="px-4 py-2 text-left lg:px-6 lg:py-3">
                                    Status
                                </th>
                            )}
                            {role === "owner" && (
                                <th className="px-4 py-2 text-left lg:px-6 lg:py-3">
                                    Otkaži
                                </th>
                            )}
                        </tr>
                    </thead>
                    {filteredReservations.length > 0 ? (
                        <tbody className="text-xs font-light text-gray-300 lg:text-sm">
                            {filteredReservations.map((reservation) => (
                                <tr
                                    key={reservation._id}
                                    className="border-b border-gray-700 hover:bg-gray-800"
                                >
                                    <td className="whitespace-nowrap px-4 py-2 text-left lg:px-6 lg:py-3">
                                        {reservation.fullName}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-left lg:px-6 lg:py-3">
                                        {reservation.phone}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-left lg:px-6 lg:py-3">
                                        {new Date(
                                            reservation.date,
                                        ).toLocaleDateString("sr-RS")}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-left lg:px-6 lg:py-3">
                                        {reservation.time}
                                    </td>
                                    {showCheck(reservationFilter) && (
                                        <td className="whitespace-nowrap px-4 py-2 text-center lg:px-6 lg:py-3">
                                            {isPastReservation(reservation) ? (
                                                <span className="text-green-500">
                                                    <FaCheck className="mx-auto" />
                                                </span>
                                            ) : (
                                                <span className="text-orange-500">
                                                    <FaRegClock className="mx-auto" />
                                                </span>
                                            )}
                                        </td>
                                    )}
                                    {role === "owner" && (
                                        <td className="whitespace-nowrap px-4 py-2 text-center lg:px-6 lg:py-3">
                                            <form
                                                action={deleteReservation.bind(
                                                    null,
                                                    reservation._id.toString(),
                                                )}
                                            >
                                                <DiscardReservation
                                                    fullName={
                                                        reservation.fullName
                                                    }
                                                    phone={reservation.phone}
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
                        <tbody className="text-xs font-light text-gray-300 lg:text-sm">
                            <tr className="border-b border-gray-700 hover:bg-gray-800">
                                <td
                                    className="whitespace-nowrap px-4 py-2 text-left lg:px-6 lg:py-3"
                                    colSpan={4}
                                >
                                    Nema rezervacija.
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

            <AdminReservation />
        </div>
    );
};
