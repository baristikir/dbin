import { ConnectionService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";

const ConnectionObjectRef =
	builder.objectRef<GraphQLObjects.ConnectionObjectType>(
		"Connection"
	);
ConnectionObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id", {
			description:
				"Connection Record ID, often known as connectionId",
		}),
		type: t.exposeString("type"),
		state: t.exposeString("state"),
		role: t.exposeString("role"),
		did: t.exposeString("did", { nullable: true }),
		alias: t.exposeString("alias", { nullable: true }),
		protocol: t.exposeString("protocol", { nullable: true }),
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
		autoAcceptConnection: t.exposeBoolean(
			"autoAcceptConnection",
			{
				nullable: true,
			}
		),
		isReady: t.boolean({
			resolve: (parent) => parent.isReady,
		}),
		isRequester: t.boolean({
			resolve: (parent) => parent.isRequester,
		}),
	}),
});

const ConnectionsFilterInput = builder.inputType(
	"ConnectionsFilterInput",
	{
		fields: (t) => ({
			state: t.string({ required: false }),
			theirDid: t.string({ required: false }),
			theirLabel: t.string({ required: false }),
			protocol: t.string({ required: false }),
			isReady: t.boolean({ required: false }),
			isRequester: t.boolean({ required: false }),
		}),
	}
);
builder.queryField("connections", (t) =>
	t.field({
		type: [ConnectionObjectRef],
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
		args: {
			id: t.arg.string(),
		},
		resolve: async (_root, { id }, { agent }) => {
			throw new Error("Not implemented yet.");
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

const RemoveConnectionInput = builder.inputType(
	"RemoveConnectionInput",
	{
		fields: (t) => ({
			connectionId: t.string(),
		}),
	}
);

builder.mutationField("removeConnection", (t) =>
	t.field({
		type: "Boolean",
		args: {
			input: t.arg({ type: RemoveConnectionInput }),
		},
		resolve: async (_root, { input }, { agent }) => {
			const connectionServices = new ConnectionService(agent);
			return await connectionServices.removeConnection(
				input.connectionId
			);
		},
	})
);
