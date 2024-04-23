"use client";
import React, { useEffect, useRef, useState } from "react";
import PostBar from "./PostBar";
import { Heart } from "lucide-react";
import { PostType } from "@/types";
import ImageViewer from "./ImageViewer";
import AddComment from "../threads/AddComment";
import { useRouter } from "next/navigation";
import SharePost from "./SharePost";
import axios from "axios";
import { useToast } from "../ui/use-toast";

const PostCard = ({
	post,
	flagLink = false,
}: {
	post: PostType;
	flagLink?: boolean;
}) => {
	const { toast } = useToast();

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

	const handelLike = () => {
		axios
			.post("/api/like", {
				post_id: post.id,
				toUser_id: post.user_id,
			})
			.then((res) => {
				console.log(res.data);
				router.refresh();
			})
			.catch((error) => {
				console.log(error);
			});
	};

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
					<Heart
						fill={post?.likes?.length > 0 ? "#FF8383" : "#ffff"}
						width={20}
						height={20}
						className=" cursor-pointer "
						onClick={handelLike}
					/>
					<AddComment post={post} />
					{/* share post */}
					<SharePost url={`http://localhost:3000/${post.id.toString()}`} />
				</div>
				<div className="mt-3 w-full space-x-3">
					<span>{post.comment_count} replies</span>
					<span>{post.like_count} Likes</span>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
