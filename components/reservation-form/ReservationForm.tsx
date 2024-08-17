"use client";

import { useMemo, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { RESERVATION_TIME_OPTIONS, RESERVATIONS } from "./mock";
import { useFormValidation } from "./hooks";

export const ReservationForm = () => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    const { errors, validateFormInputs } = useFormValidation({
        fullName,
        email,
        date,
        time,
    });

    //TODO This logic should be on the server
    const reservationTimes = useMemo(() => {
        return RESERVATION_TIME_OPTIONS.filter((time) => {
            return !RESERVATIONS.some(
                (reservation) =>
                    reservation.date === date && reservation.time === time,
            );
        });
    }, [date]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = validateFormInputs();

        if (!isValid) {
            return;
        }

        console.log("Form is valid");
    };

    return (
        <main className="my-12">
            <form
                className="flex w-[300px] flex-col items-center justify-center gap-8 lg:text-lg"
                onSubmit={handleSubmit}
            >
                <div className="w-full">
                    <label htmlFor="name">Ime i prezime</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="text"
                        id="name"
                        value={fullName}
                        placeholder="Vaše ime i prezime"
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.fullName}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="email"
                        id="email"
                        value={email}
                        placeholder="npr. email@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    <label htmlFor="date">Datum</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.date}
                        </p>
                    )}
                </div>

                {date && (
                    <div className="w-full">
                        <label htmlFor="time">Slobodni termini</label>
                        <Select
                            disabled={!date}
                            onValueChange={(value) => setTime(value)}
                            value={time}
                            required
                        >
                            <SelectTrigger className="mt-2 w-full font-bold text-black lg:text-lg">
                                <SelectValue placeholder="Izaberite vreme" />
                            </SelectTrigger>
                            <SelectContent>
                                {reservationTimes.map((time) => (
                                    <SelectItem value={time} key={time}>
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.time && (
                            <p className="mt-1 text-center text-sm text-red-600">
                                {errors.time}
                            </p>
                        )}
                    </div>
                )}

                <button className="hover rounded-lg border border-red-600 px-5 py-2 font-bold transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-black">
                    Rezerviši termin
                </button>
            </form>
        </main>
    );
};
