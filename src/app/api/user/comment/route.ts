import { NextResponse, NextRequest } from "next/server";
import {
	CustomSessionType,
	authOptions,
} from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prisma } from "@/DB/dbconfig";

export async function GET(req: NextRequest) {
	try {
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);
		if (!session) {
			return NextResponse.json({ status: 401, message: "Unauthorized" });
		}

		const comments = await prisma.comment.findMany({
			where: {
				user_id: Number(session.user?.id),
			},
			include: {
				user: {
					select: {
						id: true,
						username: true,
						name: true,
					},
				},
				post: {
					select: {
						id: true,
						content: true,
					},
				},
			},
			orderBy: {
				id: "desc",
			},
		});
		return NextResponse.json({ status: 200, data: comments });
	} catch (error) {
		NextResponse.json({ status: 401, message: (error as Error).message });
	}
}
