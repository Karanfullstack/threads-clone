import bcryptjs from "bcryptjs";

export class Utils {
	public static async hashPassword(password: string) {
		const salt = bcryptjs.genSaltSync(10);
		const hashedPassword = bcryptjs.hashSync(password, salt);
		return hashedPassword;
	}
}
