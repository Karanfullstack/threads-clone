"use client";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import NavList from "../common/NavList";

export default function LeftBar() {
	return (
		<div className=" h-screen  md:w-1/4 border-r-2 md:pt-5 lg:p-10 hidden lg:block relative">
			<div className="flex justify-start items-center">
				<Image src={logo} height={50} width={50} alt="logo" />
				<h1 className="text-2xl ml-2 font-bold">Threads</h1>
			</div>

			{/* navbar */}
			<NavList />
		</div>
	);
}
