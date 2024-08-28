"use client";

import { addReservationTime } from "@/lib/actions/reservation-times-action";
import { useFormStatus } from "react-dom";

export const AddTimeButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            formAction={addReservationTime}
            className={`rounded-md border border-red-700 px-3 py-1 transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary ${pending ? "animate-pulse" : ""}`}
        >
            {pending ? "Dodavanje..." : "Dodaj"}
        </button>
    );
};
