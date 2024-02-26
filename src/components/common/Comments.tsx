import React from "react";
import UserAvatar from "./UserAvatar";
import { CommentType } from "@/types";
import { Utils } from "@/utils";
import Link from "next/link";
import DeleteComment from "../threads/DeleteComment";
import {
	CustomSessionType,
	CustomUserType,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Comments({
	comment,
	flag,
}: {
	comment: CommentType;
	flag?: boolean;
}) {
	const session: CustomSessionType | null = await getServerSession(authOptions);

	const isAuth =
		session && Number(session.user?.id) === comment.user_id ? true : false;

	return (
		<div className="mb-3 mt-3 w-full ">
			<div className="flex items-center space-x-4 ">
				<UserAvatar name={comment?.user?.name || ""} image="" />
				<div className=" rounded-md w-full bg-muted p-4 ">
					<div className="flex justify-between items-center w-full ">
						<span>@{comment.user.username}</span>
						<span>{Utils.formatDaate(comment.created_at)}</span>
					</div>
					{!flag && (
						<Link
							href={`/post/${comment.post_id}`}
							className="w-full cursor-pointer   "
						>
							{comment.content}
						</Link>
					)}
					{flag	&& <p>{comment.content}</p>}
					<div className="flex justify-end">
						{isAuth && <DeleteComment id={comment.id} />}
					</div>
				</div>
			</div>
		</div>
	);
}
