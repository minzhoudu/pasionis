"use client";

import dayjs from "dayjs";
import { toast } from "react-toastify";

type DiscardReservationProps = {
    email: string;
    vreme: string;
    datum: string;
};

export const DiscardReservation = ({
    email,
    vreme,
    datum,
}: DiscardReservationProps) => {
    return (
        <button
            className="border border-red-600 px-1 text-red-600"
            onClick={() =>
                toast.warn(
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p className="text-red-700">Otkazana rezervacija</p>
                        <p>{email}</p>
                        <p>Datum: {dayjs(datum).format("DD/MM/YYYY")}</p>
                        <p>Vreme: {vreme}</p>
                    </div>,
                    {
                        autoClose: false,
                        position: "top-center",
                    },
                )
            }
        >
            Otkaži
        </button>
    );
};
