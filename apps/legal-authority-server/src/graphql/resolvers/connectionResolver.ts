import {
	CredentialsApi,
	CredentialState,
	DidExchangeState,
} from "@aries-framework/core";
import { ConnectionService, CredentialService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";
import {
	CONNECTION_CLOSED,
	CONNECTION_TOPICS,
} from "../../subscriptions/connectionsTopics";
import { pubsub } from "../../utils/pubsub";
import { Result, ResultStatus } from "./resultResolver";
import { getCredentialDefinitionId } from "../../schemas";
import { CredentialObjectRef } from "./credentialResolver";
import { GetFormatDataReturn } from "@aries-framework/core/build/modules/proofs/models/ProofServiceOptions";

export const ConnectionObjectRef =
	builder.objectRef<GraphQLObjects.ConnectionObjectType>("Connection");

// TODO Extract into server-lib
function connectionStateToReadable(state: DidExchangeState) {
	switch (state) {
		case DidExchangeState.Completed:
			return "Connection Established";
		case DidExchangeState.RequestReceived:
			return "Connection Processing";
		case DidExchangeState.RequestSent:
			return "Connection Processing";
		default:
			return "Unknown";
	}
}
// TODO Extract into server-lib
function getConnectionProtocolVersion(protocol?: string): "v1" | "v2" | null {
	if (!protocol) return null;

	return protocol.endsWith("/1.0")
		? "v1"
		: protocol.endsWith("/2.0")
		? "v2"
		: null;
}

// let proposalAttributes = [
//     CredentialPreviewAttribute {
//       mimeType: 'text/plain',
//       name: 'company_creation_date',
//       value: 'Fri Jan 01 1999 01:00:00 GMT+0100 (Central European Standard Time)'
//     },
//     CredentialPreviewAttribute {
//       mimeType: 'text/plain',
//       name: 'company_registered_name',
//       value: 'Nestle'
//     },
//     CredentialPreviewAttribute {
//       mimeType: 'text/plain',
//       name: 'company_registered_adress',
//       value: 'Example Adress 123'
//     },
//     CredentialPreviewAttribute {
//       mimeType: 'text/plain',
//       name: 'company_registered_country',
//       value: 'Germany'
//     },
//     CredentialPreviewAttribute {
//       mimeType: 'text/plain',
//       name: 'company_status',
//       value: 'active'
//     }
//   ],

let proposal = {
	indy: {
		schema_issuer_did: "SYiUQo2fGYKkUqk7evkJT1",
		schema_id: "SYiUQo2fGYKkUqk7evkJT1:2:BusinessCredential:1.0",
		schema_name: "BusinessCredential",
		schema_version: "1.0",
		cred_def_id: "SYiUQo2fGYKkUqk7evkJT1:3:CL:13157:BusinessCredentialDefinition",
		issuer_did: "SYiUQo2fGYKkUqk7evkJT1",
	},
};
interface ConnectionCredentialProposal {
	schema_issuer_did: string;
	schema_id: string;
	schema_name: string;
	schema_version: string;
	cred_def_id: string;
	issuer_did: string;
}
interface ConnectionCredentialProposalAttribute {
	mimeType: string;
	name: string;
	value: string;
}
interface ConnectionCredentialMessage {
	credentialId: string;
	credentialState: CredentialState;
	proposal: ConnectionCredentialProposal;
	proposalAttributes: ConnectionCredentialProposalAttribute[];
}
const ConnectionCredentialProposalRef = builder
	.objectRef<ConnectionCredentialProposal>("ConnectionCredentialProposal")
	.implement({
		fields: (t) => ({
			credentialDefinitionId: t.exposeString("cred_def_id"),
			schemaId: t.exposeString("schema_id"),
			schemaIssuerDid: t.exposeString("schema_issuer_did"),
			schemaName: t.exposeString("schema_name"),
			schemaVersion: t.exposeString("schema_version"),
			issuerDid: t.exposeString("issuer_did"),
		}),
	});
const ConnectionCredentialProposalAttributeRef = builder
	.objectRef<ConnectionCredentialProposalAttribute>(
		"ConnectionCredentialProposalAttribute"
	)
	.implement({
		fields: (t) => ({
			mime: t.exposeString("mimeType"),
			name: t.exposeString("name"),
			value: t.exposeString("value"),
		}),
	});

const ConnectionCredentialMessageRef = builder
	.objectRef<ConnectionCredentialMessage>("ConnectionCredentialMessage")
	.implement({
		fields: (t) => ({
			credentialId: t.exposeString("credentialId"),
			credentialState: t.exposeString("credentialState"),
			proposal: t.expose("proposal", { type: ConnectionCredentialProposalRef }),
			attributes: t.expose("proposalAttributes", {
				type: [ConnectionCredentialProposalAttributeRef],
			}),
		}),
	});

// TODO Extract field definitions into server-lib
// https://pothos-graphql.dev/docs/guide/patterns#objects-and-interfaces
ConnectionObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id", {
			description: "Connection Record ID, often known as connectionId",
		}),
		type: t.exposeString("type"),
		rawState: t.exposeString("state"),
		state: t.string({
			resolve: (connection) => connectionStateToReadable(connection.state),
		}),
		rand: t.int({
			resolve: () => Math.floor(new Date().getTime() / 1000),
		}),
		role: t.exposeString("role"),
		did: t.exposeString("did", { nullable: true }),
		alias: t.exposeString("alias", { nullable: true }),
		protocol: t.exposeString("protocol", { nullable: true }),
		protocolVersion: t.string({
			nullable: true,
			resolve: (connection) => getConnectionProtocolVersion(connection.protocol),
		}),
		theirDid: t.exposeString("theirDid", { nullable: true }),
		theirLabel: t.exposeString("theirLabel", {
			nullable: true,
		}),
		threadId: t.exposeString("threadId", { nullable: true }),
		mediatorId: t.exposeString("mediatorId", {
			nullable: true,
		}),
		oobId: t.exposeString("outOfBandId", { nullable: true }),
		invitationDid: t.exposeString("invitationDid", {
			nullable: true,
		}),
		errMessage: t.exposeString("errorMessage", {
			nullable: true,
		}),
		autoAcceptConnection: t.exposeBoolean("autoAcceptConnection", {
			nullable: true,
		}),
		isReady: t.boolean({
			resolve: (parent) => parent.isReady,
		}),
		isRequester: t.boolean({
			resolve: (parent) => parent.isRequester,
		}),
		messages: t.field({
			type: [ConnectionCredentialMessageRef],
			resolve: async (parent, _args, { agent }) => {
				const credentials = await agent.credentials.getAll();
				const credentialsByConnection = credentials.filter(
					(credential) => credential.connectionId === parent.id
				);

				// Temporary solution for type issues from the aries-framework-node library
				type CredentialFormatData = GetFormatDataReturn & {
					credentialId: string;
					proposal: Record<string, ConnectionCredentialProposal>;
					proposalAttributes: ConnectionCredentialProposalAttribute[];
					credentialState: CredentialState;
				};
				let credsData: CredentialFormatData[] = [];
				for (const credential of credentialsByConnection) {
					const credentialPayload = (await agent.credentials.getFormatData(
						credential.id
					)) as any;
					// Temporary solution for type issues from the aries-framework-node library
					credsData.push({
						...credentialPayload,
						credentialId: credential.id,
						credentialState: credential.state,
					});
				}

				// Temporary solution for mismatching types from aries-framework-node lib
				const payload: (ConnectionCredentialMessage & { credentialId: string })[] =
					credsData.map((credential, idx) => ({
						credentialId: credential.credentialId,
						credentialState: credential.credentialState,
						proposal: {
							...credential.proposal.indy,
						},
						proposalAttributes: credential.proposalAttributes,
					}));
				return payload;
			},
		}),
	}),
});

const ConnectionsFilterInput = builder.inputType("ConnectionsFilterInput", {
	fields: (t) => ({
		state: t.string({ required: false }),
		theirDid: t.string({ required: false }),
		theirLabel: t.string({ required: false }),
		protocol: t.string({ required: false }),
		isReady: t.boolean({ required: false }),
		isRequester: t.boolean({ required: false }),
	}),
});
builder.queryField("connections", (t) =>
	t.field({
		type: [ConnectionObjectRef],
		smartSubscription: true,
		subscribe: (subscriptions, _, {}, ctx) => {
			CONNECTION_TOPICS.forEach((topic) => subscriptions.register(topic));
		},
		args: {
			filter: t.arg({
				type: ConnectionsFilterInput,
				required: false,
			}),
		},
		resolve: async (_root, { filter }, { agent }) => {
			const connectionServices = new ConnectionService(agent);
			return await connectionServices.allConnections({
				...(filter as {}),
			});
		},
	})
);

builder.queryField("connection", (t) =>
	t.field({
		type: ConnectionObjectRef,
		nullable: true,
		args: {
			id: t.arg.string(),
		},
		resolve: async (_root, { id }, { agent }) => {
			const connectionService = new ConnectionService(agent);
			const connection = await connectionService.connectionById(id);

			return connection;
		},
	})
);

builder.mutationField("createInvitation", (t) =>
	t.field({
		type: "String",
		resolve: async (_root, _args, { agent }) => {
			const connectionServices = new ConnectionService(agent);
			const { invitationUrl, outOfBandRecord } =
				await connectionServices.createInvitation(
					"http://localhost:8000/invitation"
				);

			return invitationUrl;
		},
	})
);

const RemoveConnectionInput = builder.inputType("RemoveConnectionInput", {
	fields: (t) => ({
		connectionId: t.string(),
	}),
});

builder.mutationField("removeConnection", (t) =>
	t.field({
		type: "Boolean",
		args: {
			input: t.arg({ type: RemoveConnectionInput }),
		},
		resolve: async (_root, { input }, { agent }) => {
			const connectionServices = new ConnectionService(agent);
			const removeState = await connectionServices.removeConnection(
				input.connectionId
			);

			if (removeState === true) pubsub.publish(CONNECTION_CLOSED);

			return removeState;
		},
	})
);

// Connection based Credentials
const IssueCredentialInput = builder.inputType("IssueCredentialInput", {
	fields: (t) => ({
		connectionId: t.string(),
		attributes: t.field({
			type: [IssueCredentialAttribute],
		}),
	}),
});
const IssueCredentialAttribute = builder.inputType("IssueCredentialAttribute", {
	fields: (t) => ({
		name: t.string(),
		value: t.string(),
	}),
});
builder.mutationField("issueCredential", (t) =>
	t.field({
		type: Result,
		args: {
			input: t.arg({ type: IssueCredentialInput }),
		},
		resolve: async (_root, { input }, { agent }) => {
			const connectionService = new ConnectionService(agent);
			const connectionRecord = await connectionService.connectionById(
				input.connectionId
			);
			if (!connectionRecord) {
				throw new Error("No such connection found.");
			}

			const credentialService = new CredentialService(agent);
			const credentialDefinitionId = getCredentialDefinitionId();
			if (!credentialDefinitionId) {
				throw new Error(
					"Credential Definition not registerde on connected ledger."
				);
			}

			const res = await credentialService.issueCredential({
				protocolVersion: "v2",
				credentialDefinitionId,
				attributes: input.attributes,
			});

			if (!res) {
				throw new Error("Error while issuing credential");
			}

			return {
				status: ResultStatus.SUCCESS,
				message: "Credential was issued successfully",
			};
		},
	})
);
