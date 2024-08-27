export type ReservationError = {
    fullNameError?: string;
    phoneError?: string;
    dateError?: string;
    timeError?: string;
};

export type ReservationType = {
    _id: string;
    fullName: string;
    phone: string;
    date: string;
    time: string;
};

export type SendReservation = {
    message?: string;
    errors?: ReservationError | null;
};

export type FilterType =
    | "allReservations"
    | "currentReservations"
    | "futureReservations"
    | "pastReservations";
