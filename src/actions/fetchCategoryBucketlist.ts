'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"

export async function fetchCategoryBucketlist(categoryId: number, search?: string) {
    const session = await getServerSession(authOptions)
    try {
        const categoryBucketlist = await prisma.bucketItem.findMany({
            where: {
                categoryId,
                userId: Number(session?.user.id),
                ...(search ? {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                } : {})
            },
            orderBy: [
                { isComplete: "asc" },
                { createdAt: "desc" },
            ]
        })

        return { data: categoryBucketlist }
    } catch (error) {
        return { error: (error as Error).message }
    }
}