import {
	ConnectionRecord,
	OutOfBandRecord,
} from "@aries-framework/core";
import { ServiceWithAgent } from "./baseService";

export class AgentService extends ServiceWithAgent {
	async config() {}
	async issueCredential() {}
	async requestCredentialProof() {}
}
