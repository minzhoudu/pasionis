export type ReservationError = {
    fullNameError?: string;
    emailError?: string;
    dateError?: string;
    timeError?: string;
};

export type ReservationType = {
    _id: string;
    fullName: string;
    email: string;
    date: string;
    time: string;
};

export type SendReservation = {
    status?: "success" | "error";
    message?: string;
    errors?: ReservationError | null;
};
