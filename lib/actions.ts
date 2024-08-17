"use server";

import Reservation from "@/database/models/reservation";
import connectDB from "@/database/mongodb";

type Reservation = {
    fullName: string;
    email: string;
    date: string;
    time: string;
};

export const getAllReservations = async (): Promise<Reservation[]> => {
    await connectDB();

    return await Reservation.find();
};

export const sendReservation = async (formData: FormData) => {
    await connectDB();
    const reservation = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        date: formData.get("date"),
        time: formData.get("time"),
    };

    const existingReservations = await Reservation.findOne<Reservation>({
        date: reservation.date,
        time: reservation.time,
    });

    if (existingReservations) {
        return "Već postoji rezervacija za taj termin";
    }

    await Reservation.create(reservation);

    return "Uspešna rezervacija";
};
