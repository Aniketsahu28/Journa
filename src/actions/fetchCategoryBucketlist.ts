'use server'

import prisma from "@/lib/prisma"

export async function fetchCategoryBucketlist(categoryId: number, search?: string) {
    try {
        const categoryBucketlist = await prisma.bucketItem.findMany({
            where: {
                categoryId,
                ...(search ? {
                    title: {
                        contains: search,
                        mode: "insensitive"
                    }
                } : {})
            }
        })

        return { data: categoryBucketlist }
    } catch (error) {
        return { error: (error as Error).message }
    }
}