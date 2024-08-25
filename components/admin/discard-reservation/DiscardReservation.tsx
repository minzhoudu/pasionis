"use client";

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
                toast.info(
                    <div>
                        <p>Otkazana rezervacija za:</p>
                        <p className="mb-2">{email}</p>
                        <p>
                            Datum: {new Date(datum).toLocaleDateString("sr-RS")}
                        </p>
                        <p>Vreme: {vreme}</p>
                    </div>,
                    {
                        autoClose: false,
                    },
                )
            }
        >
            Otkaži
        </button>
    );
};
