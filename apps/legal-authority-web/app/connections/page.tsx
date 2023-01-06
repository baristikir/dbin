import ClientView from "./ClientView";
import loadSerializableQuery from "../../src/relay/loadSerializableQuery";
import ConnectionsViewQueryNode, {
	ConnectionsViewQuery,
} from "../../__generated__/ConnectionsViewQuery.graphql";

export default async function Page() {
	const preloadedQuery = await loadSerializableQuery<
		typeof ConnectionsViewQueryNode,
		ConnectionsViewQuery
	>(ConnectionsViewQueryNode.params, {});

	console.log("connections/page.tsx");

	return <ClientView preloadedQuery={preloadedQuery} />;
}
