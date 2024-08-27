import { ReservationError, ReservationType } from "@/types";

export const validateFormInputs = (formData: Partial<ReservationType>) => {
    const errors: ReservationError = {};

    if (!formData.fullName?.trim()) {
        errors.fullNameError = "Ime i prezime je obavezno";
    }

    if (!formData.phone?.trim()) {
        errors.phoneError = "Broj telefona je obavezan";
    }

    if (!formData.date?.trim()) {
        errors.dateError = "Unesite datum termina";
    }

    if (!formData.time?.trim()) {
        errors.timeError = "Unesite vreme termina";
    }

    return errors;
};
