import { getUserSuggestions } from "@/lib/serverMethods";
import UserListCard from "../common/UserListCard";
import { UserType } from "@/types";

export default async function RightBar() {
	const suggestions: Array<UserType> | [] = await getUserSuggestions();

	return (
		<div className="border-l-2 h-screen lg:w-1/4 lg:p-5 hidden lg:block">
			<h1 className="text-2xl font-bold">Suggested for you</h1>
			{suggestions.map((item) => (
				<UserListCard
					name={item.name}
					id={item.id}
					username={item.username}
					key={item.id}
				/>
			))}
		</div>
	);
}
