import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export default function ImagePreview({
	image,
	callback,
}: {
	image: string;
	callback: () => void;
}) {
	const style = {
		backgroundImage: `url(${image})`,
		backgroundSize: "cover",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
	};

	return (
		<div className="w-full h-72 bg-cover mb-5" style={style}>
			<div className="text-right mr-2">
				<Button size="icon" onClick={callback}>
					<X />
				</Button>
			</div>
		</div>
	);
}
