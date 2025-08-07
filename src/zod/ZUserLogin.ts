import z from "zod";

export const ZUserLoginSchema = z.object({
    email: z.email().trim(),
    password: z.string().trim().min(6, "Password must be at least 6 characters long")
})