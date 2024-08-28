"use client";

import { triggerWorkOnWeekend } from "@/lib/actions/reservation-times-action";
import { useState } from "react";
import Switch from "react-switch";

type EnableWeekendReservationsProps = {
    settings: {
        workingOnSaturday: boolean;
        workingOnSunday: boolean;
    };
};

export const EnableWeekendReservations = ({
    settings: { workingOnSaturday },
}: EnableWeekendReservationsProps) => {
    const handleChecked = async (checked: boolean) => {
        await triggerWorkOnWeekend(checked);
    };

    return (
        <div className="flex items-center justify-center gap-5 self-center uppercase">
            <label htmlFor="saturday">Rad subotom</label>
            <Switch onChange={handleChecked} checked={workingOnSaturday} />
        </div>
    );
};
