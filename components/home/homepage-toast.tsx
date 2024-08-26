"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type HomepageToastProps = {
    reservationSuccess: "true" | "false";
};

export const HomepageToast = ({ reservationSuccess }: HomepageToastProps) => {
    const router = useRouter();

    if (reservationSuccess === "true") {
        router.replace("/", undefined);

        toast.success("Uspešno ste rezervisali termin", {
            position: "top-center",
            toastId: "reservation-success",
        });
    }

    return <></>;
};
