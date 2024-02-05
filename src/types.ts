export type AuthStateT = {
	email?: string;
	password?: string;
	name?: string;
	username?: string;
	password_confirmation?: string;
};

export type AuthErrorType = {
	email?: string;
	password?: string;
	name?: string;
	username?: string;
};

export type PostErrorType = {
	content?: string;
};
