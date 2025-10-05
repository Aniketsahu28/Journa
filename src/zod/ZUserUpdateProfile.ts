import z from "zod";

export const ZUserUpdateProfile = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").trim().optional(),
    dateOfBirth: z.string("Date of birth is required").optional(),
    country: z.string().optional(),
    image: z.string().optional(),
});
