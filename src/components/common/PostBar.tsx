"use client";
import React from "react";
import UserAvatar from "./UserAvatar";
import { MoreHorizontal } from "lucide-react";
import { PostType } from "@/types";
import { Utils } from "@/utils";
import DeletePost from "../threads/DeletePost";
import { useSession } from "next-auth/react";
import { CustomUserType } from "@/app/api/auth/[...nextauth]/options";

const PostBar = ({ post }: { post: PostType }) => {
	const { data } = useSession();
	const userId = (data && (data?.user as CustomUserType).id) || undefined;
	const isAuth =
		data && userId && Number(userId) === post.user_id ? true : false;

	return (
		<div className="flex space-x-2 mt-6 justify-between items-center">
			<div className="flex space-x-3 items-start">
				<UserAvatar name={post?.user?.name || ""} image="" />
				<div className="flex flex-col">
					<strong>{post?.user?.name}</strong>
					<span>@{post?.user?.username}</span>
				</div>
			</div>
			<div className="flex items-center space-x-2">
				<span>{Utils.formatDaate(post.createdAt)}</span>
				{isAuth ? <DeletePost id={post.id} /> : <MoreHorizontal />}
			</div>
		</div>
	);
};

export default PostBar;
