import Image from "next/image";
import MenuBar from "../common/MenuBar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import logo from "../../../public/logo.svg";
import AddThread from "../threads/AddThread";
import PostCard from "../common/PostCard";
export default function BaseComponent() {
	return (
		<div className="md:container p-5">
			<div className="flex">
				<LeftBar />

				<div className="h-screen w-full lg:w-2/4 md:w-3/4 xl:px-12 lg:px-6 lg:py-4">
					<MenuBar />
					<div className="flex justify-center items-center">
						<Image
							className="hidden md:block"
							src={logo}
							height={40}
							width={40}
							alt="logo"
						/>
					</div>
					<AddThread />
					<div>
						<PostCard />
					</div>
				</div>
				<RightBar />
			</div>
		</div>
	);
}
