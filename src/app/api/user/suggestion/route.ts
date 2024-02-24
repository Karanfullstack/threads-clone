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
			return NextResponse.json(
				{ status: 401, message: "Unauthorized" },
				{ status: 401 }
			);
		}

		const suggestions = await prisma.user.findMany({
			where: {
				NOT: {
					id: Number(session.user?.id),
				},
			},
			select: {
				id: true,
				username: true,
				name: true,
				email: true,
			},
		});
		return NextResponse.json({
			status: 200,
			message: "Suggestions Fetched Successfully",
			data: suggestions,
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			message: (error as Error).message,
		});
	}
}
