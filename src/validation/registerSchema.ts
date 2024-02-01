import vine from "@vinejs/vine";

export const registerSchema = vine.object({
	username: vine.string().minLength(4).maxLength(30),
	name: vine.string().minLength(4).maxLength(50),
	email: vine.string().email(),
	password: vine.string().minLength(4).confirmed(),
});

export const loginSchemaValidation = vine.object({
	email: vine.string().email(),
	password: vine.string(),
});
