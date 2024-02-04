"use client";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, User2 } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import NavList from "./NavList";
import Link from "next/link";

export default function MenuBar() {
	return (
		<nav className="md:hidden flex justify-between items-center">
			<div>
				<Sheet>
					<SheetTrigger>
						<Menu />
					</SheetTrigger>
					<SheetContent side={"left"}>
						<SheetHeader>
							<SheetTitle>
								<div className="flex justify-start items-center">
									<Image src={logo} height={50} width={50} alt="logo" />
									<h1 className="text-2xl ml-2 font-bold">Threads</h1>
								</div>
							</SheetTitle>
							<SheetDescription>
								<NavList />
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
   <Image src={logo} height={50} width={50} alt="logo" />
   <Link href="#">
    <User2/>
   </Link>
		</nav>
	);
}
