"use client";

import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { getCurrentEnvironment } from "../../../src/relay/environment";
import { SerializablePreloadedQuery } from "../../../src/relay/loadSerializableQuery";
import { ConnectionView } from "../../../src/components/Connection";
import useSerializablePreloadedQuery from "../../../src/relay/useSerializablePreloadedQuery";
import Loading from "../../loading";

import ConnectionViewQueryNode, {
	ConnectionViewQuery,
} from "../../../__generated__/ConnectionViewQuery.graphql";

interface Props {
	preloadedQuery: SerializablePreloadedQuery<
		typeof ConnectionViewQueryNode,
		ConnectionViewQuery
	>;
}
export function ClientView({ preloadedQuery }: Props) {
	const environment = getCurrentEnvironment();
	const queryRef = useSerializablePreloadedQuery(environment, preloadedQuery);

	return (
		<RelayEnvironmentProvider environment={environment}>
			<Suspense fallback={<Loading />}>
				<ConnectionView queryRef={queryRef} />
			</Suspense>
		</RelayEnvironmentProvider>
	);
}
