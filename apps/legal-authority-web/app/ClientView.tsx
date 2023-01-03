"use client";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { MainView } from "../src/components/Home/MainView";
import { getCurrentEnvironment } from "../src/relay/environment";
import { SerializablePreloadedQuery } from "../src/relay/loadSerializableQuery";
import useSerializablePreloadedQuery from "../src/relay/useSerializablePreloadedQuery";
import MainViewQueryNode, {
	MainViewQuery,
} from "../__generated__/MainViewQuery.graphql";
import Loading from "./loading";

interface Props {
	preloadedQuery: SerializablePreloadedQuery<
		typeof MainViewQueryNode,
		MainViewQuery
	>;
}

function ClientView({ preloadedQuery }: Props) {
	const environment = getCurrentEnvironment();
	const queryRef = useSerializablePreloadedQuery(environment, preloadedQuery);

	return (
		<RelayEnvironmentProvider environment={environment}>
			<Suspense fallback={<Loading />}>
				<MainView queryRef={queryRef} />
			</Suspense>
		</RelayEnvironmentProvider>
	);
}

export default ClientView;
