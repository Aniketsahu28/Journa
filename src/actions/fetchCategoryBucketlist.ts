'use server'

import prisma from "@/lib/prisma"

export async function fetchCategoryBucketlist(categoryId: number) {
    try {
        const categoryBucketlist = await prisma.bucketItem.findMany({
            where: {
                categoryId
            }
        })

        return { data: categoryBucketlist }
    } catch (error) {
        return { error: (error as Error).message }
    }
}