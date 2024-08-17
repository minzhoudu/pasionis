import { sendReservation } from "@/lib/actions";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

import { RESERVATION_TIME_OPTIONS } from "./mock";

export const ReservationForm = () => {
    // //TODO This logic should be on the server
    // const reservationTimes = useMemo(() => {
    //     return RESERVATION_TIME_OPTIONS.filter((time) => {
    //         return !RESERVATIONS.some(
    //             (reservation) =>
    //                 reservation.date === date && reservation.time === time,
    //         );
    //     });
    // }, [date]);

    return (
        <main className="my-12">
            <form
                action={sendReservation}
                className="flex w-[300px] flex-col items-center justify-center gap-8 lg:text-lg"
            >
                <div className="w-full">
                    <label htmlFor="fullName">Ime i prezime</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="Vaše ime i prezime"
                    />
                    {/* {errors.fullName && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.fullName}
                        </p>
                    )} */}
                </div>

                <div className="w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="npr. email@gmail.com"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="date">Datum</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="date"
                        id="date"
                        name="date"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="time">Slobodni termini</label>
                    <Select name="time">
                        <SelectTrigger className="mt-2 w-full font-bold text-black lg:text-lg">
                            <SelectValue placeholder="Izaberite vreme" />
                        </SelectTrigger>
                        <SelectContent>
                            {RESERVATION_TIME_OPTIONS.map((time) => (
                                <SelectItem value={time} key={time}>
                                    {time}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <button className="hover rounded-lg border border-red-600 px-5 py-2 font-bold transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-black">
                    Rezerviši termin
                </button>
            </form>
        </main>
    );
};
