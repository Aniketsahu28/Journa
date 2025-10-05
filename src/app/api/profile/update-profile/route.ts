import prisma from "@/lib/prisma";
import { ZUserUpdateProfile } from "@/zod/ZUserUpdateProfile";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function PATCH(req: NextRequest) {
    try {
        const userId = req.headers.get('userId');
        const { name, dateOfBirth, country, image } = await req.json();

        const result = ZUserUpdateProfile.safeParse({
            name,
            dateOfBirth,
            country,
            image
        })

        if (result.success) {
            const updatedProfile = await prisma.user.update({
                where: {
                    id: parseInt(userId as string)
                },
                data: {
                    name: result.data.name,
                    dateOfBirth: dateOfBirth,
                    country: result.data.country,
                    image: result.data.image
                }
            })

            return NextResponse.json(
                { message: "Profile updated successfully", data: updatedProfile },
                { status: 200 }
            )
        }
        else {
            return NextResponse.json(
                { error: z.flattenError(result.error).fieldErrors },
                { status: 400 }
            );
        }
    }
    catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}