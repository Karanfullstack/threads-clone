import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Copy, SendHorizonal } from "lucide-react";
import { useToast } from "../ui/use-toast";

import {
	FacebookShareButton,
	ViberShareButton,
	ViberIcon,
	FacebookIcon,
	InstapaperShareButton,
	InstapaperIcon,
} from "next-share";
export default function SharePost({ url }: { url: string }) {
	const { toast } = useToast();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(url);
		toast({
			title: "Copied to clipboard",
			description: "successfully copied",
		});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<SendHorizonal width={20} height={20} className=" cursor-pointer" />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						<div className="flex justify-between rounded-md border p-5 mt-5">
							<strong>{url}</strong>
							<Copy onClick={copyToClipboard} />
						</div>
						<div className="flex mt-5 justify-start items-center space-x-3">
							{/* facebook */}
							<div>
								<FacebookShareButton
									url={url}
									quote={"@thread share post with your friends and family."}
									hashtag={"#nextshare"}
								>
									<FacebookIcon size={32} round />
								</FacebookShareButton>
							</div>

							{/* twitter */}
							<div>
								<ViberShareButton
									url={"https://github.com/next-share"}
									title={
										"next-share is a social share buttons for your next React apps."
									}
								>
									<ViberIcon size={32} round />
								</ViberShareButton>
							</div>
							{/* insta */}

							<div>
								<InstapaperShareButton
									url={"https://github.com/next-share"}
									title={"Next Share"}
								>
									<InstapaperIcon size={32} round />
								</InstapaperShareButton>
							</div>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
