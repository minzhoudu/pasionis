import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import "../../globals.css";

export const metadata: Metadata = {
    title: "Frizerski Studio Pasionis",
    description: "Muški frizerski studio Pasionis, Kruševac. Kosovska 1.",
};

const font = Montserrat({ subsets: ["latin"], weight: "400" });

type AdminLayoutProps = {
    children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <html lang="en">
            <body className={`${font.className}`}>
                <main className="h-screen bg-black text-primary-foreground">
                    {children}
                </main>
            </body>
        </html>
    );
}
