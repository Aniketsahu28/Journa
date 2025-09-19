'use server'
import prisma from "@/lib/prisma"

export async function recommendNewFeature({ userId, title, description }: { userId: number, title: string, description: string }) {
    try {
        if (!userId || !title || !description) {
            return {
                success: false,
                error: "Title, description and userId are required."
            }
        }

        await prisma.feature.create({
            data: {
                userId,
                title,
                description
            }
        })

        return {
            success: true,
            message: "Feature report submitted. Thank you for your recommendation."
        }

    } catch (error) {
        return {
            success: false,
            error: (error as Error).message
        }
    }
}