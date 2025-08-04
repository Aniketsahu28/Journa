import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get('userId');
        console.log(userId)
        const { name, parentId } = await req.json();
        if (!name) {
            return NextResponse.json(
                { error: "Category name cannot be empty" },
                { status: 400 }
            )
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                userId: parseInt(userId as string),
                parentId,
            }
        })

        return NextResponse.json({
            message: "Category added successfully",
            data: newCategory
        }, { status: 201 })
    }
    catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}