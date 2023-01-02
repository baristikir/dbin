import { GraphQLObjects } from "@dbin/server-lib";
import { CredentialService } from "@dbin/afj-services";
import { builder } from "../builder";

const CredentialObjectRef =
	builder.objectRef<GraphQLObjects.CredentialObjectType>(
		"Credential"
	);
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
			const credentialService = new CredentialService(agent!);
			const credentials =
				await credentialService.allCredentials();

			console.log({ credentials });

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
