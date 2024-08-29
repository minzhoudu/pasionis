import { Document } from "mongoose";

export type SettingsType = {
    _id: string;
    type: string;
} & Document;

export type WorkingOnWeekendSetting = {
    workingOnSaturday: boolean;
    workingOnSunday: boolean;
} & SettingsType;
