import { NextResponse } from "next/server";

const authUrl = ["/login", "/register"];

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isCookiesExist = !!request.cookies.get("token");
  const isAuthPage = authUrl.includes(pathname);

  if (isCookiesExist == false && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isCookiesExist && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
