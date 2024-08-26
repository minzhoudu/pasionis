"use client";

import { usePathname } from "next/navigation";

import styles from "./Navbar.module.css";
import Link from "next/link";

type AdminNavProps = {
    userRole?: "owner" | "admin" | "user";
};

export const AdminNav = ({ userRole }: AdminNavProps) => {
    const path = usePathname();

    return (
        <>
            <Link
                href="/admin/dashboard"
                className={`py-10 ${path === "/admin/dashboard" ? "text-red-700" : "text-primary-foreground"}`}
            >
                Rezervacije
            </Link>
            <Link
                href="/admin/dashboard/reservation-times"
                className={`py-10 ${path === "/admin/dashboard/reservation-times" ? "text-red-700" : "text-primary-foreground"}`}
            >
                Termini
            </Link>
            {userRole && userRole === "owner" && (
                <Link
                    href="/admin/dashboard/admin-list"
                    className={`py-10 ${path === "/admin/dashboard/admin-list" ? "text-red-700" : "text-primary-foreground"}`}
                >
                    Admini
                </Link>
            )}
        </>
    );
};
