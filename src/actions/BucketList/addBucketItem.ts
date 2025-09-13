"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addBucketItem({
    categoryId,
    userId,
    title,
    description,
    tags,
    date,
    reminder,
}: {
    categoryId: number;
    userId: number;
    title: string;
    description?: string;
    tags?: string[];
    date?: Date;
    reminder?: Date;
}) {
    try {
        const bucketItem = await prisma.bucketItem.create({
            data: {
                title,
                description,
                tags,
                date,
                reminder,
                categoryId,
                userId,
            },
        });

        revalidatePath(`/category/${categoryId}`);
        return {
            success: true,
            message: "Bucket item added successfully",
            data: bucketItem,
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}
