"use server";
import { redirect } from "next/navigation";

import Reservation from "@/database/models/reservation";
import connectDB from "@/database/mongodb";
import { ReservationType, SendReservation } from "@/types";
import { validateFormInputs } from "./validation";
import { RESERVATION_TIME_OPTIONS } from "@/components/reservation-form";

export const getAllReservations = async (): Promise<ReservationType[]> => {
    await connectDB();

    return await Reservation.find();
};

export const getAvailableTimes = async (date: string) => {
    try {
        await connectDB();
        const allReservations = await Reservation.find({ date });

        return RESERVATION_TIME_OPTIONS.filter((time) => {
            return !allReservations.some(
                (reservation) =>
                    reservation.date === date && reservation.time === time,
            );
        });
    } catch (error) {
        return [];
    }
};

export const sendReservation = async (
    previousState: SendReservation,
    formData: FormData,
): Promise<SendReservation> => {
    await connectDB();

    const reservation = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
    };

    const { fullNameError, emailError, dateError, timeError } =
        validateFormInputs(reservation);

    if (fullNameError || emailError || dateError || timeError) {
        return {
            message: "Molimo Vas da popunite sva polja",
            errors: {
                fullNameError,
                emailError,
                dateError,
                timeError,
            },
        };
    }

    const existingReservationByUser =
        await Reservation.findOne<ReservationType>({
            email: reservation.email,
            date: reservation.date,
        });

    if (existingReservationByUser) {
        return {
            message: "Već ste rezervisali termin za izabrani datum",
            errors: null,
        };
    }

    const existingTime = await Reservation.findOne<ReservationType>({
        date: reservation.date,
        time: reservation.time,
    });

    if (existingTime) {
        return {
            message: "Već postoji rezervacija za izabrani datum i vreme",
            errors: {
                timeError: "Izaberite drugo vreme",
            },
        };
    }

    await Reservation.create(reservation);

    redirect("/");
};
