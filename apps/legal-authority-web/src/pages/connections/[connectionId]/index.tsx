import { useRouter } from "next/router";
import { Suspense } from "react";
import { ConnectionView } from "../../../components/Connection";
import { Container } from "../../../components/Container";
import { Layout } from "../../../components/Layout";
import { Loading } from "../../../components/Loading";
import { Sidebar } from "../../../components/Sidebar";

export default function Page() {
	const router = useRouter();

	return (
		<Layout>
			<Sidebar />
			<Suspense fallback={<Loading />}>
				{/** router is needed for the query params to be loaded from the url, which will fail initially because of initial server render phase of next.js. So just ensuring the router is ready before rendering the component here */}
				<Container>{router.isReady ? <ConnectionView /> : <Loading />}</Container>
			</Suspense>
		</Layout>
	);
}
