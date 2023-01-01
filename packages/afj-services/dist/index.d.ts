import { InitConfig, Agent } from '@aries-framework/core';

declare function fetchGenesisTransaction(ledgerUrl: string): Promise<string>;

declare const ledgerServices_fetchGenesisTransaction: typeof fetchGenesisTransaction;
declare namespace ledgerServices {
  export {
    ledgerServices_fetchGenesisTransaction as fetchGenesisTransaction,
  };
}

interface RequiredAgentConfig extends InitConfig {
    walletConfig: InitConfig["walletConfig"];
}
interface CreateAgentConfigProps extends RequiredAgentConfig {
}
declare function createAgentConfig({ ...args }: CreateAgentConfigProps): Promise<InitConfig>;
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
declare function createAgent({ config, indyLedgers }: CreateAgentProps): Promise<Agent<any>>;

declare const agentConfigs_createAgentConfig: typeof createAgentConfig;
declare const agentConfigs_createAgent: typeof createAgent;
declare namespace agentConfigs {
  export {
    agentConfigs_createAgentConfig as createAgentConfig,
    agentConfigs_createAgent as createAgent,
  };
}

declare class AgentServices {
    agent: Agent;
    constructor(agent: Agent);
}

type agentServices_AgentServices = AgentServices;
declare const agentServices_AgentServices: typeof AgentServices;
declare namespace agentServices {
  export {
    agentServices_AgentServices as AgentServices,
  };
}

export { agentConfigs as AgentConfigServices, agentServices as AgentServices, ledgerServices as LedgerServices };
