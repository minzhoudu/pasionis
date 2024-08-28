"use server";

import ReservationTime from "@/database/models/reservation-time";
import { revalidatePath } from "next/cache";

export const addReservationTime = async (
    formData: FormData,
): Promise<{ status: string }> => {
    const time = formData.get("time") as string;

    if (!time.trim()) {
        return { status: "error" };
    }

    try {
        await ReservationTime.create({ time });
        revalidatePath("/admin/dashboard/reservation-times");
        return { status: "success" };
    } catch (error) {
        return { status: "error" };
    }
};

export const triggerReservationTime = async (timeID: string) => {
    try {
        const reservationTime = await ReservationTime.findById(timeID);

        if (!reservationTime) {
            return {
                status: "error",
            };
        }

        reservationTime.available = !reservationTime.available;

        await reservationTime.save();
        revalidatePath("/admin/dashboard/reservation-times");
    } catch (error) {
        return {
            status: "error",
        };
    }
};
