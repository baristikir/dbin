import { Suspense } from "react";
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
					<h1 className="text-3xl font-medium">Issue Credentials Page</h1>
				</Container>
			</Suspense>
		</Layout>
	);
}
