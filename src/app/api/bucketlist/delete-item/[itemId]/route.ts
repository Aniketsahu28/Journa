import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { itemId: string } }) {
    try {
        const itemId = params.itemId;

        const itemToDelete = await prisma.bucketItem.findUnique({
            where: {
                id: parseInt(itemId)
            }
        })

        if (itemToDelete) {
            await prisma.bucketItem.delete({
                where: {
                    id: parseInt(itemId)
                }
            })

            return NextResponse.json({ message: "Bucket item deleted successfully" }, { status: 200 })
        }
        else {
            return NextResponse.json({ error: "Bucket item not found" }, { status: 404 })
        }

    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}