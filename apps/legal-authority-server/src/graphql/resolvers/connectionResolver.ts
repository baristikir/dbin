import { DidExchangeState } from "@aries-framework/core";
import { ConnectionService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";
import {
	CONNECTION_CLOSED,
	CONNECTION_TOPICS,
} from "../../subscriptions/connectionsTopics";
import { pubsub } from "../../utils/pubsub";

const ConnectionObjectRef =
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
