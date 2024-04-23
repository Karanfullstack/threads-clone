import DynamicArrow from "@/components/common/DynamicArrow";
import UserAvatar from "@/components/common/UserAvatar";
import { getNotifications } from "@/lib/serverMethods";
import { NotificationType } from "@/types";
import { Utils } from "@/utils";
import React from "react";

export default async function page() {
	const notifications: NotificationType[] | [] = await getNotifications();

	return (
		<div>
			<DynamicArrow title="Notifications" />
			{!notifications.length && (
				<h1 className="mt-5 text-xl">No Notification</h1>
			)}
			{notifications?.map((item: NotificationType) => (
				<div key={item.id} className="flex items-start mt-4 space-x-4">
					<UserAvatar name={item?.user?.name || "R"} image="" />
					<div className=" bg-muted w-full rounded-lg p-4">
						<div className="flex justify-between items-start w-full">
							<p>@{item.user.username}</p>
							<div>
								<span>{Utils.formatDaate(item.created_at)}</span>
							</div>
						</div>
						<span className="mt-4 inline-block">{item.content}</span>
					</div>
				</div>
			))}
		</div>
	);
}
