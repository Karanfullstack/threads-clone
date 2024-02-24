import React from "react";
import UserAvatar from "./UserAvatar";
import { CommentType } from "@/types";
import { Utils } from "@/utils";
import Link from "next/link";

export default function Comments({
	comment,
	flag,
}: {
	comment: CommentType;
	flag?: boolean;
}) {
	return (
		<div className="mb-3 mt-3">
			<div className="flex items-center space-x-4">
				<UserAvatar name={comment?.user?.name || ""} image="" />
				<div className=" rounded-md w-full bg-muted p-4">
					<div className="flex justify-between items-start w-full">
						<span>@{comment.user.username}</span>
						<span>{Utils.formatDaate(comment.created_at)}</span>
					</div>
					{!flag && (
						<Link href={`/post/${comment.post_id}`} className="w-full">
							{comment.content}
						</Link>
					)}
					{comment.content}
				</div>
			</div>
		</div>
	);
}
