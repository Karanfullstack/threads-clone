import { NextRequest, NextResponse } from "next/server";
import { loginSchemaValidation } from "@/validation/registerSchema";
import vine, { errors } from "@vinejs/vine";
import { ErrorReporterCustom } from "@/validation/ErrorReporter";
import { prisma } from "@/DB/dbconfig";
import { Utils } from "@/utils";

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		vine.errorReporter = () => new ErrorReporterCustom();
		const validator = vine.compile(loginSchemaValidation);
		const payload = await validator.validate(data);

		// checking if user exists
		const isUser = await prisma.user.findUnique({
			where: { email: payload.email },
		});
  if(!isUser){
    return NextResponse.json({errors:{email:"Invalid Credentials"}},{status:400})
  }
  // checking if password match
  const isMatch = await Utils.comparePassword(payload.password, isUser.password as string)
  if(!isMatch){
    return NextResponse.json({errors:{password:"Invalid Credentials"}},{status:400})
  }
  return NextResponse.json({status:200,message:"Login success",user:isUser},{status:200})
	} catch (error) {
  if(error instanceof errors.E_VALIDATION_ERROR){
    return NextResponse.json({errors:error.messages},{status:400})
  }
		return NextResponse.json(
			{ errors: (error as Error).message },
			{ status: 400 }
		);
	}
}
