import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { categoryId: string } }) {
    try {
        const categoryId = params.categoryId;

        const categoryToDelete = await prisma.category.findUnique({
            where: {
                id: parseInt(categoryId)
            }
        })

        if (categoryToDelete) {
            await prisma.category.delete({
                where: {
                    id: parseInt(categoryId)
                }
            })

            return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 })
        }
        else {
            return NextResponse.json({ error: "Category not found" }, { status: 404 })
        }
    }
    catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}