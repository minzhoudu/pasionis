"use client";

import { AddTimeButton } from "./components/add-time/AddTimeButton";
import { RemoveTimeButton } from "./components/add-time/RemoveTimeButton";

export const AddReservationTimeForm = () => {
    return (
        <form>
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

                <div className="flex gap-5">
                    <AddTimeButton />
                    <RemoveTimeButton />
                </div>
            </div>
        </form>
    );
};
