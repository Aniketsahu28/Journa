"use server";
import { comparePassword, hashPassword } from "@/lib/bcrypt";
import prisma from "@/lib/prisma";

export async function updatePassword({
    userId,
    currentPassword,
    newPassword,
}: {
    userId: number;
    currentPassword: string;
    newPassword: string;
}) {
    try {
        const userPassword = await prisma.user.findUnique({
            where: { id: userId },
            select: { password: true }
        })

        if (userPassword?.password == null) {
            return {
                success: false,
                error: "You have signed up through google, current password does not exist."
            }
        }

        const currentPasswordMatched = await comparePassword(currentPassword, userPassword?.password!);

        if (!currentPasswordMatched) {
            return {
                success: false,
                error: "Incorrect current password."
            }
        }

        const hashedPassword = await hashPassword(newPassword);
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        })

        return {
            success: true,
            message: "Password updated successfully"
        }
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
