"use client";
import React from "react";
import PostBar from "./PostBar";
import ImagePreview from "./ImagePreview";
import { Heart, MessageCircle, Send, SendHorizonal } from "lucide-react";
import { PostType } from "@/types";
import ImageViewer from "./ImageViewer";

const PostCard = ({ post }: { post: PostType }) => {
	return (
		<div className="pb-4">
			<PostBar post={post} />
			<div className="mt-5 flex flex-col justify-center items-start">
				<span className="ml-4 mb-5  ">{post.content}</span>
				{post.image && <ImageViewer image={post.image} />}
				<div className="flex  w-full space-x-5 ml-3">
					<Heart width={20} height={20} className=" cursor-pointer" />
					<MessageCircle width={20} height={20} className=" cursor-pointer" />
					<SendHorizonal width={20} height={20} className=" cursor-pointer" />
				</div>
				<div className="mt-3 w-full space-x-3">
					<span>5 replies</span>
					<span>2 Likes</span>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
