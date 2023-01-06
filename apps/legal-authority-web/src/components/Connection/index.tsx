import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
import { ConnectionDetailContent } from "./Content";
import { ConnectionViewQuery } from "../../../__generated__/ConnectionViewQuery.graphql";

interface Props {
	queryRef: PreloadedQuery<ConnectionViewQuery>;
}
export const ConnectionView = ({ queryRef }: Props) => {
	const data = usePreloadedQuery(
		graphql`
			query ConnectionViewQuery($id: String!) {
				connection(id: $id) {
					...Content_connection
				}
			}
		`,
		queryRef
	);

	return (
		<div className="relative flex h-full flex-col gap-12 px-16 py-24">
			<ConnectionDetailContent queryRef={data.connection} />
		</div>
	);
};
