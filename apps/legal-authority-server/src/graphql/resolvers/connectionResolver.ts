import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";

const ConnectionObjectRef =
	builder.objectRef<GraphQLObjects.ConnectionObjectType>("Connection");
ConnectionObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id", {
			description: "Connection Record ID, often known as connectionId",
		}),
		type: t.exposeString("type"),
		state: t.exposeString("state"),
		role: t.exposeString("role"),
		did: t.exposeString("did", { nullable: true }),
		alias: t.exposeString("alias", { nullable: true }),
		protocol: t.exposeString("protocol", { nullable: true }),
		theirDid: t.exposeString("theirDid", { nullable: true }),
		theirLabel: t.exposeString("theirLabel", { nullable: true }),
		threadId: t.exposeString("threadId", { nullable: true }),
		mediatorId: t.exposeString("mediatorId", { nullable: true }),
		oobId: t.exposeString("outOfBandId", { nullable: true }),
		invitationDid: t.exposeString("invitationDid", { nullable: true }),
		errMessage: t.exposeString("errorMessage", { nullable: true }),
		autoAcceptConnection: t.exposeBoolean("autoAcceptConnection", {
			nullable: true,
		}),
		isReady: t.boolean({
			resolve: (parent) => parent.isReady,
		}),
		isRequester: t.boolean({
			resolve: (parent) => parent.isRequester,
		}),
	}),
});

builder.queryField("connection", (t) =>
	t.field({
		type: ConnectionObjectRef,
		args: {
			id: t.arg.string(),
		},
		resolve: async (_root, { id }, { agent }) => {
			throw new Error("Not implemented yet.");
		},
	})
);
