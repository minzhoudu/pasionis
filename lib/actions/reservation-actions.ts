"use server";
import { redirect } from "next/navigation";

import Reservation from "@/database/models/reservation";
import ReservationTime from "@/database/models/reservation-time";
import { ReservationType, SendReservation } from "@/types";
import { revalidatePath } from "next/cache";
import { validateFormInputs } from "../validation";

export const getAllReservations = async (): Promise<ReservationType[]> => {
    const dbReservations = await Reservation.find<ReservationType>();

    return dbReservations.map((reservation) => {
        return {
            _id: reservation._id.toString(),
            fullName: reservation.fullName,
            phone: reservation.phone,
            date: reservation.date,
            time: reservation.time,
        };
    });
};

export const getAvailableTimes = async (date: string) => {
    try {
        const allReservations = await Reservation.find({ date });
        const reservationTimes = await ReservationTime.find().sort({ time: 1 });

        const availableTimes = reservationTimes
            .filter((resTime) => {
                if (!resTime.available) return false;

                return !allReservations.some(
                    (reservation) =>
                        reservation.date === date &&
                        reservation.time === resTime.time,
                );
            })
            .map((resTime) => resTime.time);

        return availableTimes;
    } catch (error) {
        return [];
    }
};

export const sendReservation = async (
    previousState: SendReservation,
    formData: FormData,
): Promise<SendReservation> => {
    const reservation = {
        fullName: formData.get("fullName") as string,
        phone: formData.get("phone") as string,
        date: formData.get("date") as string,
        time: formData.get("time") as string,
    };

    const { fullNameError, phoneError, dateError, timeError } =
        validateFormInputs(reservation);

    if (fullNameError || phoneError || dateError || timeError) {
        return {
            message: "Molimo Vas da popunite sva polja",
            errors: {
                fullNameError,
                phoneError,
                dateError,
                timeError,
            },
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

    // revalidatePath("/reservation");

    redirect("/?reservationSuccess=true");
};

export const deleteReservation = async (id: string) => {
    await Reservation.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard", "layout");
};
