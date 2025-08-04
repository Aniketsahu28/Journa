import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { categoryId: string } }) {
    try {
        const categoryId = params.categoryId;

        const deletedCategory = await prisma.category.delete({
            where: {
                id: parseInt(categoryId)
            }
        })

        return NextResponse.json({ message: "Category deleted successfully", data: deletedCategory }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}