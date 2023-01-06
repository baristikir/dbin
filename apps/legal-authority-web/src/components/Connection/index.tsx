import { useRouter } from "next/router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ConnectionDetailContent } from "./Content";
import { ConnectionViewQuery } from "../../../__generated__/ConnectionViewQuery.graphql";

interface Props {}
export const ConnectionView = ({}: Props) => {
	const router = useRouter();
	const { connectionId } = router.query;
	const data = useLazyLoadQuery<ConnectionViewQuery>(
		graphql`
			query ConnectionViewQuery($id: String!) {
				connection(id: $id) {
					...Content_connection
				}
			}
		`,
		{ id: connectionId as string },
		{ fetchKey: typeof connectionId === "string" ? connectionId : undefined }
	);

	return (
		<div className="relative flex h-full flex-col gap-12 px-16 py-24">
			<ConnectionDetailContent queryRef={data.connection} />
		</div>
	);
};
