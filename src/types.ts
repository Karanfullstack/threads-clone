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

export type PostType = {
	id: number;
	content: string;
	image: string;
	createdAt: string;
	user_id: number;
	user: UserType;
};

export type UserType = {
	id: number;
	name: string;
	username: string;
};
