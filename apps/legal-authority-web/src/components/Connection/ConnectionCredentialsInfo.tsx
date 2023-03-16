import { Button } from "@dbin/ui";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { graphql, useFragment, useMutation } from "react-relay";
import { ConnectionCredentialsInfoAcceptMutation } from "../../../__generated__/ConnectionCredentialsInfoAcceptMutation.graphql";
import { ConnectionCredentialsInfo_message$key } from "../../../__generated__/ConnectionCredentialsInfo_message.graphql";

interface Props {
	queryRef: ConnectionCredentialsInfo_message$key;
}

export const ConnectionCredentialInfo = ({ queryRef }: Props) => {
	const router = useRouter();
	const data = useFragment(
		graphql`
			fragment ConnectionCredentialsInfo_message on ConnectionCredentialMessage
			@relay(plural: true) {
				credentialId
				credentialState
				proposal {
					credentialDefinitionId
					schemaId
					schemaName
					schemaIssuerDid
					schemaVersion
					issuerDid
				}
				attributes {
					mime
					name
					value
				}
			}
		`,
		queryRef
	);

	const [acceptProposal, isInFlight] =
		useMutation<ConnectionCredentialsInfoAcceptMutation>(
			graphql`
				mutation ConnectionCredentialsInfoAcceptMutation(
					$input: AcceptProposalInput!
				) {
					acceptProposal(input: $input) {
						status
						payload
					}
				}
			`
		);

	const handleAcceptProposalClick = useCallback(
		(credentialId: string) => {
			const { connectionId } = router.query;
			if (!connectionId || typeof connectionId !== "string") {
				console.log("[error]: Router query parameter seems not correct.");
				return null;
			}

			acceptProposal({
				variables: {
					input: {
						connectionId,
						credentialId,
					},
				},
			});
		},
		[router.query]
	);

	return (
		<div>
			<p className="text-xl font-semibold">Credential Messages</p>
			<div className="mt-4 flex w-full flex-col gap-6">
				{data?.map((message, idx) => (
					<div
						key={idx}
						className="flex flex-col rounded-md bg-gray-50 p-4 dark:bg-gray-700"
					>
						<div>
							<p className="font-medium">
								Credential Definition ID (registered on Ledger)
							</p>
							<p className="truncate">{message.proposal.credentialDefinitionId}</p>
						</div>
						<div>
							<p className="font-medium">Credential Status</p>
							<p className="truncate">{message.credentialState}</p>
						</div>
						<div className="mt-2 grid place-items-start">
							<p className="font-semibold">
								Credential Proposal Attributes and Values:
							</p>
							{message.attributes.map((attr, idx) => (
								<div key={idx} className="flex items-start gap-4">
									<div className="w-full max-w-[200px]">
										<p>{attr.name}: </p>
									</div>
									<div>
										<p>{attr.value}</p>
									</div>
								</div>
							))}
						</div>
						{message.credentialState !== "done" ? (
							<div className="mt-4 flex items-center gap-4">
								<Button
									size="sm"
									onClick={() => handleAcceptProposalClick(message.credentialId)}
								>
									Accept Proposal
								</Button>
							</div>
						) : null}
					</div>
				))}
			</div>
		</div>
	);
};
