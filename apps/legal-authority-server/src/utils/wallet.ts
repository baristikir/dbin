import { Agent } from "@aries-framework/core";
import { IndyWallet } from "@aries-framework/core/build/wallet/IndyWallet";
import { agentDependencies } from "@aries-framework/node";
import { randomBytes } from "node:crypto";

/**
 * Source of this code is from the aries workshop
 * https://github.com/jakubkoci/hgf-cloud-agent/blob/workshop-finished/server/src/util.ts
 */
export async function createSeed(agent: Agent) {
	const seed = randomBytes(16).toString("hex");
	console.log("walletConfig: ", {
		walletConfig: agent.wallet.walletConfig,
	});
	const wallet = agent.dependencyManager.resolve(IndyWallet);
	// wallet.handle not compatible with afj-0.3.x
	const [did, verkey] =
		await agentDependencies.indy.createAndStoreMyDid(
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
