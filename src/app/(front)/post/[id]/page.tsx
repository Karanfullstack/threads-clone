import DynamicArrow from "@/components/common/DynamicArrow";
import PostCard from "@/components/common/PostCard";
import { getPostById } from "@/lib/serverMethods";
import React from "react";

export default async function ShowPost({ params }: { params: { id: number } }) {
	const post = await getPostById(params.id);
	console.log(post);
	return (
		<div>
			<DynamicArrow title="back" />
			{post && (
				<div className="mt-7">
					<PostCard post={post}/>
				</div>
			)}
		</div>
	);
}
