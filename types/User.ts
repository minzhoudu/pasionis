export type TUser = {
    _id: string;
    email: string;
    password: string;
    role: "owner" | "admin";
};
