import vine from "@vinejs/vine";

export const postSchema = vine.object({
	content: vine.string().minLength(7).maxLength(1000).trim(),
});
