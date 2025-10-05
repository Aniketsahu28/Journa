"use server";

import prisma from "@/lib/prisma";
import { ZUserUpdateProfile } from "@/zod/ZUserUpdateProfile";
import z from "zod";

export async function updateProfile({
    userId,
    name,
    dateOfBirth,
    country,
    image,
}: {
    userId: number;
    name?: string;
    dateOfBirth?: Date;
    country?: string;
    image?: string;
}) {
    try {
        const result = ZUserUpdateProfile.safeParse({
            name,
            dateOfBirth: new Date(dateOfBirth!).toLocaleString(),
            country,
            image,
        });

        if (!result.success) {
            return {
                success: false,
                error: z.flattenError(result.error).fieldErrors,
            };
        }

        const updatedProfile = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: result.data.name,
                dateOfBirth: dateOfBirth,
                country: result.data.country,
                image: result.data.image,
            },
        });

        return {
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile,
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
