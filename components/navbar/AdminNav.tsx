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
                className={`py-10 ${path === "/admin/dashboard" ? styles.active : styles["border-slide"]}`}
            >
                Rezervacije
            </Link>
            <Link
                href="/admin/dashboard/reservation-times"
                className={`py-10 ${path === "/admin/dashboard/reservation-times" ? styles.active : styles["border-slide"]}`}
            >
                Termini
            </Link>
            {userRole && userRole === "owner" && (
                <Link
                    href="/admin/dashboard/admins"
                    className={`py-10 ${path === "/admin/dashboard/admins" ? styles.active : styles["border-slide"]}`}
                >
                    Admini
                </Link>
            )}
        </>
    );
};
