import { Suspense } from "react";
import { MainView } from "../components/Home/MainView";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";

export default function Page() {
	return (
		<Layout>
			<Sidebar />
			<Suspense fallback="LOADING..">
				<MainView />
			</Suspense>
		</Layout>
	);
}
