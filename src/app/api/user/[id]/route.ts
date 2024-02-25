import { prisma } from "@/DB/dbconfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: Number(params.id),
			},
			select: {
				id: true,
				name: true,
				email: true,
				username: true,

				Post: {
					include: {
						user: true,
					},
				},
				comments: {
					include: {
						user: true,
					},
				},
			},
		});
		return NextResponse.json({
			status: 200,
			message: "User Found",
			data: user,
		});
	} catch (error) {
		return NextResponse.json({
			status: 401,
			message: (error as Error).message,
		});
	}
}
