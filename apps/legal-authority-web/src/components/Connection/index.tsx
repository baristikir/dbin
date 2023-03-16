import { useRouter } from "next/router";
import { graphql, useLazyLoadQuery } from "react-relay";
import { ConnectionDetailContent } from "./Content";
import { ConnectionViewQuery } from "../../../__generated__/ConnectionViewQuery.graphql";
import { ConnectionCredentialInfo } from "./ConnectionCredentialsInfo";

interface Props {}
export const ConnectionView = ({}: Props) => {
	const router = useRouter();
	const { connectionId } = router.query;
	const data = useLazyLoadQuery<ConnectionViewQuery>(
		graphql`
			query ConnectionViewQuery($id: String!) {
				connection(id: $id) {
					...Content_connection
					messages {
						...ConnectionCredentialsInfo_message
					}
				}
			}
		`,
		{ id: connectionId as string },
		{ fetchKey: typeof connectionId === "string" ? connectionId : undefined }
	);

	if (!data.connection) {
		return <div>Connection not loaded yet. Try refreshing the page.</div>;
	}

	return (
		<div className="relative flex h-full flex-col gap-12 p-4 sm:py-6 sm:px-8 xl:py-24 xl:px-16">
			<ConnectionDetailContent queryRef={data.connection} />
			<ConnectionCredentialInfo queryRef={data.connection.messages} />
		</div>
	);
};
