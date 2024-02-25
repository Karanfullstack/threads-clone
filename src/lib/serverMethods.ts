import Env from "@/config/env";
import { UserType } from "@/types";
import { headers } from "next/headers";

export async function getPosts() {
	try {
		const res = await fetch(`${Env.APP_URL}/api/post`, {
			headers: headers(),
			cache: "no-cache",
		});
		if (!res.ok) throw new Error("Failed to fetch data");
		const response = await res.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}

// get user posts
export async function getUserPosts() {
	try {
		const res = await fetch(`${Env.APP_URL}/api/user/post`, {
			headers: headers(),
			cache: "no-cache",
		});
		if (!res.ok) throw new Error("Failed to fetch data");
		const response = await res.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}

// get user suggestions

export async function getUserSuggestions() {
	try {
		const users = await fetch(`${Env.APP_URL}/api/user/suggestion`, {
			headers: headers(),
			cache: "no-cache",
		});
		if (!users.ok) throw new Error("Failed to fetch data");
		const response = await users.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}

// get single post by id

export async function getPostById(id: number) {
	try {
		const res = await fetch(`${Env.APP_URL}/api/post/${id}`, {
			headers: headers(),
			cache: "no-cache",
		});
		if (!res.ok) throw new Error("Failed to fetch data");
		const response = await res.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}

// get User's Comments

export async function getUserComments() {
	try {
		const res = await fetch(`${Env.APP_URL}/api/user/comment`, {
			headers: headers(),
			cache: "no-cache",
		});
		const response = await res.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}

// get user by id;

export async function getUserById(id: number) {
	try {
		const res = await fetch(`${Env.APP_URL}/api/user/${id}`, {
			headers: headers(),
			cache: "no-cache",
		});

		const response = await res.json();
		return response.data;
	} catch (error) {
		throw error;
	}
}
