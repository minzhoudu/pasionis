export const AdminForm = () => {
    return (
        <main className="my-12">
            <form
                action=""
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
                </div>

                <button className="hover rounded-lg border border-red-600 px-5 py-2 font-bold transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-black">
                    Uloguj se
                </button>
            </form>
        </main>
    );
};
