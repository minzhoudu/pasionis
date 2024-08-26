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
        <main className="flex h-screen flex-row items-center">
            <div className="flex w-[20%] flex-col border-r text-center uppercase">
                <AdminNav userRole={currentUser?.role} />
                <form className="absolute bottom-10 left-10" action={logout}>
                    <button className="rounded-md border border-red-600 px-3 py-1 transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        Izloguj se
                    </button>
                </form>
            </div>

            <div className="flex flex-grow justify-center">{children}</div>
        </main>
    );
}
