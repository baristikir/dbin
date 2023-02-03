import {
	ConnectionRecord,
	CredentialPreviewAttributeOptions,
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

interface IssueCredentialProps {
	attributes: CredentialPreviewAttributeOptions[];
	credentialDefinitionId: string;
	protocolVersion?: "v1" | "v2";
}

export class CredentialService extends ServiceWithAgent {
	async allCredentials() {
		const creds = await this.agent.credentials.getAll();
		return creds;
	}

	async credentialSchema(schemaId: string) {
		const credSchema = await this.agent.ledger.getSchema(schemaId);
		return credSchema;
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

	async issueCredential({
		attributes,
		protocolVersion = "v2",
		credentialDefinitionId,
	}: IssueCredentialProps) {
		return await this.agent.credentials.createOffer({
			protocolVersion,
			credentialFormats: {
				indy: {
					credentialDefinitionId,
					attributes,
				},
			},
		});
	}

	async revokeCredential({}) {
		throw new Error("Not implemented yet.");
	}
}
