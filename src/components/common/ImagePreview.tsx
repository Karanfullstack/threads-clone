import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type ImaagePreviewProps = {
	image: string;
	callback?: () => void;
	className?: string;
};
export default function ImagePreview({ image, callback }: ImaagePreviewProps) {
	const style = {
		backgroundImage: `url(${image})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};

	return (
		<div className="w-full h-72 object-cover rounded-md mb-5" style={style}>
			<div className="text-right mr-2">
				{callback && (
					<Button size="icon" onClick={callback}>
						<X />
					</Button>
				)}
			</div>
		</div>
	);
}
