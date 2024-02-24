import { prisma } from "@/DB/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import {
	CustomSessionType,
	authOptions,
} from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { join } from "path";
import { rmSync } from "fs";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		const post = await prisma.post.findUnique({
			where: {
				id: Number(params.id),
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						username: true,
					},
				},
				comments: {
					include: {
						user: {
							select: {
								id: true,
								name: true,
								username: true,
							},
						},
					},
				},
			},
		});
		return NextResponse.json({ status: 200, data: post });
	} catch (error) {
		return NextResponse.json({
			status: 500,
			message: (error as Error).message,
		});
	}
}

// DELETE	/api/post/[id]
export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);
		if (!session) {
			return NextResponse.json({ status: 400, message: "Unauthorized" });
		}

		// check if post exists with the user_id
		const findPost = await prisma.post.findFirst({
			where: {
				id: Number(params.id),
				user_id: Number(session.user?.id),
			},
		});

		if (!findPost) {
			return NextResponse.json({ status: 400, message: "Post Not Found" });
		}

		// Delete image from local
		if (findPost) {
			const dir = join(process.cwd(), "public", "/uploads");
			const path = dir + "/" + findPost.image;
			rmSync(path, { force: true });
		}
		await prisma.post.delete({
			where: {
				id: Number(params.id),
			},
		});
		return NextResponse.json({ status: 200, message: "Post has been deleted" });
	} catch (error) {
		return NextResponse.json({
			status: 400,
			message: (error as Error).message,
		});
	}
}
