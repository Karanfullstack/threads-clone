import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import { UserType } from "@/types";


export default function UserListCard({ name, id, username }: UserType) {
	return (
		<div className="w-full p-4 mt-5">
			<div className="flex justify-between items-center shadow-sm  p-2   gap-2">
				<div className="flex gap-2">
					<UserAvatar name={name || "T"} image="" />
					<div className="flex flex-col">
						<strong>{name}</strong>

						<span className=" font-light text-xs">@{username}</span>
					</div>
				</div>
				<div>
					<Link href={`/user/${id}`}>
						<Button>View</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
