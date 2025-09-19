'use server'
import prisma from "@/lib/prisma"

export async function reportNewBug({ userId, title, description }: { userId: number, title: string, description: string }) {
    try {
        if (!userId || !title || !description) {
            return {
                success: false,
                error: "Title, description and userId are required."
            }
        }

        await prisma.bug.create({
            data: {
                userId,
                title,
                description
            }
        })

        return {
            success: true,
            message: "Bug report submitted. Our team will review it and work on fixing the issue as soon as possible."
        }

    } catch (error) {
        return {
            success: false,
            error: (error as Error).message
        }
    }
}