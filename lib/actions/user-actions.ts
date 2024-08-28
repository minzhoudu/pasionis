"use server";

import bcrypt from "bcrypt";

import { removeUser } from "@/database/queries/users";
import { revalidatePath } from "next/cache";
import User from "@/database/models/user";

export const removeAdminUser = async (userId: string) => {
    await removeUser(userId);

    revalidatePath("/admin/dashboard/admin-list");
};

export const createAdminUser = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const exists = await User.exists({ email });

    if (exists) {
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ email, password: hashedPassword });

    revalidatePath("/admin/dashboard/admin-list");
};
