import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const { id, title, description, tags, date, reminder, isComplete, categoryId } = await req.json();

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

        return NextResponse.json(
            { message: "Bucket item updated successfully", data: updatedItem },
            { status: 200 }
        )
    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}