import { Suspense } from "react";
import { MainView } from "../components/Home/MainView";
import { Sidebar } from "../components/Sidebar";

export default function Page() {
	return (
		<div className="relative flex h-full w-full">
			<Sidebar />
			<Suspense fallback="LOADING..">
				<MainView />
			</Suspense>
		</div>
	);
}
