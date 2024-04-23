import { prisma } from "@/DB/dbconfig";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import dotenv from "dotenv";
dotenv.config();
// custom types for session and user
export type CustomSessionType = {
	user?: CustomUserType | undefined;
	expires: ISODateString;
};
export type CustomUserType = {
	id?: string | null | undefined;
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
		newUser: "/register",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user as CustomUserType;
				token.id = user.id;
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
			user: CustomUserType;
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
				try {
					const user = await prisma.user.findUnique({
						where: { email: credentials?.email },
						select: {
							id: true,
							email: true,
							username: true,
							name: true,
						},
					});

					if (user) {
						return { ...user, id: user.id.toString() };
					} else {
						return null;
					}
				} catch (error) {
					console.error("Error during authentication:", error);
					return null;
				}
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,

	
};
