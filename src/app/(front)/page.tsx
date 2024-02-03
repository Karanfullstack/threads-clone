import { ThemeToogle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";


export default async function Home() {
	const session = await getServerSession(authOptions);

	return (
		<div>
			<Button>Post</Button>
			<ThemeToogle />
			<div>{session && JSON.stringify(session, null, 2)}</div>
		</div>
	);
}
