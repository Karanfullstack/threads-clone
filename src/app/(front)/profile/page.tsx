import {
	CustomSessionType,
	CustomUserType,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import UserAvatar from "@/components/common/UserAvatar";
import { UserType } from "@/types";
import { MoveLeft } from "lucide-react";
import { getServerSession } from "next-auth";
export default async function page() {
	const session: CustomSessionType | null = await getServerSession(authOptions);

	return (
		<section>
			<div className="flex space-x-4 items-center">
				<MoveLeft size={30} width={30} className="cursor-pointer" />
				<h1 className="font-bold text-xl">Profile</h1>
			</div>
			<div className="flex items-center space-x-2">
				<UserAvatar
					name="karan"
					className="text-2xl font-bold h-20 w-20 mt-4"
					image=""
				/>
				<div>
					<h1 className="text-sxl">{session?.user?.name}</h1>
					<p className="text-md text-orange-300">{session?.user?.username}</p>
					<p className="text-xl">{session?.user?.email}</p>
				</div>
			</div>
		</section>
	);
}
