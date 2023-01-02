import loadSerializableQuery from "../src/relay/loadSerializableQuery";
import ClientView from "./ClientView";
import MainViewQueryNode, {
	MainViewQuery,
} from "../__generated__/MainViewQuery.graphql";

export default async function Page() {
	const preloadedQuery = await loadSerializableQuery<
		typeof MainViewQueryNode,
		MainViewQuery
	>(MainViewQueryNode.params, {});

	return <ClientView preloadedQuery={preloadedQuery} />;
}
