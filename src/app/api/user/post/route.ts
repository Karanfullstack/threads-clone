import { NextResponse, NextRequest } from "next/server";
import {
	CustomSessionType,
	authOptions,
} from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prisma } from "@/DB/dbconfig";

export async function GET(req: NextRequest) {
	try {
		// checking if session
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);
		if (!session) {
			return NextResponse.json(
				{ status: 401, message: "Unauthorized" },
				{ status: 401 }
			);
		}
		// fetching user posts
		const post = await prisma.post.findMany({
			where: {
				user_id: Number(session.user?.id),
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						name: true,
						email: true,
					},
				},
			},
			orderBy: {
				id: "desc",
			},
		});

		return NextResponse.json({
			status: 200,
			message: "Post Fetched Successfully",
			data: post,
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			message: (error as Error).message,
		});
	}
}
