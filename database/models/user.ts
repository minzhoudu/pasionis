import { TUser } from "@/types/User";
import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["admin", "owner"],
            default: "admin",
        },
    },
    { timestamps: true },
);

const User = mongoose.models.User || mongoose.model<TUser>("User", userSchema);

export default User;
