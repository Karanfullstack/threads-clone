import { NextResponse, NextRequest } from "next/server";
import { CustomSessionType, authOptions } from "../auth/[...nextauth]/options";
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

		const notifications = await prisma.notification.findMany({
			where: {
				toUser_id: Number(session.user?.id),
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						username: true,
						email: true,
					},
				},
			},
		});
		await prisma.notification.deleteMany({
			where: {
				created_at: {
					lte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 2),
				},
			},
		});
		return NextResponse.json({
			status: 200,
			message: "success",
			data: notifications,
		});
	} catch (error) {
		return NextResponse.json({
			status: 400,
			message: (error as Error).message,
		});
	}
}
