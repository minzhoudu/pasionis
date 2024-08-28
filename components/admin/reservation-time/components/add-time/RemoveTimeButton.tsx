"use client";

import { removeReservationTime } from "@/lib/actions/reservation-times-action";
import { useFormStatus } from "react-dom";

export const RemoveTimeButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            formAction={removeReservationTime}
            className={`rounded-md border border-red-700 px-3 py-1 transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary ${pending ? "animate-pulse" : ""}`}
        >
            {pending ? "Brisanje..." : "Obriši"}
        </button>
    );
};
