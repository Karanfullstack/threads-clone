import { withAuth } from "next-auth/middleware";

export default withAuth(function middleware(req) {}, {
	callbacks: {
		authorized: ({ token }) => (token ? true : false),
	},
});

export const config = { matcher: ["/"] };
