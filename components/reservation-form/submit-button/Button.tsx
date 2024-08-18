"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type ButtonProps = {
    children: ReactNode;
};

export const Button = ({ children }: ButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            className="hover rounded-lg border border-red-600 px-5 py-2 font-bold transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-black"
        >
            {pending ? "Rezervacija u toku..." : children}
        </button>
    );
};
