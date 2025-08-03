import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { categoryId: string } }) {
    try {
        const userId = req.headers.get('userId');
        const categoryId = params.categoryId;

        const bucketItems = await prisma.bucketItem.findMany({
            where: {
                userId: parseInt(userId as string),
                categoryId: parseInt(categoryId)
            }
        })

        return NextResponse.json({ data: bucketItems })
    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}