import {
	Attachment,
	ConnectionRecord,
	OutOfBandRecord,
} from "@aries-framework/core";
import { LinkedAttachment } from "@aries-framework/core/build/utils/LinkedAttachment";
import { ServiceWithAgent } from "./baseService";

export class AgentService extends ServiceWithAgent {
	async config() {}
	async issueCredential(payload) {
		this.agent.credentials.createOffer({
			protocolVersion: "v2",
			credentialFormats: {
				indy: {
					credentialDefinitionId: "",
					attributes: [],
				},
			},
		});
	}
	async requestCredentialProof() {}
}
