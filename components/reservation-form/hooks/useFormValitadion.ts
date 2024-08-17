"use client";

import { useState } from "react";

type FormValidationProps = {
    fullName: string;
    email: string;
    date: string;
    time: string;
};

type FormValidation = {
    errors: FormValidationProps;
    validateFormInputs: () => boolean;
};

export const useFormValidation = ({
    fullName,
    email,
    date,
    time,
}: FormValidationProps): FormValidation => {
    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        date: "",
        time: "",
    });

    const validateFormInputs = () => {
        let isValid = true;

        if (!fullName.trim()) {
            isValid = false;
            setErrors((prev) => {
                return { ...prev, fullName: "Ime i prezime je obavezno" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, fullName: "" };
            });
        }

        if (!email.trim() || !email.includes("@")) {
            isValid = false;
            setErrors((prev) => {
                return { ...prev, email: "Email je obavezan" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, email: "" };
            });
        }

        if (!date) {
            isValid = false;
            setErrors((prev) => {
                return { ...prev, date: "Molim vas izaberite datum" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, date: "" };
            });
        }

        if (!time) {
            isValid = false;
            setErrors((prev) => {
                return { ...prev, time: "Molim vas izaberite termin" };
            });
        } else {
            setErrors((prev) => {
                return { ...prev, time: "" };
            });
        }

        return isValid;
    };

    return { errors, validateFormInputs };
};
