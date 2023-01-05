"use client";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import Loading from "./loading";
import { getCurrentEnvironment, responseCache } from "../src/relay/environment";
import { SerializablePreloadedQuery } from "../src/relay/loadSerializableQuery";
import useSerializablePreloadedQuery from "../src/relay/useSerializablePreloadedQuery";
import { HomeView } from "../src/components/Home";
import HomeViewConnectionsQueryNode, {
	HomeViewConnectionsQuery,
} from "../__generated__/HomeViewConnectionsQuery.graphql";
import { atom, useAtom } from "jotai";

interface Props {
	// preloadedQuery: SerializablePreloadedQuery<
	// 	typeof HomeViewConnectionsQueryNode,
	// 	HomeViewConnectionsQuery
	// >;
}

export const homeFetchKeyAtom = atom<number>(0);
export const readHomeFetchKeyAtom = atom<number>((get) =>
	get(homeFetchKeyAtom)
);
export const handleHomeFetchKeyUpdateAtom = atom(
	null,
	(_, set, update: number) => {
		set(homeFetchKeyAtom, update);
	}
);
export default function ClientView({}: Props) {
	const environment = getCurrentEnvironment();
	// const queryRef = useSerializablePreloadedQuery(
	// 	environment,
	// 	preloadedQuery,
	// 	"store-and-network",
	// 	setFetchKey
	// );

	return (
		<RelayEnvironmentProvider environment={environment}>
			<Suspense fallback={<Loading />}>
				<HomeView />
			</Suspense>
		</RelayEnvironmentProvider>
	);
}
