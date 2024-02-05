import React from "react";
import UserAvatar from "./UserAvatar";
import { MoreHorizontal } from "lucide-react";

const PostBar = () => {
	return (
		<div className="flex space-x-2 mt-6 justify-between items-center">
			
			<div className="flex space-x-3 items-start">
   <UserAvatar name="karan" image="" />
   <div className="flex flex-col">
				<strong>Tushar</strong>
				<span>@tushar</span>
			</div>
   </div>
			<div className="flex items-center space-x-2">
				<span>23 min</span>
    <MoreHorizontal/>
			</div>
		</div>
	);
};

export default PostBar;
