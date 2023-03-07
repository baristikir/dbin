import {
	Agent,
	ConnectionEventTypes,
	ConnectionStateChangedEvent,
	DidExchangeState,
} from "@aries-framework/core";
import { pubsub } from "../utils/pubsub";
import { CONNECTION_ACCEPTED, CONNECTION_REQUEST } from "./connectionsTopics";

export async function registerAgentConnectionListener(agent: Agent) {
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
}
