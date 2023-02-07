import { Agent, InitConfig, KeyDerivationMethod } from "@aries-framework/core";
import { AgentModulesInput } from "@aries-framework/core/build/agent/AgentModules";
import { uuid } from "@aries-framework/core/build/utils/uuid";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";

interface Props {
	agentLabel: string;
	agentInboundPort?: number;
}
export async function setupTestEnvironment({
	agentLabel,
	agentInboundPort = 1234,
}: Props): Promise<Agent> {
	const unique = uuid().substring(0, 4);
	const name = `${agentLabel}-${unique}`;
	const options = getAgentOptions(name);
	const agent = new Agent(options);
	agent.registerInboundTransport(
		new HttpInboundTransport({ port: agentInboundPort })
	);

	return agent;
}

function getAgentOptions(
	name: string,
	extraConfig: Partial<InitConfig> = {},
	modules?: AgentModulesInput
) {
	const config: InitConfig = {
		label: `Agent: ${name}`,
		walletConfig: {
			id: `Wallet: ${name}`,
			key: "DZ9hPqFWTPxemcGea72C1X1nusqk5wFNLq6QPjwXGqAa", // generated using indy.generateWalletKey
			keyDerivationMethod: KeyDerivationMethod.Raw,
		},
		...extraConfig,
	};
	return {
		config,
		modules: (modules ?? {}) as AgentModulesInput,
		dependencies: agentDependencies,
	};
}
