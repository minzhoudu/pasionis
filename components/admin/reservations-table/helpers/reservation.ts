import { FilterType, ReservationType } from "@/types";
import dayjs from "dayjs";

export const showCheck = (reservationFilter: FilterType) => {
    return (
        reservationFilter === "currentReservations" ||
        reservationFilter === "allReservations"
    );
};

export const isPastReservation = (reservation: ReservationType) => {
    const today = dayjs();
    const reservationDate = dayjs(reservation.date);

    const [hours, minutes] = reservation.time.split(":");
    const reservationTime = reservationDate
        .hour(Number(hours))
        .minute(Number(minutes));

    return reservationTime.isBefore(today, "minute");
};
