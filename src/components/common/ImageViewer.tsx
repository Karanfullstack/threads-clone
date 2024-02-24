"use client";
import React from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

export default function ImageViewer({ image }: { image: string }) {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Image
					src={`/uploads/${image}`}
					alt="image"
					height={100}
					width={100}
					className="w-full object-cover h-[400px] mb-5"
				/>
			</SheetTrigger>
			<SheetContent side={"bottom"}>
				<SheetHeader>
					<SheetTitle>Image Preview</SheetTitle>
					<SheetDescription className="flex justify-center mb-4 items-center">
						<Image
							src={`/uploads/${image}`}
							alt="image"
							height={100}
							width={100}
							className="w-full object-contain h-[500px] "
						/>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
