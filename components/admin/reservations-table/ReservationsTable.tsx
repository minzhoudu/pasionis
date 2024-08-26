"use client";

import { deleteReservation } from "@/lib/actions/reservation-actions";
import { ReservationType } from "@/types";
import { ChangeEvent, Suspense, useState } from "react";
import { DiscardReservation } from "../discard-reservation/DiscardReservation";
import {
    FilterType,
    useGetFilteredReservations,
} from "./hooks/useGetFilteredReservations";
import { usePathname, useRouter } from "next/navigation";

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
                <option value="currentReservations">
                    Današnje rezervacije
                </option>
                <option value="futureReservations">Narednih 7 dana</option>
                <option value="pastReservations">Prethodne rezervacije</option>
            </select>

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
                            {role === "owner" && (
                                <th className="px-6 py-3 text-left">
                                    Otkaži rezervaciju
                                </th>
                            )}
                        </tr>
                    </thead>
                    {filteredReservations.length > 0 ? (
                        <tbody className="text-sm font-light text-gray-300">
                            {filteredReservations.map((reservation) => (
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
                                    {role === "owner" && (
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
        </div>
    );
};
