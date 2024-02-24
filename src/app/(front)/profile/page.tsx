import {
	CustomSessionType,
	authOptions,
} from "@/app/api/auth/[...nextauth]/options";
import UserAvatar from "@/components/common/UserAvatar";
import { getServerSession } from "next-auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentType, PostType } from "@/types";
import { getUserComments, getUserPosts } from "@/lib/serverMethods";
import PostCard from "@/components/common/PostCard";
import DynamicArrow from "@/components/common/DynamicArrow";
import Comments from "@/components/common/Comments";

export default async function page() {
	const session: CustomSessionType | null = await getServerSession(authOptions);
	const posts: Array<PostType> | [] = await getUserPosts();
	const comments: Array<CommentType> | [] = await getUserComments();

	return (
		<section>
			{/* dynamic arrow */}
			<DynamicArrow title="Profile" />
			<div className="flex  items-center space-x-2">
				<UserAvatar
					name="karan"
					className="text-2xl font-bold h-20 w-20 mt-4"
					image=""
				/>

				<div>
					<h1 className="text-sxl">{session?.user?.name}</h1>
					<p className="text-md text-orange-300">{session?.user?.username}</p>
					<p className="text-xl">{session?.user?.email}</p>
				</div>
			</div>
			<div className="mt-6">
				<Tabs defaultValue="posts" className="w-full ">
					<TabsList className="w-full">
						<TabsTrigger className="w-full" value="posts">
							Posts
						</TabsTrigger>
						<TabsTrigger className="w-full" value="comments">
							Comments
						</TabsTrigger>
					</TabsList>
					<TabsContent value="posts">
						{posts && posts.length < 1 && (
							<h1 className="mt-5 text-center text-xl font-bold">
								No Post Found
							</h1>
						)}
						{posts?.map((item) => (
							<PostCard post={item} key={item.id} />
						))}
					</TabsContent>
					<TabsContent value="comments">
						{comments.map((comment: CommentType) => (
							<Comments comment={comment} />
						))}
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
