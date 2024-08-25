import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
    title: "Frizerski Studio Pasionis",
    description: "Muški frizerski studio Pasionis, Kruševac. Kosovska 1.",
};

const font = Montserrat({ subsets: ["latin"], weight: "400" });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Navbar />
                <main className="h-screen bg-black text-primary-foreground">
                    {children}
                    <ToastContainer />
                </main>
            </body>
        </html>
    );
}
