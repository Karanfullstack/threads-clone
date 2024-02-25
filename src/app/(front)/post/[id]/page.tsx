import Comments from "@/components/common/Comments";
import DynamicArrow from "@/components/common/DynamicArrow";
import PostCard from "@/components/common/PostCard";
import { getPostById } from "@/lib/serverMethods";
import { CommentType, PostType } from "@/types";
import { permanentRedirect } from "next/navigation";
import React from "react";

export default async function ShowPost({ params }: { params: { id: number } }) {
	const post: PostType = await getPostById(params.id);
	if (!post) permanentRedirect("/");
	return (
		<div>
			<DynamicArrow title="back" />
			{post && (
				<div className="mt-7">
					<PostCard post={post} flagLink={true} />
				</div>
			)}
			<div>
				<span className=" font-bold text-lg">Comments</span>
				{post?.comments?.map((comment: CommentType) => (
					<Comments comment={comment} flag={true} key={comment.id} />
				))}
				{post?.comments?.length === 0 && <p>No comments yet</p>}
			</div>
		</div>
	);
}
