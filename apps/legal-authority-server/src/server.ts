import express from "express";
import morgan from "morgan";
import {
	Agent,
	ConnectionEventTypes,
	ConnectionStateChangedEvent,
	ConsoleLogger,
	DidExchangeState,
	HttpOutboundTransport,
	IndyWallet,
	InjectionSymbols,
	LogLevel,
} from "@aries-framework/core";
import { HttpInboundTransport } from "@aries-framework/node";
import { Server } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { AgentConfigServices } from "@dbin/afj-services";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql";
import { Context } from "./graphql/builder";
import { pubsub } from "./utils/pubsub";
import {
	CONNECTION_ACCEPTED,
	CONNECTION_REQUEST,
} from "./subscriptions/connectionsTopics";
import { getCredentialDefinitionId, getSchemaId } from "./schemas";
import { isNullish } from "./utils/checkNullish";

let agent: Agent;
export function getAgent() {
	if (!agent) return null;
	return agent;
}

function createGraphQLContext(request: Request): Context {
	return {
		req: request,
		agent: getAgent(),
	};
}

export async function initServer(port: number) {
	const app = express();
	// Server incoming request logger for APIs
	app.use(morgan(":date[iso] :method :url :response-time"));

	//#region Aries Agent Setup
	// Creating Aries agent config
	const agentConfig = await AgentConfigServices.createAgentConfig({
		label: "@dbin/legal-authority-agent",
		walletConfig: {
			id: "@dbin/legal-authority-wallet",
			key: process.env.WALLET_CONFIG_KEY ?? "testdemoagentforlegal0000000",
		},
		endpoints: AgentConfigServices.resolveEndpointsByEnvironment({ port }),
		logger: new ConsoleLogger(LogLevel.debug),
		// BC Greenlight Public DID Seed
		publicDidSeed: process.env.BCOVRIN_TEST_PUBLIC_DID_SEED,
		// VON local devnet Public DID Seed
		// publicDidSeed: process.env.VON_LOCAL_PUBLIC_DID_SEED,
	});

	agent = await AgentConfigServices.createAgent({
		config: agentConfig,
		indyLedgers: [
			{
				id: "pool-bcovrin-greenlight-cloud-agent",
				indyNamespace: "bcovrin:test",
				ledgerUrl: "http://greenlight.bcovrin.vonx.io/genesis",
				isProduction: false,
			},
			// {
			// 	id: "pool-von-network",
			// 	indyNamespace: "von:local",
			// 	isProduction: false,
			// 	ledgerUrl: "http://EXPOSED_IP_ADRESS:9000/genesis",
			// },
		],
	});

	agent.registerOutboundTransport(new HttpOutboundTransport());

	const inboundTransporter = new HttpInboundTransport({
		port,
		app,
	});
	agent.registerInboundTransport(inboundTransporter);
	//#endregion

	//#region GraphQL Server Setup
	const yoga = createYoga({
		schema,
		graphqlEndpoint: "/api/graphql",
		graphiql: {
			subscriptionsProtocol: "WS",
		},
		landingPage: false,
		context: ({ request }) => createGraphQLContext(request),
	});

	app.use("/api/graphql", yoga);
	//#endregion

	await agent.initialize();
	const server = inboundTransporter.server;

	//#region Websocket Server Setup
	const wsServer = new Server({
		server,
		path: yoga.graphqlEndpoint,
	});
	//#endregion

	//#region Integration of WS Server and GraphQL Server
	useServer(
		{
			execute: (args: any) => args.execute(args),
			subscribe: (args: any) => args.subscribe(args),
			context: {
				aegnt: getAgent(),
			},
			onSubscribe: async (ctx, msg) => {
				const { schema, execute, subscribe, contextFactory, parse, validate } =
					yoga.getEnveloped({
						...ctx,
						req: ctx.extra.request,
						socket: ctx.extra.socket,
						params: msg.payload,
					});

				const args = {
					schema,
					operationName: msg.payload.operationName,
					document: parse(msg.payload.query),
					variableValues: msg.payload.variables,
					contextValue: await contextFactory(),
					execute,
					subscribe,
				};

				const errors = validate(args.schema, args.document);
				if (errors.length) return errors;
				return args;
			},
		},
		wsServer
	);
	//#endregion

	// Register Subscriber for incoming HTTP events, main usage for connection invitations
	await registerAgentConnectionListener(agent);

	// await setTimeout(
	// 	async () => await checkSchemaRegistries(agent),
	// 	5000
	// );

	console.log(`[server-log]: server running on ${port}`);
}

// TODO: Code Splitting
async function registerAgentConnectionListener(agent: Agent) {
	agent.events.on<ConnectionStateChangedEvent>(
		ConnectionEventTypes.ConnectionStateChanged,
		({ payload, metadata, type }) => {
			console.log(
				"[event-listener]: New Connection Response for '@dbin/legal-authority-server' agent."
			);
			console.log(
				`[event-listener]: ConnectionRecord & State: ${payload.connectionRecord.id} ++ ${payload.connectionRecord.state} , previousState: ${payload.previousState}`
			);

			switch (payload.connectionRecord.state) {
				case DidExchangeState.Completed:
					pubsub.publish(CONNECTION_ACCEPTED);
					break;
				case DidExchangeState.RequestSent:
					pubsub.publish(CONNECTION_REQUEST);
					break;

				default:
					break;
			}
		}
	);
}

// TODO: Code Splitting
async function checkSchemaRegistries(agent: Agent) {
	let schemaId = getSchemaId();
	let credentialDefinitionId = getCredentialDefinitionId();

	if (isNullish(schemaId) || schemaId.length === 0) {
		console.log("[error] Schema not registered properly.");
		// const schema = await agent.ledger.registerSchema({
		// 	name: "BusinessCredential",
		// 	version: "1.0",
		// 	attributes: [
		// 		"company_registered_name",
		// 		"company_registered_adress",
		// 		"company_registered_country",
		// 		"company_status",
		// 		"company_creation_date",
		// 	],
		// });

		// schemaId = schema.id;
		let d = await agent.dependencyManager.resolve<IndyWallet>(
			InjectionSymbols.Wallet
		).publicDid;
		console.log(d);
		console.log(await agent.dids.resolve(d?.did!));

		return;
	}

	if (isNullish(credentialDefinitionId) || credentialDefinitionId.length === 0) {
		console.log("[error] Credential Definition not registered properly.");
		throw new Error("Credential Definition not registered");
	}

	const schemaRecord = await agent.ledger.getSchema(schemaId!);
	if (isNullish(schemaRecord)) {
		throw new Error("Schema Record not stored agent storage.");
	}
}
