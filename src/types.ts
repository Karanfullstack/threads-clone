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
	user_id?: number;
	user?: UserType;
	comments?:	CommentType[];
	comment_count?:number;
};

export type UserType = {
	id?: number;
	name?: string;
	username?: string;
	email?: string;
	image?: string;
};

export type CommentType = {
	id: number;
	content: string;
	created_at: string;
	user_id: number;
	post_id: number;
	user: UserType;
};
