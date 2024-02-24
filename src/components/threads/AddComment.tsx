"use client";
import React, { useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageCircle } from "lucide-react";
import { PostErrorType, PostType } from "@/types";
import PostBar from "../common/PostBar";
import { useSession } from "next-auth/react";
import UserAvatar from "../common/UserAvatar";
import axios from "axios";
import { useToast } from "../ui/use-toast";

export default function AddComment({ post }: { post: PostType }) {
	const [content, setContent] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [errors, setErrors] = useState<PostErrorType>({});
	const { toast } = useToast();
	const { data } = useSession();

	// handle comment submit
	const submit = async () => {
		setLoading(true);
		axios
			.post("/api/comment", {
				content: content,
				post_id: post.id.toString(),
			})
			.then((res) => {
				console.log(res);
				const response = res.data;
				if (response.status === 400) {
					setErrors(response.errors);
				} else if (response.status === 200) {
					toast({
						title: "Success",
						description: response.message,
						className: "bg-green-500 text-white",
					});
					setContent("");
					setErrors({});
				}
			})
			.catch((err) => {
				setLoading(false);
				console.log("The Error is", err);
			});
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<MessageCircle width={20} height={20} className=" cursor-pointer" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="mt-5">
							<PostBar post={post} />
							<div className="ml-12 mt-[12px]">{post.content}</div>
						</div>
						<div className="flex mt-5">
							<UserAvatar name={data?.user?.name || ""} image="" />
							<textarea
								value={content || ""}
								onChange={(e) => setContent(e.target.value)}
								className=" bg-background w-full h-24 text-md p-2 outline-none resize-none placeholder:font-normal border border-white-100 ml-2"
								placeholder="Write Your Comment..."
							/>
						</div>
						{errors.content && (
							<span className=" font-medium ml-12 mt-3 inline-block">
								{errors.content}
							</span>
						)}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={submit}>Submit</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
