"use client";

import { toast } from "react-toastify";

type DeleteAdminProps = {
    email: string;
};

export const DeleteAdmin = ({ email }: DeleteAdminProps) => {
    const handleClick = () => {
        toast.warn(`Admin ${email} je obrisan`, {
            position: "top-center",
            draggable: true,
            autoClose: 5000,
        });
    };

    return (
        <button
            onClick={handleClick}
            className="border border-red-700 px-2 py-1 text-red-700"
        >
            Obriši
        </button>
    );
};
