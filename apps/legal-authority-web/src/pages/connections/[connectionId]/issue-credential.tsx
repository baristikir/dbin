import { ErrorBoundary } from "@dbin/ui";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { IssueCredentialView } from "../../../components/Connection/IssueCredential";
import { Container } from "../../../components/Container";
import { Layout } from "../../../components/Layout";
import { Loading } from "../../../components/Loading";
import { Sidebar } from "../../../components/Sidebar";

export default function Page() {
	const router = useRouter();
	let connectionId =
		"connectionId" in router.query && router.query.connectionId
			? String(router.query.connectionId)
			: null;

	return (
		<Layout>
			<Sidebar />
			{router.query.connectionId ? (
				<Container>
					<Suspense fallback={<Loading />}>
						<IssueCredentialView connectionId={String(router.query.connectionId)} />
					</Suspense>
				</Container>
			) : (
				<Loading />
			)}
		</Layout>
	);
}
