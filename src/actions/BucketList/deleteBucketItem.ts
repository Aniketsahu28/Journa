'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBucketItem({ itemId, categoryId }: { itemId: number, categoryId: number }) {
    try {
        await prisma.bucketItem.delete({
            where: {
                id: itemId
            }
        })

        revalidatePath(`/category/${categoryId}`)
        return {
            success: true,
            message: "Bucket item deleted",
        };

    } catch (error) {
        return {
            success: false,
            error: (error as Error).message
        }
    }
}