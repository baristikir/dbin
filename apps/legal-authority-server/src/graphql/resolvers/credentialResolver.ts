import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";

const CredentialObjectRef =
	builder.objectRef<GraphQLObjects.CredentialObjectType>("Credential");
CredentialObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id"),
		connectionId: t.exposeString("connectionId", { nullable: true }),
		threadId: t.exposeString("threadId"),
		state: t.exposeString("state"),
		protocolVersion: t.exposeString("protocolVersion"),
		type: t.exposeString("type"),
	}),
});

builder.queryField("credentials", (t) =>
	t.field({
		type: [CredentialObjectRef],
		args: {},
		resolve: async (_root, {}, { agent }) => {
			throw new Error("Not implemented yet.");
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
