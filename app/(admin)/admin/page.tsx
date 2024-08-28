import { AdminForm } from "@/components/admin/admin-form";
import { checkAuth } from "@/lib/actions/auth-actions";

export default async function Admin({}) {
    const isAuthenticated = await checkAuth();

    return (
        <section className="flex h-screen w-full flex-col items-center justify-center">
            <header className="rounded-md border border-red-600 px-5 py-3 font-bold lg:text-3xl">
                <h1>Uloguj Se</h1>
            </header>

            <AdminForm isAuthenticated={isAuthenticated} />
        </section>
    );
}
