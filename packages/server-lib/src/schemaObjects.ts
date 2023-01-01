import {
	Agent,
	ConnectionRecord,
	CredentialExchangeRecord,
} from "@aries-framework/core";

export interface AgentObjectType extends Agent {}
export interface ConnectionObjectType extends ConnectionRecord {}
export interface CredentialObjectType extends CredentialExchangeRecord {}
