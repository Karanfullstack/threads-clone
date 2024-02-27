"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export default function DeleteComment({ id }: { id: number }) {
	const { toast } = useToast();
	const router = useRouter();
	const handeleDelete = () => {
		axios
			.delete(`/api/comment/${id}`)
			.then((res) => {
				const response = res.data;
				console.log(response);
				if (response.status === 200) {
					toast({
						title: "Deleted",
						description: response.message,
					});
					router.refresh();
				}
			})
			.catch((err) => {
				console.log("The Error is", err);
			});
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Trash2 />
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handeleDelete}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
