import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const { id, name, parentId } = await req.json();

        const updatedCategory = await prisma.category.update({
            where: {
                id: parseInt(id as string)
            },
            data: {
                name,
                parentId
            }
        })

        return NextResponse.json({
            message: "Category updated successfully",
            data: {
                id: updatedCategory.id,
                name: updatedCategory.name,
                parentId: updatedCategory.parentId
            }
        }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}