"use client";
import { Utils } from "@/utils";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function Explore() {
	const router = useRouter();
	const [query, setQuery] = useState<string>("");

	const submit = (e: FormEvent) => {
		e.preventDefault();
		router.replace(`/explore?query=${query}`);
	};
	console.log(query);
	return (
		<div className="mt-4">
			<form onSubmit={submit}>
				<input
					placeholder="Search @username or name"
					type="text"
					className=" bg-muted rounded-2xl h-14 p-3 outline-none w-full "
					value={query}
					onChange={(e) => setQuery(Utils.replaceSpaces(e.target.value, "-"))}
				/>
			</form>
		</div>
	);
}
