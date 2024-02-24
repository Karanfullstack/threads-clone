"use client";
import React from "react";
import PostBar from "./PostBar";
import { Heart, SendHorizonal } from "lucide-react";
import { PostType } from "@/types";
import ImageViewer from "./ImageViewer";
import AddComment from "../threads/AddComment";
import Link, { useRouter } from "next/navigation";

const PostCard = ({ post }: { post: PostType }) => {
	const router = useRouter();
	const handeleNavigation = () => {
		router.push(`/post/${post.id}`);
	};
	return (
		<div className="pb-4">
			<PostBar post={post} />
			<div className="mt-5 flex flex-col justify-center items-start">
				<span className="ml-4 mb-5 cursor-pointer " onClick={handeleNavigation}>
					{post.content}
				</span>
				{post.image && <ImageViewer image={post.image} />}
				<div className="flex  w-full space-x-5 ml-3">
					<Heart width={20} height={20} className=" cursor-pointer" />
					<AddComment post={post} />
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
