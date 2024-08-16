import { ReservationForm } from "@/components/reservation-form";

export default function ReservationPage() {
    return (
        <section className="flex h-screen w-full flex-col items-center justify-center">
            <h1 className="text-xl">Rezervišite termin</h1>

            <ReservationForm />
        </section>
    );
}
