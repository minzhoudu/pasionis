"use client";

import "flatpickr/dist/flatpickr.min.css";
import { useFormState } from "react-dom";
import Flatpickr from "react-flatpickr";

import {
    getAvailableTimes,
    sendReservation,
} from "@/lib/actions/reservation-actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import dayjs, { locale } from "dayjs";
import { useState } from "react";
import { Button } from "./submit-button";

export const ReservationForm = () => {
    const [loadingTimes, setLoadingTimes] = useState(false);

    const [timeOptions, setTimeOptions] = useState<string[]>([]);

    const getTimeOptions = async (date: string) => {
        setLoadingTimes(true);
        const times = await getAvailableTimes(date);
        setTimeOptions(times);
        setLoadingTimes(false);
    };

    const [{ message, errors }, formAction] = useFormState(sendReservation, {
        message: "",
        errors: null,
    });

    return (
        <main className="my-12">
            <form
                action={formAction}
                className="flex w-[300px] flex-col items-center justify-center gap-8 lg:text-lg"
            >
                <div className="w-full">
                    <label htmlFor="fullName">Ime i prezime</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Vaše ime i prezime"
                        required
                    />
                    {errors?.fullNameError && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.fullNameError}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="npr. email@gmail.com"
                        required
                    />
                    {errors?.emailError && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.emailError}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label htmlFor="date">Datum</label>
                    <Flatpickr
                        name="date"
                        id="date"
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        placeholder="Izaberite datum"
                        options={{
                            minDate: dayjs().format(),
                            maxDate: dayjs().add(7, "day").format(),
                            disable: [
                                function (date) {
                                    return (
                                        date.getDay() === 0 ||
                                        date.getDay() === 6
                                    );
                                },
                            ],
                            locale: {
                                firstDayOfWeek: 1,
                            },
                            onChange: ([date]) =>
                                getTimeOptions(
                                    dayjs(date).format("YYYY-MM-DD"),
                                ),
                        }}
                        required
                    />

                    {errors?.dateError && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.dateError}
                        </p>
                    )}
                </div>
                {!loadingTimes && timeOptions.length > 0 && (
                    <div className="w-full">
                        <label htmlFor="time">Slobodni termini</label>
                        <Select name="time">
                            <SelectTrigger className="mt-2 w-full font-bold text-black lg:text-lg">
                                <SelectValue placeholder="Izaberite vreme" />
                            </SelectTrigger>
                            <SelectContent>
                                {timeOptions.map((time) => (
                                    <SelectItem value={time} key={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors?.timeError && (
                            <p className="mt-1 text-center text-sm text-red-600">
                                {errors.timeError}
                            </p>
                        )}
                    </div>
                )}
                {loadingTimes && (
                    <h3 className="animate-pulse text-xs">
                        Učitavaju se termini...
                    </h3>
                )}
                {message && (
                    <p className="mt-1 text-center text-sm text-red-600">
                        {message}
                    </p>
                )}
                <Button>Rezerviši termin</Button>
            </form>
        </main>
    );
};
