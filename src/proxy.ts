import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PATHS = ["/dashboard"];
const COOKIE_KEY = "rustshield-session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this path needs protection
  const isProtected = PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for auth cookie
  const session = request.cookies.get(COOKIE_KEY);

  if (!session?.value) {
    // Not authenticated → redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - api routes
     * - _next/static, _next/image (Next.js internals)
     * - public assets (favicon, images, fonts)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|favicon\\.png|logo\\.png|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};

