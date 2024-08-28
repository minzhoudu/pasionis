import { triggerReservationTime } from "@/lib/actions/reservation-times-action";
import { ReservationTimeType } from "@/types";
import { Suspense } from "react";

type TriggerTimesFormProps = {
    times: ReservationTimeType[];
};

export const TriggerTimesForm = ({ times }: TriggerTimesFormProps) => {
    return (
        <form className="grid grid-cols-3 gap-7 self-center">
            {times.map((reservationTime) => (
                <button
                    key={reservationTime._id.toString()}
                    className={`rounded-md border px-2 py-1 text-center font-bold ${!reservationTime.available ? "border-red-500 bg-red-500 opacity-50" : ""}`}
                    formAction={triggerReservationTime.bind(
                        null,
                        reservationTime._id.toString(),
                    )}
                >
                    <p>{reservationTime.time}</p>
                </button>
            ))}
        </form>
    );
};
