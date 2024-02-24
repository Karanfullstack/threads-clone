import { ErrorReporterCustom } from "@/validation/ErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextResponse, NextRequest } from "next/server";
import { CustomSessionType, authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { commentSchema } from "@/validation/commentSchema";
import { prisma } from "@/DB/dbconfig";

export async function POST(req: NextRequest) {
	try {
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);
		if (!session) {
			return NextResponse.json({ status: 200, message: "Unauthorized" });
		}

		const data = await req.json();
		vine.errorReporter = () => new ErrorReporterCustom();
		const validator = vine.compile(commentSchema);
		const payload = await validator.validate(data);

		// Adding Comment

		await prisma.comment.create({
			data: {
				content: payload.content,
				post_id: Number(payload.post_id),
				user_id: Number(session.user?.id),
			},
		});

		// Increment Comment Count In Post

		await prisma.post.update({
			where: {
				id: Number(payload.post_id),
			},
			data: {
				comment_count: {
					increment: 1,
				},
			},
		});

		return NextResponse.json({ status: 200, message: "Comment Added" });
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json({ status: 400, errors: error.messages });
		}
	}
}
