import { Suspense } from "react";
import { MainView } from "../components/Home/MainView";
import { Sidebar } from "../components/Sidebar";

export default function Page() {
	return (
		<>
			<Sidebar />
			<Suspense fallback="LOADING..">
				<MainView />
			</Suspense>
		</>
	);
}
