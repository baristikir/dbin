import {
	Agent,
	DidInfo,
	ConnectionRecord,
	CredentialExchangeRecord,
} from "@aries-framework/core";

export interface DidObjectType extends DidInfo {}
export interface AgentObjectType extends Agent {}
export interface ConnectionObjectType
	extends ConnectionRecord {}
export interface CredentialObjectType
	extends CredentialExchangeRecord {}
