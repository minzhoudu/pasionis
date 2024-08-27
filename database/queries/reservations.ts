import dayjs from "dayjs";

import ReservationTime from "../models/reservation-time";

export const getAllReservationTimes = async () => {
    return await ReservationTime.find().sort({ time: 1 });
};
