import z from "zod";

export const ZUserUpdateProfile = z.object({
    name: z.string().min(3).trim().optional(),
    dateOfBirth: z.string().optional(),
    country: z.string().optional(),
    image: z.string().optional(),
});
