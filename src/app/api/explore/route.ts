import { prisma } from "@/DB/dbconfig";
import { NextResponse, NextRequest } from "next/server";
import { CustomSessionType, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
	try {
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);

		if (!session) {
			return NextResponse.json({
				status: 401,
				message: "Unauthorized",
			});
		}

		const query = req.nextUrl.searchParams.get("query");
		const users = await prisma.user.findMany({
			where: {
				OR: [
					{
						username: {
							contains: query ?? "",
							mode: "insensitive",
						},
					},
					{
						name: {
							contains: query ?? "",
							mode: "insensitive",
						},
					},
				],
				NOT: {
					id: Number(session.user?.id),
				},
			},
			select: {
				id: true,
				name: true,
				username: true,
			},
		});
		return NextResponse.json({
			status: 200,
			message: "Success",
			data: users,
		});
	} catch (error) {
		return NextResponse.json({
			status: 400,
			message: (error as Error).message,
		});
	}
}
