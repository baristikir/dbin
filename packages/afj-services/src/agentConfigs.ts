import { Agent, InitConfig, IndyPoolConfig } from "@aries-framework/core";
import { agentDependencies } from "@aries-framework/node";
import { fetchGenesisTransaction } from "./ledgerServices";

interface RequiredAgentConfig extends InitConfig {
	walletConfig: InitConfig["walletConfig"];
}
interface CreateAgentConfigProps extends RequiredAgentConfig {}
export async function createAgentConfig({ ...args }: CreateAgentConfigProps) {
	console.log("[agent.config] Creating Agent Config..");

	const config: InitConfig = {
		...args,
	};

	return config;
}

type IndyLedgerConfig = {
	id: string;
	ledgerUrl: string;
	indyNamespace: string;
	isProduction: boolean;
};
interface CreateAgentProps {
	config: InitConfig;
	indyLedgers: IndyLedgerConfig[];
}

const genesisTransactionsCache = new WeakMap<IndyLedgerConfig, string>();
export async function createAgent({ config, indyLedgers }: CreateAgentProps) {
	console.log("[agent.config] Creating Agent..");

	let ledgers: IndyPoolConfig[] = [];
	for (const key in indyLedgers) {
		const indyLedger = indyLedgers[key];
		if (genesisTransactionsCache.has(indyLedger)) {
			console.log("[agent.configs] Found Genesis Transaction in cache.");

			if ("ledgerUrl" in indyLedger) delete indyLedger.ledgerUrl;

			ledgers.push({
				...indyLedger,
				genesisTransactions: genesisTransactionsCache.get(indyLedger),
			});

			break;
		}

		// Fetching Genesis transaction file via HTTP GET request
		const genesisTransactions = await fetchGenesisTransaction(
			indyLedger.ledgerUrl
		);
		if (typeof genesisTransactions !== "string") {
			console.log("[agent.configs] Failed fetching genesis transactions file.");
			break;
		}

		genesisTransactionsCache.set(indyLedger, genesisTransactions);
		delete indyLedger.ledgerUrl;

		ledgers.push({
			...indyLedger,
			genesisTransactions,
		});
	}

	const agent = new Agent({
		config: {
			...config,
			indyLedgers: ledgers.map((ledger) => ({
				...ledger,
			})),
		},
		dependencies: agentDependencies,
		// Temporary fix for `Agent` types.
		// Reported issue
		//  https://github.com/hyperledger/aries-framework-javascript/issues/1187
		modules: {},
	});

	return agent;
}
