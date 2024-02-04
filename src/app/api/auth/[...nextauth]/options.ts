import { prisma } from "@/DB/dbconfig";
import { AuthOptions, User, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// custom types for session and user
type CustomSessionType = {
	user?: CustomUserType;
	expires: ISODateString;
};
type CustomUserType = {
	id?: string | null;
	name?: string | null;
	email?: string | null;
	username?: string | null;
	image?: string | null;
};


// auth options
export const authOptions: AuthOptions = {
	// pages for loging or signing in
	pages: {
		signIn: "/login",
		newUser:"/register",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},


		// session callback to	add user to session
		async session({
			session,
			token,
			user,
		}: {
			session: CustomSessionType;
			token: JWT;
			user: User;
		}) {
			session.user = token.user as CustomUserType;
			return session;
		},
	},

	// prviders for auth for custom credentials
	providers: [
		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: {},
				password: {},
			},
			async authorize(credentials, req) {
				// database operation for user
				const user = await prisma.user.findUnique({
					where: { email: credentials?.email },
					select: {
						id: true,
						email: true,
						username: true,
						name: true,
					},
				});

				// return user if found
				if (user) {
					return { ...user, id: user.id.toString() };
				} else {
					return null;
				}
			},
		}),
	],
};