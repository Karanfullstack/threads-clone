import UserAvatar from "@/components/common/UserAvatar";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommentType, ShowUserType } from "@/types";
import { getUserById } from "@/lib/serverMethods";
import PostCard from "@/components/common/PostCard";
import DynamicArrow from "@/components/common/DynamicArrow";
import Comments from "@/components/common/Comments";

export default async function page({ params }: { params: { id: number } }) {
	const data: ShowUserType | null = await getUserById(params.id);

	return (
		<section>
			{/* dynamic arrow */}
			<DynamicArrow title="User's Profile" />
			<div className="flex  items-center space-x-2">
				<UserAvatar
					name={data?.name || "T"}
					className="text-2xl font-bold h-20 w-20 mt-4"
					image=""
				/>

				<div>
					<h1 className="text-sxl">{data?.name}</h1>
					<p className="text-md text-orange-300">{data?.username}</p>
					<p className="text-xl">{data?.email}</p>
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
						{data?.Post && data.Post.length < 1 && (
							<h1 className="mt-5 text-center text-xl font-bold">
								No Post Found
							</h1>
						)}
						{data?.Post?.map((item) => (
							<PostCard post={item} key={item.id} />
						))}
					</TabsContent>
					<TabsContent value="comments">
						{data?.comments?.map((comment: CommentType) => (
							<Comments comment={comment} key={comment.id} />
						))}
						{!data?.comments?.length && <h1>No Comments</h1>}
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
