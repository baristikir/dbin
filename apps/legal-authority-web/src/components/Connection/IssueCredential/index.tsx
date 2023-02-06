import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";
import { Title } from "@dbin/ui";
import { ArrowLeft } from "phosphor-react";
import { SelectCredentialTypeToIssue } from "./SelectCredentialType";
import { IssueBusinessCredentialForm } from "./IssueBusinessCredentialForm";
import { IssueCredentialConnectionQuery } from "../../../../__generated__/IssueCredentialConnectionQuery.graphql";
import { IssueCredentialConnectionInfo_connection$key } from "../../../../__generated__/IssueCredentialConnectionInfo_connection.graphql";

interface Props {
	connectionId: string;
}

export type IssueTypes = "BusinessIdentity";

export const IssueCredentialView = ({ connectionId }: Props) => {
	const router = useRouter();

	const [issueType, setIssueType] = useState<IssueTypes>();

	const connectionData = useLazyLoadQuery<IssueCredentialConnectionQuery>(
		graphql`
			query IssueCredentialConnectionQuery($id: String!) {
				connection(id: $id) {
					id
					...IssueCredentialConnectionInfo_connection
				}
			}
		`,
		{
			id: connectionId,
		}
	);

	const handleBackToConnections = useCallback(() => {
		router.push(`/connections/${connectionId}`);
	}, [connectionId]);

	if (!connectionData) return <div>something went wrong..</div>;

	return (
		<div className="flex h-full min-h-screen w-full flex-col gap-12 px-16 py-24">
			<div className="flex flex-col items-start gap-2">
				<button
					type="button"
					onClick={handleBackToConnections}
					className="relative flex flex-shrink-0 items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 font-medium transition-colors duration-100 hover:bg-gray-50"
				>
					<ArrowLeft weight="bold" className="h-4 w-4" />
					<p>Back</p>
				</button>
				<div className="relative w-full">
					<Title>Issue New Credential to</Title>
				</div>
				<ConnectionInfo queryRef={connectionData.connection} />
				{!issueType ? (
					<SelectCredentialTypeToIssue setType={setIssueType} />
				) : (
					<div className="relative mt-4 w-full">
						<IssueBusinessCredentialForm connId={connectionData.connection.id} />
					</div>
				)}
			</div>
		</div>
	);
};

interface ConnectionInfoProps {
	queryRef: IssueCredentialConnectionInfo_connection$key;
}
const ConnectionInfo = ({ queryRef }: ConnectionInfoProps) => {
	const data = useFragment(
		graphql`
			fragment IssueCredentialConnectionInfo_connection on Connection {
				id
				state
				rawState
				protocol
				protocolVersion
				did
				theirDid
				theirLabel
			}
		`,
		queryRef
	);

	return (
		<div className="grid w-full grid-cols-3 gap-2 rounded-lg bg-gray-50 p-2.5">
			<div className="flex flex-col">
				<p className="text-sm text-gray-500">Other Agent's Label</p>
				<p className="font-medium">{data.theirLabel}</p>
			</div>
		</div>
	);
};
