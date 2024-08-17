import mongoose, { Schema } from "mongoose";

const reservationSchema = new Schema({
    fullName: String,
    email: String,
    date: String,
    time: String,
});

const Reservation =
    mongoose.models.Reservation ||
    mongoose.model("Reservation", reservationSchema);

export default Reservation;
