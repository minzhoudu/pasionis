"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Navbar.module.css";

const classes = "rounded-lg px-3 py-2 uppercase";

const links = [
    { id: 1, href: "/", text: "Početna" },
    { id: 2, href: "/prices", text: "Cene" },
    { id: 3, href: "/contact", text: "Kontakt" },
];

export const Navbar = () => {
    const path = usePathname();

    return (
        <nav className="absolute w-full text-primary-foreground">
            <div className="mx-10 flex h-32 items-center justify-between lg:text-2xl">
                <div>
                    <Link href="/">PASIONIS LOGO</Link>
                </div>

                <ul className="flex gap-5">
                    {links.map((link) => {
                        return (
                            <li key={link.id}>
                                <Link
                                    href={link.href}
                                    className={`${classes} ${path === link.href ? styles.active : styles["border-slide"]}`}
                                >
                                    {link.text}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};
