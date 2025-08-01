import z from "zod";

export const ZUserSignupSchema = z.object({
  name: z.string().min(3).trim(),
  email: z.email().trim(),
  password: z.string().min(6).trim(),
  dateOfBirth: z.string(),
});
