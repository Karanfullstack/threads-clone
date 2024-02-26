import DynamicArrow from "@/components/common/DynamicArrow";
import Explore from "@/components/common/Explore";
import UserListCard from "@/components/common/UserListCard";
import { getExplore } from "@/lib/serverMethods";
import { UserType } from "@/types";
import React from "react";

export default async function page({
	searchParams,
}: {
	searchParams: { [key: string]: string | undefined };
}) {
	const query = searchParams.query;
	const users: UserType[] | [] = await getExplore(query ?? "");
	console.log(users);
	return (
		<div>
			<DynamicArrow title="Explore" />
			<Explore />
			<div>
				{users.length > 0 &&
					query &&
					users?.map((user) => (
						<UserListCard
							key={user.id}
							name={user.name}
							username={user.username}
							id={user.id}
						/>
					))}
				{users.length <= 0 && (
					<h1 className=" text-center mt-10 text-2xl">No User Found</h1>
				)}
			</div>
		</div>
	);
}
