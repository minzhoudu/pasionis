import { AdminNav } from "@/components/navbar";
import { getLoggedinUser } from "@/database/queries/users";
import { checkAuth, logout } from "@/lib/actions/auth-actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Pasionis | Admin Panel",
    description: "Admin panel studija Pasionis.",
};

export default async function AdminDashbordLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isAuthorized = await checkAuth();
    if (!isAuthorized) {
        redirect("/admin");
    }

    const currentUser = await getLoggedinUser();

    return (
        <main className="flex h-screen flex-col items-center lg:flex-row">
            <div className="flex w-[20%] justify-center gap-10 text-center uppercase lg:flex-col lg:gap-0 lg:border-r">
                <AdminNav userRole={currentUser?.role} />

                <form
                    className="absolute bottom-10 hidden lg:left-10 lg:block"
                    action={logout}
                >
                    <button className="rounded-md border border-red-600 px-3 py-1 transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Izloguj se
                    </button>
                </form>
            </div>

            <div className="flex w-1/2 justify-center lg:flex-grow">
                {children}
            </div>
        </main>
    );
}
