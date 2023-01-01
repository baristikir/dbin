import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";

const AgentObjectRef =
	builder.objectRef<GraphQLObjects.AgentObjectType>("Agent");
AgentObjectRef.implement({
	fields: (t) => ({
		label: t.string({ resolve: (parent) => parent.config.label }),
		isInitialized: t.exposeBoolean("isInitialized"),
	}),
});

builder.queryField("agent", (t) =>
	t.field({
		type: AgentObjectRef,
		resolve: async (_root, _args, { agent }) => {
			return agent!;
		},
	})
);
