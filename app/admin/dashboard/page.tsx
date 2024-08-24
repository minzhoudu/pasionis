import { AdminForm } from "@/components/admin-form";
import { checkAuth } from "@/lib/actions/auth-actions";

export default async function AdminDashboard() {
    return (
        <section className="flex h-screen w-full flex-col items-center justify-center">
            <h1>ADMIN DASHBOARD</h1>
        </section>
    );
}
