'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBucketItem({
    id,
    title,
    description,
    tags,
    date,
    reminder,
    isComplete,
    categoryId,
}: {
    id: number;
    title?: string;
    description?: string;
    tags?: string[];
    date?: Date;
    reminder?: Date;
    isComplete?: boolean;
    categoryId?: number;
}) {
    try {
        const updatedItem = await prisma.bucketItem.update({
            where: { id },
            data: {
                title,
                description,
                tags,
                date,
                reminder,
                isComplete,
                categoryId
            }
        })

        revalidatePath(`/category/${categoryId}`);
        return { success: true, data: updatedItem };

    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
}