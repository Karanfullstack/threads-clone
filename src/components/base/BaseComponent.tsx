import MenuBar from "../common/MenuBar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

export default function BaseComponent({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="md:container p-5 mt-0 pb-0">
			<div className="flex">
				<LeftBar />
				<div className="h-screen overflow-y-auto w-full lg:w-2/4 md:w-3/4 xl:px-12 lg:px-6 lg:py-4">
					<MenuBar />
					{children}
				</div>
				<RightBar />
			</div>
		</div>
	);
}
