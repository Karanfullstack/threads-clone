import { NextRequest, NextResponse } from "next/server";
import {
	CustomSessionType,
	authOptions,
} from "../../auth/[...nextauth]/options";
import { prisma } from "@/DB/dbconfig";
import { getServerSession } from "next-auth";

// Deleting Comments
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);
		if (!session) {
			return NextResponse.json({ status: 401, message: "Unauthorized" });
		}
		const findComment = await prisma.comment.findFirst({
			where: {
				id: Number(params.id),
				user_id: Number(session.user?.id),
			},
		});
		if (!findComment) {
			return NextResponse.json({
				status: 401,
				message: "Not Authorized or Comment Found",
			});
		}
		await prisma.post.update({
			where: {
				id: Number(findComment.post_id),
			},
			data: {
				comment_count: {
					decrement: 1,
				},
			},
		});
		await prisma.comment.delete({
			where: {
				id: Number(params.id),
			},
		});

		return NextResponse.json({ status: 200, message: "Comment Deleted" });
	} catch (error) {
		return NextResponse.json({
			status: 401,
			message: (error as Error).message,
		});
	}
}
