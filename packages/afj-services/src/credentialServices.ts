import {
	AgentMessage,
	AutoAcceptCredential,
	ConnectionRecord,
	CredentialPreviewAttributeOptions,
	CredentialState,
	PresentationPreview,
	PresentationPreviewAttribute,
	ProofAttributeInfo,
	ProposeCredentialOptions,
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

	async credentialById(credentialId: string) {
		try {
			const credentialRecord = await this.agent.credentials.findById(credentialId);
			return credentialRecord;
		} catch (error) {
			console.log(`[info]: Credential with ${credentialId} id not found..`);
			return null;
		}
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

	/**
	 * Propose Credential to an Issuer with input data
	 * @param
	 */
	async proposeCredential({
		...props
	}: Pick<ProposeCredentialOptions, "credentialFormats" | "connectionId">) {
		const credentialExchangeRecord =
			await this.agent.credentials.proposeCredential({
				...props,
				protocolVersion: "v1",
				autoAcceptCredential: AutoAcceptCredential.ContentApproved,
			});

		return credentialExchangeRecord;
	}

	async acceptProposal(credentialRecordId: string) {
		try {
			const credentialPayload = await this.agent.credentials.getFormatData(
				credentialRecordId
			);

			return await this.agent.credentials.acceptProposal({
				credentialRecordId,
				credentialFormats: {
					indy: {
						credentialDefinitionId: credentialPayload.proposal.indy.cred_def_id,
						attributes: [...credentialPayload.proposalAttributes],
					},
				},
			});
		} catch (error) {
			console.log(
				`[error]: Accepting credential proposal with ${credentialRecordId} id failed.`
			);
			throw new Error("Accepting Proposal failed.");
		}
	}

	async presentProof({
		connectionId,
		credentialId,
	}: {
		connectionId: string;
		credentialId: string;
	}) {
		const credential = await this.agent.credentials.getById(credentialId);
		if (credential.state !== "done") {
			throw new Error("Credential not found");
		}

		const credentialData = await this.agent.credentials.getFormatData(
			credential.id
		);

		const previewAttributes = new PresentationPreview({
			attributes: credentialData.offerAttributes.map((attr) => {
				return new PresentationPreviewAttribute({
					name: attr.name,
					value: attr.value,
					mimeType: attr.value,
				});
			}),
		});

		return await this.agent.proofs.proposeProof({
			protocolVersion: "v2",
			connectionId,
			proofFormats: {
				indy: {
					attributes: previewAttributes.attributes,
				},
			},
		});
	}

	async createConnectionlessProof({
		credentialId,
	}: {
		credentialId: string;
	}): Promise<{
		invitationUrl: string;
		connectionlessMessage: AgentMessage;
	} | null> {
		try {
			const credentialRecord = await this.agent.credentials.getById(credentialId);
			const previewAttributes = new Map<string, ProofAttributeInfo>();
			credentialRecord.credentialAttributes.map((attr) =>
				previewAttributes.set(
					attr.name,
					new ProofAttributeInfo({
						name: attr.name,
						restrictions: [],
					})
				)
			);

			const { message, proofRecord } = await this.agent.proofs.createRequest({
				protocolVersion: "v2",
				proofFormats: {
					indy: {
						name: "args_name",
						version: "args_version" ?? "1.0",
						nonce: String(new Date().getTime()),
						requestedAttributes: previewAttributes,
					},
				},
			});
			const { invitationUrl, message: connectionlessMessage } =
				await this.agent.oob.createLegacyConnectionlessInvitation({
					domain: "args_domain",
					recordId: proofRecord.id,
					message,
				});

			return { invitationUrl, connectionlessMessage };
		} catch (error) {
			console.log(
				"[createConnectionlessProof()]: Error Credential Record not found."
			);
			return null;
		}
	}

	async revokeCredential({}) {
		throw new Error("Not implemented yet.");
	}
}
