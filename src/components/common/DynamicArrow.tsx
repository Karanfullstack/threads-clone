"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
export default function DynamicArrow({ title }: { title: string }) {
	const router = useRouter();
	return (
		<div className="flex  space-x-4 items-center">
			<MoveLeft
				size={30}
				width={30}
				className="cursor-pointer"
				onClick={() => router.back()}
			/>
			<h1 className="font-bold text-xl">{title}</h1>
		</div>
	);
}
