import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const reservationSchema = new Schema(
    {
        fullName: String,
        phone: String,
        date: String,
        time: String,
        createdAt: {
            type: Date,
            default: Date.now,
            // expires: 60 * 60 * 24 * 365,
        },
    },
    { timestamps: true },
);

const Reservation =
    mongoose.models.Reservation ||
    mongoose.model("Reservation", reservationSchema);

export default Reservation;
