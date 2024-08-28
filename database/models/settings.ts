import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const settingsSchema = new Schema(
    {
        type: String,
        working_on_saturday: {
            type: Boolean,
            default: false,
        },
        working_on_sunday: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const Settings =
    mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
