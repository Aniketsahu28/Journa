import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export const config = {
  matcher: ["/api/bucketlist/add-item", "/api/bucketlist/:path*", "/api/category/:path*", "/api/category"],
};

export async function middleware(req: NextRequest) {
  try {
    const payload = await getToken({ req: req, cookieName: "next-auth.session-token", secret: process.env.NEXTAUTH_SECRET })
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("userId", payload.userId as string);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}