import { prisma } from "@/DB/dbconfig";
import { Utils } from "@/utils";
import { ErrorReporterCustom } from "@/validation/ErrorReporter";
import { registerSchema } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();

		// custom error reporter
		vine.errorReporter = () => new ErrorReporterCustom();
		// compile and validate
		const validator = vine.compile(registerSchema);
		// validated data
		const payload = await validator.validate(data);

		// Check user if exist before register
		const isExist = await prisma.user.findUnique({
			where: {
				email: payload.email,
			},
		});
		if (isExist) {
			return NextResponse.json({
				status: 400,
				errors: { email: "Email already taken" },
			});
		}

		// check if usrname is exists
		const username = await prisma.user.findUnique({
			where: {
				username: payload.username,
			},
		});
		if (username) {
			return NextResponse.json({
				status: 400,
				errors: { username: "Username is already taken" },
			});
		}

		// hashing password with synchronous way
		payload.password = await Utils.hashPassword(payload.password);

		// inserting new user into database
		const user = await prisma.user.create({
			data: payload,
		});

		return NextResponse.json(
			{ status: 200, message: "Account has been created", user },
			{ status: 200 }
		);
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json({ status:400, errors: error.messages }, { status: 400 });
		}
		return NextResponse.json(
			{ status:400, message: "server error-line", errors:(error as Error).message },
			{ status: 400 }
		);
	}
}
