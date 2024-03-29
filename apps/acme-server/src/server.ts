import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
	Agent,
	ConsoleLogger,
	HttpOutboundTransport,
	LogLevel,
	ProofEventTypes,
	ProofState,
	ProofStateChangedEvent,
} from "@aries-framework/core";
import { HttpInboundTransport } from "@aries-framework/node";
import { AgentConfigServices } from "@dbin/afj-services";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { schema } from "./graphql";
import { Context } from "./graphql/builder";
import { IncomingMessage, OutgoingMessage } from "http";

let agent: Agent;
export function getAgent() {
	if (!agent) return null;
	return agent;
}

async function createGraphQLContext(
	context: YogaInitialContext & { req: IncomingMessage; res: OutgoingMessage }
): Promise<Context> {
	return {
		req: context.req! as IncomingMessage,
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
			key: process.env.WALLET_CONFIG_KEY ?? "testdemoagentforacme00000000",
		},
		endpoints: AgentConfigServices.resolveEndpointsByEnvironment({
			port,
			// publicIpOrDomain: process.env.PUBLIC_IP_ADRESS,
		}),
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
			// 	id: "pool-von-network",
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
	const whitelist = ["http://localhost:3001"];
	const yoga = createYoga({
		schema,
		graphqlEndpoint: "/api/graphql",
		graphiql: true,
		landingPage: false,
		cors: {
			credentials: true,
			origin: whitelist,
		},
		context: ({ ...context }) => createGraphQLContext(context as any),
	});

	app.use(
		cors({
			origin: whitelist,
			credentials: true,
		})
	);
	app.use("/api/graphql", yoga);
	//#endregion

	await agent.initialize();

	await registerAgentConnectionListener(agent);
	console.log(`[server-log]: server running on ${port}`);
}

export async function registerAgentConnectionListener(agent: Agent) {
	agent.events.on<ProofStateChangedEvent>(
		ProofEventTypes.ProofStateChanged,
		async ({ payload, type, metadata }) => {
			switch (payload.proofRecord.state) {
				case ProofState.RequestReceived:
					const requestedCredentials =
						await agent.proofs.autoSelectCredentialsForProofRequest({
							proofRecordId: payload.proofRecord.id,
							config: {},
						});
					await agent.proofs.acceptRequest({
						proofRecordId: payload.proofRecord.id,
						proofFormats: {
							indy: requestedCredentials.proofFormats.indy,
						},
					});
					break;

				default:
					break;
			}
		}
	);
}
