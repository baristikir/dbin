"use client";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import Loading from "../loading";
import { ConnectionsView } from "../../src/components/Connections";
import { getCurrentEnvironment } from "../../src/relay/environment";
import { SerializablePreloadedQuery } from "../../src/relay/loadSerializableQuery";
import useSerializablePreloadedQuery from "../../src/relay/useSerializablePreloadedQuery";
import ConnectionsViewQueryNode, {
	ConnectionsViewQuery,
} from "../../__generated__/ConnectionsViewQuery.graphql";

interface Props {
	preloadedQuery: SerializablePreloadedQuery<
		typeof ConnectionsViewQueryNode,
		ConnectionsViewQuery
	>;
}

export default function ClientView({ preloadedQuery }: Props) {
	const environment = getCurrentEnvironment();
	const queryRef = useSerializablePreloadedQuery(environment, preloadedQuery);

	return (
		<RelayEnvironmentProvider environment={environment}>
			<Suspense fallback={<Loading />}>
				<ConnectionsView queryRef={queryRef} />
			</Suspense>
		</RelayEnvironmentProvider>
	);
}
