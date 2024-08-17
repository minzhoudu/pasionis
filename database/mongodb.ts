import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    const URI = process.env.NEXT_PUBLIC_MONGODB_URI;
    try {
        if (!URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(URI);
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
