import * as _aries_framework_core from '@aries-framework/core';
import { InitConfig, Agent, ConnectionsModule, CredentialsModule, ConnectionRecord, AgentMessage, ProposeCredentialOptions, CredentialPreviewAttributeOptions, OutOfBandRecord, DidExchangeState, HandshakeProtocol } from '@aries-framework/core';
import * as indy_sdk from 'indy-sdk';

declare function fetchGenesisTransaction(ledgerUrl: string): Promise<string>;

declare const ledgerServices_fetchGenesisTransaction: typeof fetchGenesisTransaction;
declare namespace ledgerServices {
  export {
    ledgerServices_fetchGenesisTransaction as fetchGenesisTransaction,
  };
}

declare function resolveEndpointsByEnvironment({ port, publicIpOrDomain, }: {
    port: number;
    publicIpOrDomain?: string;
}): string[];
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
declare function createAgent({ config, indyLedgers }: CreateAgentProps): Promise<Agent<{
    connections: ConnectionsModule;
    credentials: CredentialsModule<any>;
}>>;

declare const agentConfigs_resolveEndpointsByEnvironment: typeof resolveEndpointsByEnvironment;
declare const agentConfigs_createAgentConfig: typeof createAgentConfig;
declare const agentConfigs_createAgent: typeof createAgent;
declare namespace agentConfigs {
  export {
    agentConfigs_resolveEndpointsByEnvironment as resolveEndpointsByEnvironment,
    agentConfigs_createAgentConfig as createAgentConfig,
    agentConfigs_createAgent as createAgent,
  };
}

type TempAgent = Agent<{}>;
interface WithAgent {
    agent: TempAgent;
}
declare class ServiceWithAgent implements WithAgent {
    agent: TempAgent;
    constructor(agent: TempAgent);
}

declare class AgentService extends ServiceWithAgent {
    config(): Promise<void>;
    issueCredential(payload: any): Promise<void>;
    requestCredentialProof(): Promise<void>;
}

interface IssueCredentialProps {
    attributes: CredentialPreviewAttributeOptions[];
    credentialDefinitionId: string;
    protocolVersion?: "v1" | "v2";
}
declare class CredentialService extends ServiceWithAgent {
    allCredentials(): Promise<_aries_framework_core.CredentialExchangeRecord[]>;
    credentialSchema(schemaId: string): Promise<indy_sdk.Schema>;
    credentialByConnection(connectionOrId: ConnectionRecord | string): Promise<_aries_framework_core.CredentialExchangeRecord[]>;
    credentialById(credentialId: string): Promise<_aries_framework_core.CredentialExchangeRecord>;
    issueCredential({ attributes, protocolVersion, credentialDefinitionId, }: IssueCredentialProps): Promise<{
        message: AgentMessage;
        credentialRecord: _aries_framework_core.CredentialExchangeRecord;
    }>;
    /**
     * Propose Credential to an Issuer with input data
     * @param
     */
    proposeCredential({ ...props }: Pick<ProposeCredentialOptions, "credentialFormats" | "connectionId">): Promise<_aries_framework_core.CredentialExchangeRecord>;
    acceptProposal(credentialRecordId: string): Promise<_aries_framework_core.CredentialExchangeRecord>;
    presentProof({ connectionId, credentialId, }: {
        connectionId: string;
        credentialId: string;
    }): Promise<_aries_framework_core.ProofExchangeRecord>;
    createConnectionlessProof({ credentialId, }: {
        credentialId: string;
    }): Promise<{
        invitationUrl: string;
        connectionlessMessage: AgentMessage;
    } | null>;
    revokeCredential({}: {}): Promise<void>;
}

type Maybe<T> = T | null | undefined;
interface ConnectionQueryFilter {
    state?: Maybe<DidExchangeState>;
    protocol?: Maybe<HandshakeProtocol>;
    isReady?: Maybe<boolean>;
    isRequester?: Maybe<boolean>;
    theirDid?: Maybe<string>;
    theirLabel?: Maybe<string>;
}
declare class ConnectionService extends ServiceWithAgent {
    createInvitation(domainUrl: string): Promise<{
        outOfBandRecord: OutOfBandRecord;
        invitationUrl: string;
    }>;
    receiveInvitation(invitationUrl: string): Promise<ConnectionRecord>;
    accpetInvitation(invitationUrl: string): Promise<ConnectionRecord>;
    allConnections(filter?: ConnectionQueryFilter): Promise<ConnectionRecord[]>;
    connectionById(connectionId: string, filter?: ConnectionQueryFilter): Promise<ConnectionRecord>;
    hasConnection(connectionId: string): Promise<boolean>;
    removeConnection(connectionOrId: ConnectionRecord | string): Promise<boolean>;
}

export { agentConfigs as AgentConfigServices, AgentService, ConnectionService, CredentialService, ledgerServices as LedgerServices };
