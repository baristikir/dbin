import loadSerializableQuery from "../../../src/relay/loadSerializableQuery";
import { ClientView } from "./ClientView";
import ConnectionViewQueryNode, {
	ConnectionViewQuery,
} from "../../../__generated__/ConnectionViewQuery.graphql";

export default async function Page({
	params,
}: {
	params: { connectionId: string };
}) {
	const preloadedQuery = await loadSerializableQuery<
		typeof ConnectionViewQueryNode,
		ConnectionViewQuery
	>(ConnectionViewQueryNode.params, { id: params.connectionId });

	return <ClientView preloadedQuery={preloadedQuery} />;
}
