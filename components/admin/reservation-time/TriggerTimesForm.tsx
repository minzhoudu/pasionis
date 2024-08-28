import { triggerReservationTime } from "@/lib/actions/reservation-times-action";
import { ReservationTimeType } from "@/types";

type TriggerTimesFormProps = {
    times: ReservationTimeType[];
    role: "owner" | "admin";
};

export const TriggerTimesForm = ({ times, role }: TriggerTimesFormProps) => {
    return (
        <div className="max-h-52 min-w-72 overflow-y-scroll rounded-md border p-2 md:p-5">
            <form className="flex flex-wrap justify-center gap-7">
                {times.map((reservationTime) => (
                    <button
                        type={role === "owner" ? "submit" : "button"}
                        key={reservationTime._id.toString()}
                        className={`w-16 rounded-md border px-2 py-1 text-center text-sm font-bold lg:text-base ${!reservationTime.available ? "border-red-500 bg-red-500 opacity-50" : ""}`}
                        formAction={
                            role === "owner"
                                ? triggerReservationTime.bind(
                                      null,
                                      reservationTime._id.toString(),
                                  )
                                : undefined
                        }
                    >
                        <p>{reservationTime.time}</p>
                    </button>
                ))}
            </form>
        </div>
    );
};
