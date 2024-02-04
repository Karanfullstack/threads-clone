import { Bell, Home, Search, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ThemeToogle } from "./ThemeToggle";
export default function NavList() {
	const path = usePathname();
	return (
		<div className="mt-10 ">
			<ul className="">
				<li className=" w-fit">
					<Link
						href="/"
						className={`flex items-center hover:font-bold justify-start space-x-4 ${
							path === "/" && "font-bold"
						}`}
					>
						<Home />
						<h3 className="lg:text-lg">Home</h3>
					</Link>
				</li>
				<li className=" w-fit mt-6">
					<Link
						href="/explore"
						className={`flex items-center hover:font-bold justify-start space-x-4 ${
							path === "/explore" && "font-bold"
						}`}
					>
						<Search />
						<h3 className="lg:text-lg">Explore</h3>
					</Link>
				</li>
				<li className=" w-fit mt-6">
					<Link
						href="/notifications"
						className={`flex items-center hover:font-bold justify-start space-x-4 ${
							path === "/notifications" && "font-bold"
						}`}
					>
						<Bell />
						<h3 className="lg:text-lg">Notifications</h3>
					</Link>
				</li>
				<li className=" w-fit mt-6">
					<Link
						href="/profile"
						className={`flex items-center hover:font-bold justify-start space-x-4 ${
							path === "/profile" && "font-bold"
						}`}
					>
						<User2 height={25} width={25} />
						<h3 className="lg:text-lg">Profile</h3>
					</Link>
				</li>
				<li className="flex items-center gap-3 bottom-10  absolute">
					<div>
						<Button>Signout</Button>
					</div>
					<ThemeToogle />
				</li>
			</ul>
		</div>
	);
}
