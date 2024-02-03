import { withAuth } from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		console.log(req.nextauth.token);
		const path = req.nextUrl.pathname;

		const isPublicPath = path === "/login" || path === "/register";

		const token = req.nextauth.token;

		if (isPublicPath && token) {
			console.log("middlware called");
			return NextResponse.redirect(new URL("/", req.nextUrl));
		}
		if (!isPublicPath && !token) {
			return NextResponse.redirect(new URL("/login", req.nextUrl));
		}
	}
);

export const config = { matcher: ["/", "/login", "/register"] };
