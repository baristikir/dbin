import {
	Agent,
	ConnectionsModule,
	ConsoleLogger,
	HttpOutboundTransport,
	InitConfig,
	LogLevel,
} from "@aries-framework/core";
import { createHash } from "node:crypto";
import { uuid } from "@aries-framework/core/build/utils/uuid";
import { agentDependencies } from "@aries-framework/node";
import { AgentModulesInput } from "@aries-framework/core/build/agent/AgentModules";
import axios from "axios";

const GRAPHQL_API_ENDPOINT = "http://localhost:8000/api/graphql";
async function fetchGraphQL(gqlQuery: string, gqlVariables: any) {
	const requestBody = JSON.stringify({
		query: gqlQuery,
		variables: gqlVariables !== undefined ? gqlVariables : {},
	});

	return await axios(GRAPHQL_API_ENDPOINT, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"session.info": "token",
		},
		data: requestBody,
	});
}

describe("e2e", () => {
	let agentA: Agent;
	let agentB: Agent;

	beforeAll(async () => {
		agentA = await setupAgent({ label: "Agent: AgentA" });
		await agentA.initialize();
		agentB = await setupAgent({ label: "Agent: AgentB" });
		await agentB.initialize();
	});
	afterAll(async () => {
		await disposeAgent(agentA);
		await disposeAgent(agentB);
	});

	test("Should successfully request a new invitation URL from API", async () => {
		const gqlQuery = /*GraphQL*/ `
            mutation {
                createInvitation
            }
        `;

		const res = await fetchGraphQL(gqlQuery, {});
		const json = (await res.data) as Record<string, any>;
		console.log("Network Response: ", json);

		if (!json) {
			fail();
		}
		if ("data" in json && "createInvitation" in json.data) {
			console.log(json.data.createInvitation);
			const invitationURL = json.data.createInvitation;
			const { outOfBandRecord, connectionRecord } =
				await agentA.oob.receiveInvitationFromUrl(invitationURL);

			await expect(outOfBandRecord).toBeDefined();
			await expect(connectionRecord).toBeDefined();

			await new Promise((r) => setTimeout(r, 3000));

			const agentAConnections = await agentA.connections.getAll();
			console.log("AgentA Connections: ", agentAConnections);

			// const newConnection = await agentA.connections.findAllByOutOfBandId(
			// 	outOfBandRecord.id
			// );
			// expect(newConnection).toBeDefined();
		} else {
			fail();
		}
	});

	test("Should create a connection-less presentation", async () => {
		const { proofRecord, message } = await agentA.proofs.createRequest({
			protocolVersion: "v2",
			proofFormats: {
				indy: {},
			},
		});
	});
});

interface SetupAgentProps extends Partial<InitConfig> {}
async function setupAgent(props: SetupAgentProps) {
	const unique = uuid().substring(0, 4);
	const config = {
		label: props.label ?? `Agent: test-wallet-${unique}-label`,
		walletConfig: props.walletConfig ?? {
			id: `test-wallet-${unique}`,
			key: createHash("md5").update("test").digest("hex"),
		},
		logger: new ConsoleLogger(LogLevel.debug),
		...props,
	} satisfies InitConfig;
	const modules = {
		connections: new ConnectionsModule({
			autoAcceptConnections: true,
		}),
	} satisfies AgentModulesInput;
	const dependencies = agentDependencies;

	console.log("[test] Initializing Agent for ", props.label);
	const agent = new Agent({
		config,
		modules,
		dependencies,
	});

	agent.registerOutboundTransport(new HttpOutboundTransport());

	return agent;
}

async function disposeAgent(agent: Agent) {
	console.log("[test] Disposing Agent ", agent.config.label);

	if (agent.isInitialized) {
		await agent.shutdown();
	}
	if (agent.wallet.isInitialized) {
		await agent.wallet.delete();
	}
}
