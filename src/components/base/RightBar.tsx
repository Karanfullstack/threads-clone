import UserListCard from "../common/UserListCard";

export default function RightBar() {
	return (
		<div className="border-l-2 h-screen lg:w-1/4 lg:p-5 hidden lg:block">
			<h1 className="text-2xl font-bold">Suggested for you</h1>
			<UserListCard />
		</div>
	);
}
