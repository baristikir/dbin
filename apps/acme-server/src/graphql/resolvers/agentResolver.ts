import { GraphQLObjects } from "@dbin/server-lib";
import { ConnectionObjectRef } from "./connectionResolver";
import { CredentialObjectRef } from "./credentialResolver";
import { builder } from "../builder";

const AgentObjectRef =
	builder.objectRef<GraphQLObjects.AgentObjectType>("Agent");
AgentObjectRef.implement({
	fields: (t) => ({
		label: t.string({ resolve: (parent) => parent.config.label }),
		isInitialized: t.exposeBoolean("isInitialized"),
		connections: t.field({
			type: [ConnectionObjectRef],
			resolve: (_root, _args, { agent }) => {
				return agent.connections.getAll();
			},
		}),
		credentials: t.field({
			type: [CredentialObjectRef],
			resolve: async (_root, _args, { agent }) => {
				const creds = await agent.credentials.getAll();
				console.log(creds);
				return creds;
			},
		}),
	}),
});

builder.queryField("agent", (t) =>
	t.field({
		type: AgentObjectRef,
		resolve: async (_root, _args, { agent }) => {
			return agent;
		},
	})
);
