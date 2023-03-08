import { Suspense } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { CredentialSchemaInfo } from "./CredentialSchemaInfo";
import { CredentialDefinitionInfo } from "./CredentialDefinitionInfo";
import { MainViewQuery } from "../../../__generated__/MainViewQuery.graphql";

export function MainView() {
	// GraphQL Query to receive agents information from server.
	// Query gets executed on page visit, resulting in a client-side network request.
	const data = useLazyLoadQuery<MainViewQuery>(
		graphql`
			query MainViewQuery {
				agent {
					label
					isInitialized
					credentialSchema {
						...CredentialSchemaInfo_schema
					}
					credentialDefinition {
						...CredentialDefinitionInfo_definition
					}
				}
			}
		`,
		{},
		{ fetchPolicy: "store-and-network" }
	);

	return (
		<Suspense>
			<div className="relative flex h-full flex-col gap-12 px-16 py-24">
				<div className="flex flex-col">
					<p className="text-xl font-semibold">Agent Status</p>
					<div className="mt-2 grid grid-cols-3">
						<p className="cols-span-1">Label: </p>
						<p className="col-span-2">{data.agent.label}</p>
						<p className="cols-span-1">Status: </p>
						<p className="col-span-2">
							{data.agent.isInitialized === true
								? "Agent ready for usage"
								: "Agent setup not finished.."}
						</p>
					</div>
				</div>
				<div className="flex w-full flex-col items-start gap-10">
					{data.agent.credentialSchema ? (
						<CredentialSchemaInfo queryRef={data.agent.credentialSchema} />
					) : (
						<div>Credential Schema info not available..</div>
					)}
					{data.agent.credentialDefinition ? (
						<CredentialDefinitionInfo queryRef={data.agent.credentialDefinition} />
					) : (
						<div>Credential Definition info not available..</div>
					)}
				</div>
			</div>
		</Suspense>
	);
}
