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
	const handelFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target?.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			const url = URL.createObjectURL(selectedFile);
			setImageUrl(url);
		}
	};
	console.log(imageUrl);
	const removeImage = () => {
		setImageUrl(null);
		setFile(null);
	};
	return (
		<section className="mt-5">
			{imageUrl && <ImagePreview image={imageUrl} callback={removeImage} />}
			<div className="flex justify-start items-start space-x-2">
				<UserAvatar name="karan" image="" />
				<textarea className="w-full h-20 p-2 resize-none placeholder:font-normal bg-muted outline-none rounded-lg"></textarea>
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
				<Button>Post</Button>
			</div>
		</section>
	);
}
