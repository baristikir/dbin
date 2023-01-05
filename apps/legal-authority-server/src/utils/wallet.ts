import { Agent, InjectionSymbols } from "@aries-framework/core";
import { IndyWallet } from "@aries-framework/core/build/wallet/IndyWallet";
import { agentDependencies } from "@aries-framework/node";
import { randomBytes } from "node:crypto";

export async function createSeed(agent: Agent) {
	const seed = randomBytes(16).toString("hex");
	// AFJ 0.3.x version specific via `InjectionSymbols`
	const wallet = agent.dependencyManager.resolve<IndyWallet>(
		InjectionSymbols.Wallet
	);
	const [did, verkey] = await agentDependencies.indy.createAndStoreMyDid(
		wallet.handle,
		{
			seed,
		}
	);

	return {
		seed,
		did,
		verkey,
	};
}
