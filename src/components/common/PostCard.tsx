"use client";
import React from "react";
import PostBar from "./PostBar";
import Image from "next/image";
import ImagePreview from "./ImagePreview";
import { Heart, MessageCircle, Send, SendHorizonal } from "lucide-react";

const PostCard = () => {
	return (
		<div className="pb-4">
			<PostBar />
			<div className="mt-5 flex flex-col justify-center items-center">
				<span className="ml-4 mb-5  ">
					lorem ipsum dolor sit amet, consectetur adipiscing elit.lorem ipsum
					dolor sit amet, consectetur adipiscing elit
				</span>
				<ImagePreview image="/uploads/1707159636890.jpeg" />
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
