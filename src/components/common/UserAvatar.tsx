import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({
	name,
	image,
	className = "",
}: {
	image: string;
	name: string;
	className?: string;
}) {
	return (
		<Avatar className={className}>
			<AvatarImage src={image} />
			<AvatarFallback>{name[0]}</AvatarFallback>
		</Avatar>
	);
}
