import { DidExchangeState } from "@aries-framework/core";
import { ConnectionService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";

const ConnectionObjectRef =
	builder.objectRef<GraphQLObjects.ConnectionObjectType>("Connection");

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

function getConnectionProtocolVersion(protocol?: string): "v1" | "v2" | null {
	if (!protocol) return null;

	return protocol.endsWith("/1.0")
		? "v1"
		: protocol.endsWith("/2.0")
		? "v2"
		: null;
}

ConnectionObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id", {
			description: "Connection Record ID, often known as connectionId",
		}),
		type: t.exposeString("type"),
		state: t.string({
			resolve: (connection) => connectionStateToReadable(connection.state),
		}),
		isStateCompleted: t.boolean({
			resolve: (connection) => connection.state === DidExchangeState.Completed,
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
	}),
});

builder.queryField("connections", (t) =>
	t.field({
		type: [ConnectionObjectRef],
		resolve: async (_root, _args, { agent }) => {
			const connectionService = new ConnectionService(agent);
			const connections = await connectionService.allConnections();

			return connections;
		},
	})
);

const ConnectWithAgentInput = builder.inputType("ConnectWithAgentInput", {
	fields: (t) => ({
		url: t.string(),
	}),
});
builder.mutationField("acceptInvitation", (t) =>
	t.field({
		type: "Boolean",
		args: {
			input: t.arg({
				type: ConnectWithAgentInput,
			}),
		},
		resolve: async (_root, { input }, { agent }) => {
			const connectionService = new ConnectionService(agent);
			const connectionRecord = await connectionService.receiveInvitation(
				input.url
			);

			return connectionRecord ? true : false;
		},
	})
);

const RemoveConnectionInput = builder.inputType("RemoveConnectionInput", {
	fields: (t) => ({
		id: t.string(),
	}),
});
builder.mutationField("removeConnection", (t) =>
	t.field({
		type: "Boolean",
		args: {
			input: t.arg({ type: RemoveConnectionInput }),
		},
		resolve: async (_root, { input }, { agent }) => {
			const connectionService = new ConnectionService(agent);

			return await connectionService.removeConnection(input.id);
		},
	})
);
