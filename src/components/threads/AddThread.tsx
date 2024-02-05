"use client";
import { Image } from "lucide-react";
import UserAvatar from "../common/UserAvatar";
import { Button } from "../ui/button";
import React from "react";
import axios from "axios";
import ImagePreview from "../common/ImagePreview";
import { PostErrorType } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function AddThread() {
	const { toast } = useToast();
	const router = useRouter();
	const [errors, setErrors] = React.useState<PostErrorType>({});
	const [loading, setLoading] = React.useState<boolean>(false);
	const [file, setFile] = React.useState<File | null>(null);
	const [imageUrl, setImageUrl] = React.useState<string | null>(null);
	const fileRef = React.useRef<HTMLInputElement | null>(null);
	const [content, setContent] = React.useState<string>("");

	// target inputFile onclick
	const handelFile = () => {
		if (fileRef.current) {
			fileRef.current.click();
		}
	};

	const handelPost = () => {
		setLoading(true);
		const formData = new FormData();
		formData.append("content", content);
		if (file) formData.append("image", file);
		axios
			.post("/api/post", formData)
			.then((res) => {
				console.log(res);
				const response = res.data;
				if (response.status == 400) {
					setErrors(response.errors);
				} else if (response.status == 200) {
					setContent("");
					setImageUrl(null);
					setFile(null);
					toast({
						title: "success",
						description: "Post created successfully",
						className: "bg-green-500 text-white",
						duration: 1000,
					});
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
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
		setErrors({});
		setFile(null);
	};
	return (
		<section className="mt-5">
			{imageUrl && <ImagePreview image={imageUrl} callback={removeImage} />}
			<div className="flex justify-start items-start space-x-2">
				<UserAvatar name="karan" image="" />
				<textarea
					value={content || ""}
					onChange={(e) => setContent(e.target.value)}
					className="w-full h-20 p-2 resize-none placeholder:font-normal bg-muted outline-none rounded-lg"
				></textarea>
			</div>
			<span className="text-center mt-4 flex justify-center w-fit m-auto">
				{errors && errors.content}
			</span>
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
				<Button disabled={length(content)} onClick={handelPost}>
					Post
				</Button>
			</div>
		</section>
	);
}

const length = function (content: string) {
	if (content === "" || content?.length === 0 || content?.length < 3) {
		return true;
	}
	return false;
};
