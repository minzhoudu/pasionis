"use server";

export const sendReservation = async (formData: FormData) => {
    const user = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        date: formData.get("date"),
        time: formData.get("time"),
    };

    console.log(user);
};
