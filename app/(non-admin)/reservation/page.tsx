import { ReservationForm } from "@/components/reservation-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Frizerski Studio Pasionis | Rezervacije",
    description:
        "Ne čekajte na red, rezervišite vaš termin u frizerskom studiju Pasionis već danas.",
};

export default function ReservationPage() {
    return (
        <section className="flex h-screen w-full flex-col items-center justify-center">
            <header className="rounded-md border border-red-600 px-5 py-3 font-bold lg:text-3xl">
                <h1>Rezervišite vaš termin</h1>
            </header>

            <ReservationForm />
        </section>
    );
}
