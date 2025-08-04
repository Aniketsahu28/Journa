import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('userId');

        const userCategories = await prisma.category.findMany({
            where: {
                userId: parseInt(userId as string)
            },
            select: {
                id: true,
                name: true,
                parentId: true
            }
        })

        return NextResponse.json({ data: userCategories }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ erro: "Internal server error" }, { status: 500 })
    }
}