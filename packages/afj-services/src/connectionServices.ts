import {
	ConnectionRecord,
	DidExchangeState,
	HandshakeProtocol,
	OutOfBandRecord,
} from "@aries-framework/core";
import { ServiceWithAgent } from "./baseService";

type Maybe<T> = T | null | undefined;
interface ConnectionQueryFilter {
	state?: Maybe<DidExchangeState>;
	protocol?: Maybe<HandshakeProtocol>;
	isReady?: Maybe<boolean>;
	isRequester?: Maybe<boolean>;
	theirDid?: Maybe<string>;
	theirLabel?: Maybe<string>;
}

export class ConnectionService extends ServiceWithAgent {
	// Creates URL as invitation with encoded JWT payload containing connection metadata.
	// Invitation URL can be handled by aries agents.
	async createInvitation(domainUrl: string): Promise<{
		outOfBandRecord: OutOfBandRecord;
		invitationUrl: string;
	}> {
		const outOfBandRecord =
			await this.agent.oob.createInvitation();

		const invitationUrl =
			outOfBandRecord.outOfBandInvitation.toUrl({
				domain: domainUrl,
			});

		return {
			outOfBandRecord,
			invitationUrl,
		};
	}

	// Resolve invitation from URL, created by an aries agent.
	// The agent connection will be established by resolving the invitation.
	// If `autoAcceptConnections` is set to `true` on the agents config,
	// then the connection will be established by this function and the agent isn't requiring an explicit accept of the invitation.
	async receiveInvitation(invitationUrl: string) {
		const { connectionRecord } =
			await this.agent.oob.receiveInvitationFromUrl(
				invitationUrl
			);

		return connectionRecord;
	}

	// Explicitly accept an invitation from an aries agent.
	async accpetInvitation(invitationUrl: string) {
		const { outOfBandRecord } =
			await this.agent.oob.receiveInvitationFromUrl(
				invitationUrl
			);
		const { connectionRecord } =
			await this.agent.oob.acceptInvitation(
				outOfBandRecord.id,
				{}
			);

		return connectionRecord;
	}

	// Retrieve all established connections with the agent.
	async allConnections(filter?: ConnectionQueryFilter) {
		const connectionRecords =
			await this.agent.connections.getAll();

		if (filter) {
			return connectionRecords.filter((connectionRecord) => {
				for (const key in filter) {
					if (
						filter[key] === undefined ||
						filter[key] !== connectionRecord[key]
					)
						return false;
				}

				return true;
			});
		}

		return connectionRecords;
	}

	// Retrieve specific connection with the agent, queried by it's ID.
	async connectionById(
		connectionId: string,
		filter?: ConnectionQueryFilter
	) {
		const connectionRecord =
			await this.agent.connections.findById(connectionId);

		return connectionRecord;
	}

	async removeConnection(
		connectionOrId: ConnectionRecord | string
	) {
		let connectionRecord: ConnectionRecord;
		if (typeof connectionOrId === "string") {
			connectionRecord = await this.agent.connections.findById(
				connectionOrId
			);

			if (connectionRecord === null) {
				console.log(
					`[connection.services] Connection record couldn't be found with id '${connectionOrId}'`
				);

				return false;
			}
		} else {
			connectionRecord = connectionOrId;
		}

		// Deleting connection record from agent storage
		await this.agent.connections.deleteById(
			connectionRecord.id
		);

		return true;
	}
}
