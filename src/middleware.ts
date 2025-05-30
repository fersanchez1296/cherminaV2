// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Define las rutas protegidas por rol
const protectedRoutes = {
  Root: ["/usuarios", "/clientes", "/tickets/nuevo"],
  Admin: ["/tickets/nuevo"],
  User: [],
};

// Middleware principal
export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Si no hay token, redirige al login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = token?.user?.rol;
  const path = request.nextUrl.pathname;

  for (const [role, routes] of Object.entries(protectedRoutes)) {
    if (routes.some((route) => path.startsWith(route))) {
      if (userRole !== role) {
        return NextResponse.redirect(new URL("/not-found", request.url));
      }
    }
  }

  return NextResponse.next();
}

// Define las rutas donde se aplica el middleware
export const config = {
  matcher: [
    //"/usuarios/:path*",
    //"/clientes/:path*",
    "/tickets/:path*",
  ],
};
