'use server'
import prisma from "@/lib/prisma"

export async function addSupportQuery({ reason, description, userId }: { reason: string, description: string, userId: number }) {
    try {
        if(!reason || !description || !userId){
            return {
                success: false,
                error: "Reason, description and userId are required."
            }
        }

        const supportQuery = await prisma.support.create({
            data: {
                reason,
                description,
                userId
            }
        })

        return {
            success: true,
            message: "We've got your query. Our team will reach out shortly.",
            data: supportQuery
        }
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message
        }
    }
}