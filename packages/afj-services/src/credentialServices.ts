import {
	Agent,
	ConnectionRecord,
	CredentialState,
} from "@aries-framework/core";
import { ServiceWithAgent } from "./baseService";

function convertToCredentialState(state: string): CredentialState {
	switch (state) {
		case "proposal-sent":
			return CredentialState.ProposalSent;
		case "offer-received":
			return CredentialState.OfferReceived;
		case "request-sent":
			return CredentialState.RequestSent;
		case "credential-received":
			return CredentialState.CredentialReceived;
	}
}

export class CredentialService extends ServiceWithAgent {
	async allCredentials() {
		const creds = await this.agent.credentials.getAll();
		return creds;
	}

	async credentialByConnection(connectionOrId: ConnectionRecord | string) {
		let connectionRecord: ConnectionRecord;
		if (typeof connectionOrId === "string") {
			connectionRecord = await this.agent.connections.findById(connectionOrId);
		} else {
			connectionRecord = connectionOrId;
		}

		const creds = await this.agent.credentials.getAll();
		return creds;
	}
}
