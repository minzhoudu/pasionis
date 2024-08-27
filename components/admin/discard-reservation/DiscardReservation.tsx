"use client";

import dayjs from "dayjs";
import { toast } from "react-toastify";

type DiscardReservationProps = {
    fullName: string;
    phone: string;
    vreme: string;
    datum: string;
};

export const DiscardReservation = ({
    fullName,
    phone,
    vreme,
    datum,
}: DiscardReservationProps) => {
    return (
        <button
            className="border border-red-600 px-1 text-red-600"
            onClick={() =>
                toast.warn(
                    <div className="flex flex-col items-center justify-center gap-2 text-primary">
                        <p className="text-red-700">Otkazana rezervacija</p>
                        <p>Ime: {fullName}</p>
                        <p>Br.Telefona: {phone}</p>
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
