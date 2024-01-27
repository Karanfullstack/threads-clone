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

		return NextResponse.json({ status: 200, payload });
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			return NextResponse.json({ errors: error.messages }, { status: 400 });
		}
	}
}
