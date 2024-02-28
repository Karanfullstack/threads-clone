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
	comments?: CommentType[];
	comment_count?: number;
	like_count?:number;
	likes: Array<LikePostType> | [];
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

export type ShowUserType = {
	id: number;
	name: string;
	username: string;
	email: string;
	Post: PostType[] | [];
	comments: CommentType[] | [];
};

export type NotificationType = {
	id: string;
	content: string;
	user_id: number;
	toUser_id: number;
	created_at: string;
	user: UserType;
};

export type LikeType = {
	id: number;
	toUser_id?: number;
	post_id: number;
	created_at: string;
	user?: UserType;
	status?: boolean;
};

export type LikePostType = {
	id: number;
	post_id: number;
	user_id: number;
};
