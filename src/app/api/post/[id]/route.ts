import { prisma } from "@/DB/dbconfig";
import { NextResponse, NextRequest } from "next/server";

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
