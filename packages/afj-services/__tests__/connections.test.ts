import crypto from "node:crypto";
import { Agent } from "@aries-framework/core";
import { uuid } from "@aries-framework/core/build/utils/uuid";
import { agentDependencies } from "@aries-framework/node";
import { setupTestEnvironment } from "./setup";

describe("Connection Services", () => {
	let agent: Agent;

	beforeAll(async () => {
		agent = await setupTestEnvironment({
			agentLabel: "connection-services",
		});
		await agent.initialize();
	});

	afterAll(async () => {
		await agent.shutdown();
		await agent.wallet.delete();
	});

	test("Should create an invitation URL", async () => {
		const domain = "http://localhost:3000/";
		const { outOfBandInvitation } = await agent.oob.createInvitation();
		const invitationURL = outOfBandInvitation.toUrl({ domain });

		expect(invitationURL).toBeDefined();
	});

	test("Should create a connection between two agents", async () => {
		const { outOfBandInvitation } = await agent.oob.createInvitation();

		const unique = uuid().substring(0, 4);
		const agentB = new Agent({
			config: {
				label: `AgentB: test-${unique}`,
				walletConfig: {
					id: `test-${unique}-wallet`,
					key: crypto.createHash("md5").update("test").digest("hex"),
				},
			},
			modules: {},
			dependencies: agentDependencies,
		});

		await agentB.oob.acceptInvitation(outOfBandInvitation.id, {});
	});
});
