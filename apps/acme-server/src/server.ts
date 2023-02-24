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
import { AuthUtils, SessionUtils } from "@dbin/server-lib";
import { createYoga, YogaInitialContext } from "graphql-yoga";
import { getIronSession } from "iron-session";
import { schema } from "./graphql";
import { Context } from "./graphql/builder";
import cors from "cors";
import { db } from "./utils/prisma";
import { IncomingMessage, OutgoingMessage } from "http";

let agent: Agent;
export function getAgent() {
	if (!agent) return null;
	return agent;
}

async function createGraphQLContext(
	context: YogaInitialContext & { req: IncomingMessage; res: OutgoingMessage }
): Promise<Context> {
	let userId: string | undefined;
	if ("req" in context && context.req.session.sessionId) {
		const session = await db.session.findUnique({
			where: { id: context.req.session.sessionId },
			select: { user: true },
		});
		userId = session?.user.id;
	}

	console.log("[req] IncomingMessage from userId: ", userId);

	return {
		req: context.req! as IncomingMessage,
		user: userId,
		agent: getAgent(),
	};
}

export async function initServer(port: number) {
	const app = express();
	// Server incoming request logger for APIs
	app.use(morgan(":date[iso] :method :url :response-time"));

	const SECRET_SESSION_KEY = process.env.SESSION_COOKIE_PASSWORD;
	if (!SECRET_SESSION_KEY) {
		throw new Error("Secret Session Key could not be found.");
	}
	const session = await SessionUtils.createIronSession({
		cookieName: "session.info",
		password: SECRET_SESSION_KEY,
	});

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
	app.use("/api/graphql", session, yoga);
	//#endregion

	await agent.initialize();

	console.log(`[server-log]: server running on ${port}`);
}

declare module "iron-session" {
	interface IronSessionData {
		sessionId?: string | null;
	}
}
