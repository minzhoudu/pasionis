"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "@/database/models/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type ActionState = {
    errors?: {
        email?: string;
        password?: string;
        general?: string;
    };
};

export const login = async (
    _prevState: ActionState,
    formData: FormData,
): Promise<ActionState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return {
                errors: {
                    general: "Niste uneli validne podatke.",
                },
            };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return {
                errors: {
                    general: "Niste uneli validne podatke.",
                },
            };
        }

        const jsonWebToken = jwt.sign({ email }, process.env.JWT_SECRET!);
        cookies().set("auth", jsonWebToken, {
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
            httpOnly: true,
        });
    } catch (error) {
        return {
            errors: {
                general: "Došlo je do greške prilikom prijavljivanja.",
            },
        };
    }

    return {};
};

export const logout = async () => {
    cookies().delete("auth");
    redirect("/admin");
};

export const checkAuth = async () => {
    const jsonWebToken = cookies().get("auth")?.value;

    if (!jsonWebToken) {
        return false;
    }

    try {
        jwt.verify(jsonWebToken, process.env.JWT_SECRET!);
    } catch (error) {
        return false;
    }

    return true;
};
