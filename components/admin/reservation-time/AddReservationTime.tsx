"use client";

import { addReservationTime } from "@/lib/actions/reservation-times-action";
import { AddTimeButton } from "./components/add-time/AddTimeButton";

export const AddReservationTimeForm = () => {
    return (
        <form action={addReservationTime}>
            <div className="flex flex-col items-center gap-5">
                <label htmlFor="time" className="text-center">
                    Unesi vreme termina
                </label>
                <input
                    className="rounded-lg font-bold text-black lg:px-4 lg:py-2"
                    type="time"
                    id="time"
                    name="time"
                    step={1800}
                    required
                />

                <AddTimeButton />
            </div>
        </form>
    );
};
