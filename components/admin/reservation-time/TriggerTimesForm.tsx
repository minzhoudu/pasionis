import { triggerReservationTime } from "@/lib/actions/reservation-times-action";
import { ReservationTimeType } from "@/types";
import { Suspense } from "react";

type TriggerTimesFormProps = {
    times: ReservationTimeType[];
};

export const TriggerTimesForm = ({ times }: TriggerTimesFormProps) => {
    return (
        <div className="max-h-52 overflow-y-scroll rounded-md border p-2 md:p-5">
            <form className="flex flex-wrap justify-center gap-7">
                {times.map((reservationTime) => (
                    <button
                        key={reservationTime._id.toString()}
                        className={`w-16 rounded-md border px-2 py-1 text-center text-sm font-bold lg:text-base ${!reservationTime.available ? "border-red-500 bg-red-500 opacity-50" : ""}`}
                        formAction={triggerReservationTime.bind(
                            null,
                            reservationTime._id.toString(),
                        )}
                    >
                        <p>{reservationTime.time}</p>
                    </button>
                ))}
            </form>
        </div>
    );
};
