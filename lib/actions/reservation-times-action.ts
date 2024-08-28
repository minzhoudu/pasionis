"use server";

import ReservationTime from "@/database/models/reservation-time";
import Settings from "@/database/models/settings";
import { revalidatePath } from "next/cache";

export const addReservationTime = async (
    formData: FormData,
): Promise<{ status: string }> => {
    const time = formData.get("time") as string;

    if (!time.trim()) {
        return { status: "error" };
    }

    const exists = await ReservationTime.findOne({ time });
    if (exists) {
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

export const removeReservationTime = async (formData: FormData) => {
    const time = formData.get("time") as string;

    if (!time.trim()) {
        return { status: "error" };
    }

    try {
        await ReservationTime.deleteOne({ time });
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

export const triggerWorkOnWeekend = async (
    working_on_saturday: boolean = false,
    working_on_sunday: boolean = false,
) => {
    const settings = await Settings.findOne({ type: "working-on-weekend" });
    if (!settings) {
        await Settings.create({
            type: "working-on-weekend",
            working_on_saturday,
            working_on_sunday,
        });
    }

    settings.working_on_saturday = working_on_saturday;
    settings.working_on_sunday = working_on_sunday;

    await settings.save();
    revalidatePath("/admin/dashboard/reservation-times");
};
