import jwt from "jsonwebtoken";
import User from "@/database/models/user";
import { cookies } from "next/headers";
import { TUser } from "@/types/User";

export const getLoggedinUser = async () => {
    const jsonwebtoken = cookies().get("auth")?.value;

    if (!jsonwebtoken) {
        return null;
    }

    try {
        const { email } = jwt.verify(jsonwebtoken, process.env.JWT_SECRET!) as {
            email: string;
        };

        const user = await User.findOne<TUser>({ email });

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        return null;
    }
};
