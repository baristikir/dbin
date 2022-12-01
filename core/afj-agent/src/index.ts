import { HttpOutboundTransport, InitConfig } from "@aries-framework/core";
import { Agent } from "@aries-framework/core";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";

async function main() {
	const config: InitConfig = {
		label: "docs-nodejs-agent",
		walletConfig: {
			id: "wallet-id",
			key: "testkey0000000000000000000000000",
		},
	};

	const agent = new Agent(config, agentDependencies);
	console.log("[info] Created Agent");

	agent.registerOutboundTransport(new HttpOutboundTransport());
	agent.registerInboundTransport(new HttpInboundTransport({ port: 4444 }));
	console.log("[info] Registered In- and Outbound Transports");

	await agent.initialize().catch(console.error);
	console.log("[info] Agent initialized");
}

void main();
