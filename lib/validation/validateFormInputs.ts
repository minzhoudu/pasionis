import { ReservationError, ReservationType } from "@/types";

export const validateFormInputs = (formData: Partial<ReservationType>) => {
    const errors: ReservationError = {};

    if (!formData.fullName) {
        errors.fullNameError = "Ime i prezime je obavezno";
    }

    if (!formData.email || !formData.email.includes("@")) {
        errors.emailError = "Email je obavezan";
    }

    if (!formData.date) {
        errors.dateError = "Unesite datum termina";
    }

    if (!formData.time) {
        errors.timeError = "Unesite vreme termina";
    }

    return errors;
};
