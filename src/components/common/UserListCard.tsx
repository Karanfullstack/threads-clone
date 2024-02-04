import Link from "next/link";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";

export default function UserListCard() {
	return (
		<div className="w-full p-4 mt-5">
			<div className="flex justify-between items-center shadow-sm  p-2   gap-2">
				<div className="flex gap-2">
					<UserAvatar name="Karan" image="" />
					<div className="flex flex-col">
						<strong>Karan</strong>
						<span className=" font-light text-xs">@karan211</span>
					</div>
				</div>
				<div>
					<Link href="#">
						<Button>View</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}