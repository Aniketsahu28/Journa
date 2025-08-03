import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get("userId");
        const { title, description, tags, date, reminder, categoryId } = await req.json();

        const bucketItem = await prisma.bucketItem.create({
            data: {
                title,
                description,
                tags,
                date,
                reminder,
                categoryId,
                isComplete: false,
                userId: parseInt(userId as string)
            }
        })
        return NextResponse.json(
            { message: "Bucket item added successfully", data: bucketItem },
            { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}
