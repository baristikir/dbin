import express from "express";
import morgan from "morgan";
import {
	Agent,
	ConsoleLogger,
	HttpOutboundTransport,
	LogLevel,
} from "@aries-framework/core";
import { HttpInboundTransport } from "@aries-framework/node";
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
		label: "@dbin/acme-agent",
		walletConfig: {
			id: "@dbin/acme-wallet",
			// todo Extract key to environment variable
			key: "demoagentacme0000000000000000000",
		},
		// todo Resolve endpoints by NODE_ENV -> dev | prod
		endpoints: [`http://localhost:${String(port)}`],
		logger: new ConsoleLogger(LogLevel.debug),
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
		graphiql: true,
		landingPage: false,
		context: ({ request }) => createGraphQLContext(request),
	});

	app.use("/api/graphql", yoga);
	//#endregion

	await agent.initialize();

	console.log(`[server-log]: server running on ${port}`);
}
