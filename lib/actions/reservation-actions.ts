"use server";
import { redirect } from "next/navigation";

import { RESERVATION_TIME_OPTIONS } from "@/components/reservation-form";
import Reservation from "@/database/models/reservation";
import { ReservationType, SendReservation } from "@/types";
import { validateFormInputs } from "../validation";
import { revalidatePath } from "next/cache";

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
