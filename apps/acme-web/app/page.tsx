import loadSerializableQuery from "../src/relay/loadSerializableQuery";
import ClientView from "./ClientView";
import HomeViewConnectionsQueryNode, {
	HomeViewConnectionsQuery,
} from "../__generated__/HomeViewConnectionsQuery.graphql";

export default async function Web() {
	// const preloadedQuery = await loadSerializableQuery<
	// 	typeof HomeViewConnectionsQueryNode,
	// 	HomeViewConnectionsQuery
	// >(HomeViewConnectionsQueryNode.params, {});

	return <ClientView />;
}
