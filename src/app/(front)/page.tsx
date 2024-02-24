import logo from "../../../public/logo.svg";
import AddThread from "@/components/threads/AddThread";
import PostCard from "@/components/common/PostCard";
import Image from "next/image";
import { getPosts } from "@/lib/serverMethods";
import { PostType } from "@/types";

export default async function Home() {
	const posts: Array<PostType> | [] = await getPosts();

	return (
		<div>
			<div className="flex justify-center items-center">
				<Image
					className="hidden md:block"
					src={logo}
					height={40}
					width={40}
					alt="logo"
				/>
			</div>
			<AddThread />

			<div>
				{posts.map((item: PostType) => (
					<PostCard post={item} key={item.id} />
				))}
			</div>
		</div>
	);
}
