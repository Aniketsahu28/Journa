import z from "zod";

export const ZResetPassword = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters long").trim(),
        confirmNewPassword: z.string().trim(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Password and confirm password must be same",
        path: ["confirmNewPassword"]
    });
