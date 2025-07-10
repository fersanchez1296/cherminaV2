import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const routeRoles: Record<string, string[]> = {
  "/usuarios": ["Root"],
  "/clientes": ["Root"],
  "/tickets/nuevo": ["Root", "Moderador", "Administrador"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;
  const userRole = token?.rol;

  // Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const allowedRoles = routeRoles[path];

  if (allowedRoles && !allowedRoles.includes(userRole as string)) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/usuarios/:path*", "/clientes/:path*", "/tickets/:path*"],
};
