import loadSerializableQuery from "../src/relay/loadSerializableQuery";
import ClientView from "./ClientView";
import MainViewQueryNode, {
	MainViewQuery,
} from "../__generated__/MainViewQuery.graphql";
import { Suspense } from "react";

export default async function Page() {
	const preloadedQuery = await loadSerializableQuery<
		typeof MainViewQueryNode,
		MainViewQuery
	>(MainViewQueryNode.params, {});

	return (
		<Suspense fallback="LOADING..">
			<ClientView preloadedQuery={preloadedQuery} />
		</Suspense>
	);
}
