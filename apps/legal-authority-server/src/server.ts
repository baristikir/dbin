import express from "express";
import morgan from "morgan";
import {
	Agent,
	ConsoleLogger,
	HttpOutboundTransport,
	LogLevel,
} from "@aries-framework/core";
import { HttpInboundTransport } from "@aries-framework/node";
import { Server } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { AgentConfigServices } from "@dbin/afj-services";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql";
import { Context } from "./graphql/builder";

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
			// todo Extract key to environment variable
			key: "demoagentlegalauthority0000000000000000000",
		},
		// todo Resolve endpoints by NODE_ENV -> dev | prod
		endpoints: [`http://localhost:${String(port)}`],
		logger: new ConsoleLogger(LogLevel.info),
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
			// 	id: "pool-von-cloud-agent",
			// 	indyNamespace: "von:local",
			// 	isProduction: false,
			// 	ledgerUrl: "http://EXPOSED_VON_IP_ADRESS:9000/genesis",
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

	console.log(`[server-log]: server running on ${port}`);
}
