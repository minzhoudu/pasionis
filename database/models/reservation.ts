import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const reservationSchema = new Schema(
    {
        fullName: String,
        email: String,
        date: String,
        time: String,
    },
    { timestamps: true },
);

const Reservation =
    mongoose.models.Reservation ||
    mongoose.model("Reservation", reservationSchema);

export default Reservation;
