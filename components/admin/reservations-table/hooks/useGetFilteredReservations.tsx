import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { ReservationType } from "@/types";

export type FilterType =
    | "allReservations"
    | "currentReservations"
    | "futureReservations"
    | "pastReservations";

type UseGetFilteredReservations = {
    filteredReservations: ReservationType[];
};

export const useGetFilteredReservations = (
    allReservations: ReservationType[],
    filter: FilterType,
): UseGetFilteredReservations => {
    const [filteredReservations, setReservations] = useState<ReservationType[]>(
        [],
    );

    useEffect(() => {
        if (filter === "currentReservations") {
            const filteredReservations = allReservations.filter(
                (reservation) => {
                    const today = dayjs();
                    const reservationDate = dayjs(reservation.date);

                    return reservationDate.isSame(today, "day");
                },
            );

            setReservations(filteredReservations);
            return;
        }

        if (filter === "futureReservations") {
            const filteredReservations = allReservations.filter(
                (reservation) => {
                    const today = dayjs();
                    const sevenDaysFromNow = today.add(7, "day");
                    const reservationDate = dayjs(reservation.date);

                    return (
                        reservationDate.isAfter(dayjs(), "day") &&
                        reservationDate.isBefore(sevenDaysFromNow, "day")
                    );
                },
            );

            setReservations(filteredReservations);
            return;
        }

        if (filter === "pastReservations") {
            const filteredReservations = allReservations.filter(
                (reservation) => {
                    const reservationDate = dayjs(reservation.date);

                    return dayjs(reservationDate).isBefore(dayjs(), "day");
                },
            );

            setReservations(filteredReservations);
            return;
        }

        setReservations(allReservations);
    }, [filter, allReservations]);

    const sortedFilteredReervations = filteredReservations.sort((a, b) => {
        const dateA = dayjs(a.date);
        const dateB = dayjs(b.date);

        if (dateA.isBefore(dateB)) {
            return -1;
        }

        if (dateA.isAfter(dateB)) {
            return 1;
        }

        if (dateA.isSame(dateB, "day")) {
            if (a.time < b.time) {
                return -1;
            }

            if (a.time > b.time) {
                return 1;
            }
        }

        return 0;
    });

    return { filteredReservations: sortedFilteredReervations };
};
