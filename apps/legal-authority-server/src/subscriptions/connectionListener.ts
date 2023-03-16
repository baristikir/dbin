import {
	Agent,
	ConnectionEventTypes,
	ConnectionStateChangedEvent,
	CredentialEventTypes,
	CredentialStateChangedEvent,
	DidExchangeState,
	ProofEventTypes,
	ProofStateChangedEvent,
	V2ProposalPresentationMessage,
	ProofState,
	V2RequestPresentationMessage,
	ProofExchangeRecord,
} from "@aries-framework/core";
import { DidCommMessageRepository } from "@aries-framework/core/build/storage";
import { pubsub } from "../utils/pubsub";
import { CONNECTION_ACCEPTED, CONNECTION_REQUEST } from "./connectionsTopics";

export async function registerAgentConnectionListener(agent: Agent) {
	// Connection listener
	agent.events.on<ConnectionStateChangedEvent>(
		ConnectionEventTypes.ConnectionStateChanged,
		({ payload, metadata, type }) => {
			console.log(
				"[event-listener]: New Connection Response for '@dbin/legal-authority-server' agent."
			);
			console.log(
				`[event-listener]: ConnectionRecord & State: ${payload.connectionRecord.id} ++ ${payload.connectionRecord.state} , previousState: ${payload.previousState}`
			);

			switch (payload.connectionRecord.state) {
				case DidExchangeState.Completed:
					pubsub.publish(CONNECTION_ACCEPTED);
					break;
				case DidExchangeState.RequestSent:
					pubsub.publish(CONNECTION_REQUEST);
					break;

				default:
					break;
			}
		}
	);

	// Credential message listener
	agent.events.on<CredentialStateChangedEvent>(
		CredentialEventTypes.CredentialStateChanged,
		({ payload, metadata, type }) => {
			console.log(
				"[event-listener]: New Credential Message for '@dbin/legal-authority-server' agent."
			);
			console.log("[event-listener]: event payload", payload);

			// switch (payload.connectionRecord.state) {
			// 	case DidExchangeState.Completed:
			// 		pubsub.publish(CONNECTION_ACCEPTED);
			// 		break;
			// 	case DidExchangeState.RequestSent:
			// 		pubsub.publish(CONNECTION_REQUEST);
			// 		break;

			// 	default:
			// 		break;
			// }
		}
	);

	agent.events.on<ProofStateChangedEvent>(
		ProofEventTypes.ProofStateChanged,
		async ({ payload, type, metadata }) => {
			switch (payload.proofRecord.state) {
				case ProofState.ProposalReceived:
					await handleProposalReceivedEvent(agent, payload);
				case ProofState.RequestReceived:
					const didCommMessageRepository =
						agent.dependencyManager.resolve<DidCommMessageRepository>(
							DidCommMessageRepository
						);
					const request = await didCommMessageRepository.findAgentMessage(
						agent.context,
						{
							associatedRecordId: payload.proofRecord.id,
							messageClass: V2RequestPresentationMessage,
						}
					);
					console.log("[event-listener]: Got Presentation Request: ", request);
					console.log(
						"[event-listener]: Presentation Attachment data: ",
						request?.requestPresentationsAttach[0].getDataAsJson()
					);
					break;
				case ProofState.PresentationReceived:
					console.log(
						"[event-listener]: Got Presentation Event ",
						payload.proofRecord
					);
					const acceptedPresentation = await agent.proofs.acceptPresentation(
						payload.proofRecord.id
					);
					console.log(
						"[event-listener]: Presentation was accepted ",
						acceptedPresentation
					);
					break;
				default:
					console.log(
						"[event-listener]: Unhandled `ProofState` event ",
						payload.proofRecord.state
					);
					break;
			}

			// const request = await didCommMessageRepository.findAgentMessage(
			// 	agent.context,
			// 	{
			// 		associatedRecordId: payload.proofRecord.id,
			// 		messageClass: V2RequestPresentationMessage,
			// 	}
			// );

			// console.log("[event-listener]: Got Presentation Request: ", request);
		}
	);
}

async function handleProposalReceivedEvent(
	agent: Agent,
	payload: {
		proofRecord: ProofExchangeRecord;
		previousState: ProofState | null;
	}
) {
	const didCommMessageRepository =
		agent.dependencyManager.resolve<DidCommMessageRepository>(
			DidCommMessageRepository
		);
	const proposal = await didCommMessageRepository.findAgentMessage(
		agent.context,
		{
			associatedRecordId: payload.proofRecord.id,
			messageClass: V2ProposalPresentationMessage,
		}
	);

	console.log("[event-listener]: Got Proof Proposal: ", proposal);
	console.log(
		`[event-listener]: Attachment Data of Proposal (${proposal?.id}): `,
		proposal
			?.getAttachmentFormats()
			.map((att) => console.log(att.attachment.getDataAsJson()))
	);

	await agent.proofs.acceptProposal({
		proofRecordId: payload.proofRecord.id,
	});
}
