"use client";

import { login } from "@/lib/actions/auth-actions";
import { redirect } from "next/navigation";
import { useFormState } from "react-dom";

type AdminFormProps = {
    isAuthenticated?: boolean;
};

export const AdminForm = ({ isAuthenticated }: AdminFormProps) => {
    const [{ errors }, formAction] = useFormState(login, {});

    if (isAuthenticated) {
        redirect("/admin/dashboard");
    }

    return (
        <main className="my-12">
            <form
                action={formAction}
                className="flex w-[300px] flex-col items-center justify-center gap-8 lg:text-lg"
            >
                <div className="w-full">
                    <label htmlFor="email">Email</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Unesi email adresu"
                        required
                    />
                    {errors?.email && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div className="w-full">
                    <label htmlFor="password">Lozinka</label>
                    <input
                        className="mt-2 block w-full rounded-lg px-2 py-1 font-bold text-black lg:px-4 lg:py-2"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Unesi lozinku"
                        required
                    />
                    {errors?.password && (
                        <p className="mt-1 text-center text-sm text-red-600">
                            {errors.password}
                        </p>
                    )}
                </div>

                <button className="hover rounded-lg border border-red-600 px-5 py-2 font-bold transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-black">
                    Uloguj se
                </button>

                {errors?.general && (
                    <p className="mt-1 text-center text-lg text-red-600">
                        {errors.general}
                    </p>
                )}
            </form>
        </main>
    );
};
