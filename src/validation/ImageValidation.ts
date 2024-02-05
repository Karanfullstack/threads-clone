import { Utils } from "@/utils";

export  function ImageValidation(
	name: string | undefined,
	size: number | undefined
) {
	let flag: string | null = null;
	if (name) {
		const ext = name.split(".");
		const allowedExt: Array<string> = [
			"jpg",
			"jpeg",
			"png",
			"gif",
			"svg",
			"webp",
		];
		if (!allowedExt.includes(ext[1].toLocaleLowerCase())) {
			flag = "Invalid file format";
		} else {
			flag = null;
		}
		if (size) {
			const imageSize = Utils.bytesToMb(size);
			if (imageSize > 2) {
				flag = "Image size should be less than 2MB";
			} else {
				flag = null;
			}
		}
	}
 return flag;
}
