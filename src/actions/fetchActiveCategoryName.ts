'use server'

import prisma from "@/lib/prisma"

export async function fetchActiveCategoryName(categoryId: number) {
    try {
        const categoryName = await prisma.category.findUnique({
            where: {
                id: categoryId
            },
            select: {
                name: true
            }
        })

        return { data: categoryName }
    } catch (error) {
        return { error: (error as Error).message }
    }
}