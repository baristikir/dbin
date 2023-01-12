import { Suspense } from "react";
import { ConnectionsView } from "../../components/Connections";
import { Container } from "../../components/Container";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { Sidebar } from "../../components/Sidebar";

export default function Page() {
	return (
		<Layout>
			<Sidebar />
			<Suspense fallback={<Loading />}>
				<Container>
					<ConnectionsView />
				</Container>
			</Suspense>
		</Layout>
	);
}
