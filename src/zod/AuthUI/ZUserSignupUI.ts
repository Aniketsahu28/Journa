import z from "zod";

export const ZUserSignupSchemaUI = z
    .object({
        name: z.string().min(3, "Name must be at least 3 characters long").trim(),
        dateOfBirth: z.string(),
        email: z.string().email().trim(),
        password: z.string().min(6, "Password must be at least 6 characters long").trim(),
        confirmPassword: z.string().trim(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password and confirm password must be same",
        path: ["confirmPassword"]
    });
