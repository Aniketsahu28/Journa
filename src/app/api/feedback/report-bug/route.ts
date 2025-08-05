import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get('userId');
        const { title, description, images, videos } = await req.json();

        const bug = await prisma.bug.create({
            data: {
                title,
                description,
                images,
                videos,
                userId: parseInt(userId as string)
            }
        })

        return NextResponse.json({ message: "Bug report submitted successfully", data: bug }, { status: 200 })
    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}