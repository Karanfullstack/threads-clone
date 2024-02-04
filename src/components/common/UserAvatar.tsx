import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
	name,
	image,
}: {
	image: string;
	name: string;
}) {
	return (
		<Avatar>
			<AvatarImage src={image} />
			<AvatarFallback>{name[0]}</AvatarFallback>
		</Avatar>
	);
}
