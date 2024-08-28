"use client";

import { removeReservationTime } from "@/lib/actions/reservation-times-action";
import { useState } from "react";
import { useFormStatus } from "react-dom";

export const RemoveTimeButton = () => {
    const [clicked, setClicked] = useState(false);
    const { pending } = useFormStatus();

    return (
        <button
            formAction={removeReservationTime}
            onClick={() => setClicked(true)}
            className={`rounded-md border border-red-700 px-3 py-1 transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary disabled:opacity-50 ${pending ? "animate-pulse" : ""}`}
            disabled={pending}
        >
            Obriši
        </button>
    );
};
