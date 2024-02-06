import Env from "@/config/env";
import { headers } from "next/headers";

export async function getPosts() {
	try {
		const res = await fetch(`${Env.APP_URL}/api/post`, {
			headers: headers(),
			cache: "no-cache",
			next: {
				revalidate: 3600,
			},
		});
		if (!res.ok) throw new Error("Failed to fetch data");
		const response = await res.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}
