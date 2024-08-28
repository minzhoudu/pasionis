import { ReservationTimeType } from "@/types";
import ReservationTime from "../models/reservation-time";

export const getAllReservationTimes = async (): Promise<
    ReservationTimeType[]
> => {
    return await ReservationTime.find().sort({ time: 1 });
};
