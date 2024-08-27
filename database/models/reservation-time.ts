import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const reservationTimeSchema = new Schema({
    time: String,
    available: { type: Boolean, default: true },
});

const ReservationTime =
    mongoose.models.ReservationTime ||
    mongoose.model("ReservationTime", reservationTimeSchema);

export default ReservationTime;
