"use server";
import { redirect } from "next/navigation";

import Reservation from "@/database/models/reservation";
import ReservationTime from "@/database/models/reservation-time";
import {
    ReservationType,
    SendReservation,
    WorkingOnWeekendSetting,
} from "@/types";
import { revalidatePath } from "next/cache";
import { validateFormInputs } from "../validation";
import Settings from "@/database/models/settings";
import dayjs from "dayjs";

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

    const isSaturday = dayjs(reservation.date).day() === 6;
    const isSunday = dayjs(reservation.date).day() === 0;

    const settings = await Settings.findOne<WorkingOnWeekendSetting>({
        type: "working-on-weekend",
    });

    if (
        (isSaturday && !settings?.workingOnSaturday) ||
        (isSunday && !settings?.workingOnSunday)
    ) {
        return {
            message: "Frizerski studio ne radi ovog datuma",
            errors: {
                dateError: "Izaberite drugi datum",
            },
        };
    }

    await Reservation.create(reservation);

    redirect("/?reservationSuccess=true");
};

export const deleteReservation = async (id: string) => {
    await Reservation.findByIdAndDelete(id);
    revalidatePath("/admin/dashboard");
};

export const addAdminReservation = async (formData: FormData) => {
    const reservation = {
        fullName: "Admin",
        phone: "Admin",
        date: formData.get("date") as string,
        time: formData.get("time") as string,
    };

    if (!reservation.date || !reservation.time) {
        return;
    }

    const existingTime = await Reservation.findOne<ReservationType>({
        date: reservation.date,
        time: reservation.time,
    });

    if (existingTime) {
        return;
    }

    await Reservation.create(reservation);
    revalidatePath("/admin/dashboard");
};

export const isWorkingOnWeekend = async () => {
    const settings = await Settings.findOne({ type: "working-on-weekend" });

    return {
        workingOnSaturday: settings?.working_on_saturday,
        workingOnSunday: settings?.working_on_sunday,
    };
};
