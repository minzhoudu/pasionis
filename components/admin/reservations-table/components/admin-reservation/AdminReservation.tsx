"use client";

import dayjs from "dayjs";
import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { getAvailableTimes } from "@/lib/actions/reservation-actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AddTimeButton } from "./AddReservation";

export const AdminReservation = async () => {
    const [loadingTimes, setLoadingTimes] = useState(false);
    const [timeOptions, setTimeOptions] = useState<string[]>([]);

    const getTimeOptions = async (date: string) => {
        setLoadingTimes(true);
        const times = await getAvailableTimes(date);
        setTimeOptions(times);
        setLoadingTimes(false);
    };

    return (
        <form className="mx-auto mt-10 flex max-w-40 flex-col gap-5">
            <div className="flex flex-col items-center justify-center">
                <label htmlFor="date">Datum</label>
                <Flatpickr
                    name="date"
                    id="date"
                    className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                    placeholder="Izaberi datum"
                    options={{
                        minDate: dayjs().format(),
                        maxDate: dayjs().add(7, "day").format(),
                        locale: {
                            firstDayOfWeek: 1,
                        },
                        onChange: ([date]) =>
                            getTimeOptions(dayjs(date).format("YYYY-MM-DD")),
                    }}
                />
            </div>
            {!loadingTimes && timeOptions.length > 0 && (
                <div className="flex flex-col items-center justify-center">
                    <label htmlFor="time">Slobodni termini</label>
                    <Select name="time">
                        <SelectTrigger className="mt-2 w-full font-bold text-black lg:text-lg">
                            <SelectValue placeholder="vreme" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeOptions.map((time) => (
                                <SelectItem value={time} key={time}>
                                    {time}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <AddTimeButton />
        </form>
    );
};
