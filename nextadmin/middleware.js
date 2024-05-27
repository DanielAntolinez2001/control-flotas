import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/app/authconfig";

export default async function middleware(req) {
  const session = await getServerSession(req, authConfig);

  if (!session && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Aplica el middleware solo a la ruta /dashboard
};
