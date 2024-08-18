import { AdminForm } from "@/components/admin-form";

export default function Admin() {
    return (
        <section className="flex h-screen w-full flex-col items-center justify-center">
            <header className="rounded-md border border-red-600 px-5 py-3 font-bold lg:text-3xl">
                <h1>Admin Login</h1>
            </header>

            <AdminForm />
        </section>
    );
}
