import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { CustomSessionType, authOptions } from "../auth/[...nextauth]/options";
import { ErrorReporterCustom } from "@/validation/ErrorReporter";
import vine, { errors } from "@vinejs/vine";
import { postSchema } from "@/validation/PostSchema";
import { ImageValidation } from "@/validation/ImageValidation";
import { join } from "path";
import { writeFile } from "fs/promises";
import { prisma } from "@/DB/dbconfig";

// POST /api/post
export async function POST(request: NextRequest) {
	try {
		// checking if your is logged in
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);

		if (!session) {
			return NextResponse.json({ status: 400, message: "Unauthorized" });
		}

		// getting form data from user
		const formData = await request.formData();

		// converting formdata to object
		const data = {
			content: formData.get("content"),
			image: "",
		};

		// validating request for content
		vine.errorReporter = () => new ErrorReporterCustom();
		const validator = vine.compile(postSchema);
		const payload = await validator.validate(data);

		// validating image from user.

		const image = formData.get("image") as File | null;
		if (image) {
			const isValidImage = ImageValidation(image?.name, image?.size);
			if (isValidImage) {
				return NextResponse.json({
					status: 400,
					errors: { content: isValidImage },
				});
			}
			// upload image if all good
			const buffer = Buffer.from(await image!.arrayBuffer());
			const uploadDir = join(process.cwd(), "public", "/uploads");
			const imgExt = image?.name.split(".");
			const imgName = `${Date.now()}.${imgExt![1]}`;
			data.image = imgName;
			await writeFile(join(uploadDir, imgName), buffer);
		}

		// saving post to database
		const newPost = await prisma.post.create({
			data: {
				content: payload.content,
				user_id: Number(session.user?.id),
				image: data.image || null,
			},
		});

		return NextResponse.json({
			newPost,
			status: 200,
			message: "Post Created Successfully",
		});
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json(
				{ status: 400, errors: error.messages },
				{ status: 200 }
			);
		}
	}
}

// GET /api/post

export async function GET(request: NextRequest) {
	try {
		const session: CustomSessionType | null = await getServerSession(
			authOptions
		);

		if (!session) {
			return NextResponse.json({ status: 400, message: "Unauthorized User" });
		}
		// getting all post from database
		const posts = await prisma.post.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
						username: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		return NextResponse.json({ status: 200, success: true, data: posts });
	} catch (error) {
		return NextResponse.json({ status: 400, message: "Server Error", error });
	}
}


// 