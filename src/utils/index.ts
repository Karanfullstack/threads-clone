import bcryptjs from "bcryptjs";
import moment from "moment";
export class Utils {
	public static async hashPassword(password: string) {
		const salt = bcryptjs.genSaltSync(10);
		const hashedPassword = bcryptjs.hashSync(password, salt);
		return hashedPassword;
	}
	public static async comparePassword(
		password: string,
		hashedPassword: string
	) {
		const isMatch = await bcryptjs.compare(password, hashedPassword);
		return isMatch;
	}
	public static bytesToMb(bytes: number) {
		return bytes / 1024 / 1024;
	}
	public static formatDaate(date: string) {
		return moment(date).fromNow();
	}
}
