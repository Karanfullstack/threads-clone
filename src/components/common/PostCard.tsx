"use client";
import React, { useEffect, useRef } from "react";
import PostBar from "./PostBar";
import { Heart, SendHorizonal } from "lucide-react";
import { PostType } from "@/types";
import ImageViewer from "./ImageViewer";
import AddComment from "../threads/AddComment";
import { useRouter } from "next/navigation";

const PostCard = ({
	post,
	flagLink = false,
}: {
	post: PostType;
	flagLink?: boolean;
}) => {
	const linkRef = useRef<HTMLInputElement | null>(null);
	console.log(linkRef);
	const router = useRouter();
	const handeleNavigation = () => {
		console.log("handeleNavigation clicked");
		router.push(`/post/${post.id}`);
	};
	useEffect(() => {
		if (flagLink) {
			console.log("flagLink");
			linkRef.current?.removeEventListener("click", handeleNavigation);
		} else {
			linkRef.current?.addEventListener("click", handeleNavigation);
		}

		return () => {
			linkRef.current?.removeEventListener("click", handeleNavigation);
		};
	}, [flagLink]);
	return (
		<div className="pb-4">
			<PostBar post={post} />
			<div className="mt-5 flex flex-col justify-center items-start">
				<span
					ref={linkRef}
					className={`${flagLink ? "" : "cursor-pointer"} ml-4 mb-5 `}
				>
					{post.content}
				</span>
				{post.image && <ImageViewer image={post.image} />}
				<div className="flex  w-full space-x-5 ml-3">
					<Heart width={20} height={20} className=" cursor-pointer" />
					<AddComment post={post} />
					<SendHorizonal width={20} height={20} className=" cursor-pointer" />
				</div>
				<div className="mt-3 w-full space-x-3">
					<span>{post.comment_count} replies</span>
					<span>2 Likes</span>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
