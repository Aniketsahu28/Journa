import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { itemId: string } }) {
    try {
        const bucketItemId = params.itemId;

        const bucketItem = await prisma.bucketItem.findUnique({
            where: {
                id: parseInt(bucketItemId)
            }
        })

        if (bucketItem) {
            return NextResponse.json({ data: bucketItem }, { status: 200 })
        }
        else {
            return NextResponse.json({ error: "Bucket item not found" }, { status: 404 })
        }
    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}