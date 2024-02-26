import vine from "@vinejs/vine";

export const commentSchema = vine.object({
	content: vine.string().trim().minLength(5),
	post_id: vine.string(),
	toUser_id: vine.string(),
});
