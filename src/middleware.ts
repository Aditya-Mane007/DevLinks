import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isToken = request.cookies.get("token")?.value || ""

  const isPublic = path === "/login" || path === "/register"

  const isPrivate =
    path === "/dashboard/links" ||
    path === "/dashboard/profile" ||
    path === "/dashboard/preview"

  if (isPublic && isToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if (!isPublic && !isToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  if (isPrivate && !isToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/dashboard/links",
    "/dashboard/profile",
    "/dashboard/preview"
  ]
}
