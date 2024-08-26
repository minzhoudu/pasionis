import { HomepageToast } from "@/components/home/homepage-toast";
import Link from "next/link";

import { FaInstagram } from "react-icons/fa";
import { toast } from "react-toastify";

type HomeProps = {
    searchParams: {
        reservationSuccess: "true" | "false";
    };
};

export default function Home({
    searchParams: { reservationSuccess },
}: HomeProps) {
    return (
        <section className="flex h-screen w-full flex-col items-center justify-center gap-3">
            <HomepageToast reservationSuccess={reservationSuccess} />

            <h1 className="text-5xl tracking-wider">
                Frizerski Studio{" "}
                <span className="rounded-md border border-red-600 px-3">
                    PASIONIS
                </span>
            </h1>
            <p className="rounded-sm border-b border-red-600 px-2 text-lg">
                Muški Frizerski Studio
            </p>

            <Link
                href="/reservation"
                className="absolute bottom-32 rounded-lg border border-red-600 px-5 py-2 text-lg font-semibold uppercase transition duration-700 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
                Zakažite termin
            </Link>

            <footer className="absolute bottom-5">
                <Link
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="flex gap-5 text-primary-foreground transition duration-300 hover:text-red-600"
                >
                    <FaInstagram size={30} />
                </Link>
            </footer>
        </section>
    );
}
