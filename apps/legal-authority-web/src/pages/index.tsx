import { Suspense } from "react";
import { Container } from "../components/Container";
import { MainView } from "../components/Home/MainView";
import { Layout } from "../components/Layout";
import { Sidebar } from "../components/Sidebar";

export default function Page() {
	return (
		<Layout>
			<Sidebar />
			<Container>
				<Suspense fallback="LOADING..">
					<MainView />
				</Suspense>
			</Container>
		</Layout>
	);
}
