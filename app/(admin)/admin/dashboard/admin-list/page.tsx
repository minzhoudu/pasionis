import { DeleteAdmin } from "@/components/admin/admin-form/components/delete-admin/DeleteAdmin";
import { getAdminUsers } from "@/database/queries/users";
import { createAdminUser, removeAdminUser } from "@/lib/actions/user-actions";

export default async function AdminListPage() {
    const admins = await getAdminUsers();

    return (
        <div className="flex flex-col">
            <h1 className="self-center rounded-md border-b border-red-700 px-5 py-3 text-center font-bold lg:text-xl">
                LISTA ADMINA
            </h1>

            <div className="my-10 max-h-72 overflow-y-scroll rounded-md lg:w-[500px]">
                <table className="min-w-full rounded-lg bg-gray-900 shadow-md">
                    <thead>
                        <tr className="bg-gray-800 text-sm uppercase leading-normal text-gray-400">
                            <th className="border border-gray-800 px-4 py-2 text-left lg:px-6 lg:py-3">
                                Email
                            </th>
                            <th className="px-4 py-2 text-center lg:px-6 lg:py-3">
                                Ukloni
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-xs font-light text-gray-300 lg:text-sm">
                        {admins.map((admin) => (
                            <tr
                                key={admin._id}
                                className="border-b border-gray-700 hover:bg-gray-800"
                            >
                                <td className="whitespace-nowrap border border-gray-800 px-4 py-2 text-left lg:px-6 lg:py-3">
                                    {admin.email}
                                </td>
                                <td className="whitespace-nowrap border border-gray-800 px-4 py-2 text-center lg:px-6 lg:py-3">
                                    <form
                                        action={removeAdminUser.bind(
                                            null,
                                            admin._id.toString(),
                                        )}
                                    >
                                        <DeleteAdmin email={admin.email} />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <form
                action={createAdminUser}
                className="flex w-full flex-col gap-5"
            >
                <h1 className="self-center rounded-md border-b border-red-700 px-5 py-3 text-center">
                    Dodaj novog admina
                </h1>
                <div className="mx-auto w-2/3">
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
                <div className="mx-auto w-2/3">
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
                <button className="self-center rounded-md border border-red-700 px-3 py-2 text-center text-xs uppercase transition duration-500 hover:border-primary-foreground hover:bg-primary-foreground hover:text-primary lg:text-base">
                    Dodaj novog admina
                </button>
            </form>
        </div>
    );
}
