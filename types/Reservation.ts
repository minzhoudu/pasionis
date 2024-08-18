export type ReservationError = {
    fullNameError?: string;
    emailError?: string;
    dateError?: string;
    timeError?: string;
};

export type ReservationType = {
    fullName: string;
    email: string;
    date: string;
    time: string;
};

export type SendReservation = {
    message: string;
    errors: ReservationError | null;
};