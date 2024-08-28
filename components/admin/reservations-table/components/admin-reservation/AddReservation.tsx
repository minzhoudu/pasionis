"use client";

import { addAdminReservation } from "@/lib/actions/reservation-actions";
import { useFormStatus } from "react-dom";

export const AddTimeButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            formAction={addAdminReservation}
            className={`rounded-md border border-red-700 px-3 py-1 transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary ${pending ? "animate-pulse" : ""}`}
        >
            {pending ? "Dodavanje..." : "Dodaj"}
        </button>
    );
};
