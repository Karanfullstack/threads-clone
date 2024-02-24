import React from "react";
import UserAvatar from "./UserAvatar";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { PostType } from "@/types";
import { Utils } from "@/utils";

const PostBar = ({ post, isAuth }: { post: PostType; isAuth?: boolean }) => {
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
				{isAuth ? <Trash2 /> : <MoreHorizontal />}
			</div>
		</div>
	);
};

export default PostBar;
