import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { Agent, HttpOutboundTransport } from "@aries-framework/core";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";

describe("Agent Services", () => {
	let agentA: Agent;

	beforeAll(async () => {
		// const unique = uuid().substring(0, 4);
		agentA = new Agent({
			config: {
				label: `agentA-${4}`,
				walletConfig: {
					id: "agentServices.test.wallet",
					key: "agentServicestestwalletseed",
				},
			},
			dependencies: agentDependencies,
		});
		const httpInboundTransport = new HttpInboundTransport({ port: 1234 });
		const httpOutboundTransport = new HttpOutboundTransport();

		agentA.registerInboundTransport(httpInboundTransport);
		agentA.registerOutboundTransport(httpOutboundTransport);
		await agentA.initialize();
	});

	afterAll(async () => {
		await agentA.shutdown();
		await agentA.wallet.delete();
	});

	test("Agent should be initialized", async () => {
		expect(agentA.isInitialized).toBe(true);
	});
});
