import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		console.log(req.nextauth.token);
		const path = req.nextUrl.pathname;
		const publicPaths = ["/register", "/login"];
		if (publicPaths.includes(path) && req.nextauth.token) {
			return NextResponse.redirect(new URL("/", req.nextUrl));
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => (token ? true : false),
		},
	}
);

export const config = { matcher: ["/", "/login", "/register"] };
