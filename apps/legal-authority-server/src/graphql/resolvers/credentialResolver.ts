import { CredentialState } from "@aries-framework/core";
import { GraphQLObjects } from "@dbin/server-lib";
import { ConnectionService } from "@dbin/afj-services";
import { CredentialService } from "@dbin/afj-services";
import { builder } from "../builder";
import { Result, ResultStatus } from "./resultResolver";

export const CredentialObjectRef =
	builder.objectRef<GraphQLObjects.CredentialObjectType>("Credential");
CredentialObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id"),
		threadId: t.exposeString("threadId"),
		state: t.exposeString("state"),
		protocolVersion: t.exposeString("protocolVersion"),
		type: t.exposeString("type"),
		connectionId: t.exposeString("connectionId", {
			nullable: true,
		}),
	}),
});

builder.queryField("credentials", (t) =>
	t.field({
		type: [CredentialObjectRef],
		args: {},
		resolve: async (_root, {}, { agent }) => {
			const credentialService = new CredentialService(agent);
			const credentials = await credentialService.allCredentials();

			return credentials;
		},
	})
);

builder.queryField("credentialByConnection", (t) =>
	t.field({
		type: [CredentialObjectRef],
		args: {
			connectionId: t.arg.string({ required: true }),
		},
		resolve: async (_root, {}, { agent }) => {
			throw new Error("Not implemented yet.");
		},
	})
);

const AcceptProposalInput = builder.inputType("AcceptProposalInput", {
	fields: (t) => ({
		connectionId: t.string(),
		credentialId: t.string(),
	}),
});

builder.mutationField("acceptProposal", (t) =>
	t.field({
		type: Result,
		args: {
			input: t.arg({ type: AcceptProposalInput }),
		},
		resolve: async (_root, { input }, { agent }) => {
			const credentialServices = new CredentialService(agent);
			const connectionServices = new ConnectionService(agent);

			const connectionRecord = await connectionServices.connectionById(
				input.connectionId
			);
			if (!connectionRecord) {
				return { status: ResultStatus.FAILED, message: "Connection not found" };
			}

			const credentialRecord = await credentialServices.credentialById(
				input.credentialId
			);
			if (
				!credentialRecord ||
				credentialRecord.connectionId !== input.connectionId
			) {
				return { status: ResultStatus.FAILED, message: "Credential not found" };
			}

			if (credentialRecord.state !== CredentialState.ProposalReceived) {
				return {
					status: ResultStatus.FAILED,
					message: "Credential state does not match with proposal-received",
				};
			}

			const updatedCredentialRecord = await credentialServices.acceptProposal(
				input.credentialId
			);

			return {
				status: ResultStatus.SUCCESS,
				message: "Credential proposal was accepted successfully.",
			};
		},
	})
);
