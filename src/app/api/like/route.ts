import { NextRequest, NextResponse } from "next/server";
import { CustomSessionType, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prisma } from "@/DB/dbconfig";
import { LikeType } from "@/types";

export async function POST(req: NextRequest) {
	try {
		const data: LikeType = await req.json();
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);
		if (!session) {
			return NextResponse.json({ status: 401, message: "Unauthorized" });
		}

		const isLiked = await prisma.like.findFirst({
			where: {
				AND: [
					{ user_id: Number(session.user?.id) },
					{ post_id: Number(data.post_id) },
				],
			},
		});

	

		if (isLiked) {
			await prisma.like.delete({
				where: {
					id: String(isLiked.id),
				},
			});
			await prisma.post.update({
				where: { id: Number(data.post_id) },
				data: {
					like_count: {
						decrement: 1,
					},
				},
			});
			return NextResponse.json({
				status: 201,
				messsage: "unliked successfully",
			});
		} else {
			await prisma.like.create({
				data: {
					post_id: Number(data.post_id),
					user_id: Number(session.user?.id),
					status: true,
				},
			});
			await prisma.notification.create({
				data: {
					content: `${session.user?.name} liked your post`,
					user_id: Number(session.user?.id),
					toUser_id: Number(data.toUser_id),
				},
			});

			await prisma.post.update({
				where: { id: Number(data.post_id) },
				data: {
					like_count: {
						increment: 1,
					},
				},
			});
			return NextResponse.json({ status: 200, messsage: "Liked successfully" });
		}
	} catch (error) {
		return NextResponse.json({
			status: 401,
			message: (error as Error).message,
		});
	}
}
