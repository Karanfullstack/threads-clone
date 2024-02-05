"use client";
import { Image } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { Button } from "../ui/button";
import React from "react";
import ImagePreview from "../common/ImagePreview";
export default function AddThread() {
	const [file, setFile] = React.useState<File | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const fileRef = React.useRef<HTMLInputElement | null>(null);
	const [content, setContent] = React.useState<string>("");
	console.log(content);
	// target inputFile onclick
	const handelFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};

	// onchange function for image
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target?.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			const url = URL.createObjectURL(selectedFile);
			setImageUrl(url);
		}
	};

	const removeImage = () => {
		setImageUrl(null);
		setFile(null);
	};
	return (
		<section className="mt-5">
			{imageUrl && <ImagePreview image={imageUrl} callback={removeImage} />}
			<div className="flex justify-start items-start space-x-2">
				<UserAvatar name="karan" image="" />
				<textarea
					onChange={(e) => setContent(e.target.value)}
					className="w-full h-20 p-2 resize-none placeholder:font-normal bg-muted outline-none rounded-lg"
				></textarea>
			</div>
			<div className="flex justify-between items-center space-x-12 mt-5">
				<input
					type="file"
					ref={fileRef}
					onChange={handleFileChange}
					className="hidden"
					id="file"
				/>
				<Image
					className=" cursor-pointer"
					onClick={handelFile}
					height={23}
					width={23}
				/>
				<Button disabled={length(content)}>Post</Button>
			</div>
		</section>
	);
}

const length = function (content: string) {
	if (content === "" || content?.length === 0 || content?.length < 7) {
		return true;
	}
	return false;
};
