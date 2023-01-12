import {
	Agent,
	DidInfo,
	ConnectionRecord,
	CredentialExchangeRecord,
} from "@aries-framework/core";
import { Schema } from "indy-sdk";

export interface DidObjectType extends DidInfo {}
export interface AgentObjectType extends Agent {}
export interface ConnectionObjectType extends ConnectionRecord {}
export interface CredentialObjectType extends CredentialExchangeRecord {}
export interface CredentialSchemaObjectType extends Schema {}
