import { Button } from "@dbin/ui";
import { Plus } from "phosphor-react";
import { useMemo, useState } from "react";
import {
	graphql,
	PreloadedQuery,
	useMutation,
	usePreloadedQuery,
	useSubscription,
} from "react-relay";
import { ConnectionsViewCreateInvitationMutation } from "../../../__generated__/ConnectionsViewCreateInvitationMutation.graphql";
import { ConnectionsViewQuery } from "../../../__generated__/ConnectionsViewQuery.graphql";
import { ConnectionCard } from "./ConnectionCard";
import { CreateInvitationModal } from "./CreateInvitationModal";
import { EmptyConnections } from "@dbin/ui";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import {
	ConnectionsViewSubscription,
	ConnectionsViewSubscription$data,
} from "../../../__generated__/ConnectionsViewSubscription.graphql";

interface Props {
	queryRef: PreloadedQuery<ConnectionsViewQuery>;
}

export function ConnectionsView({ queryRef }: Props) {
	const data = usePreloadedQuery(
		graphql`
			query ConnectionsViewQuery {
				connections {
					id
					...ConnectionCard_connection
				}
			}
		`,
		queryRef
	);

	const [realtimeData, setRealtimeData] = useState<
		ConnectionsViewSubscription$data["connections"]
	>(data.connections ?? []);

	const subscriptionConfig: GraphQLSubscriptionConfig<ConnectionsViewSubscription> =
		useMemo(
			() => ({
				subscription: graphql`
					subscription ConnectionsViewSubscription {
						connections {
							id
							...ConnectionCard_connection
						}
					}
				`,
				variables: {},
				onNext: (response) => {
					if (!response) return;
					if (response.connections !== data.connections) {
						setRealtimeData(response.connections);
					}
				},
			}),
			[]
		);

	useSubscription(subscriptionConfig);

	const [invitationUrl, setInvitationUrl] = useState<string>();
	const [isInvitationOpen, setInvitationOpen] = useState(false);

	const [createInvitation, isInFlight] =
		useMutation<ConnectionsViewCreateInvitationMutation>(
			graphql`
				mutation ConnectionsViewCreateInvitationMutation {
					createInvitation
				}
			`
		);

	const handleCreateInvitationClick = () => {
		createInvitation({
			variables: {},
			onCompleted(response, errors) {
				setInvitationUrl(response.createInvitation);
				setInvitationOpen(true);
			},
		});
	};

	return (
		<>
			<CreateInvitationModal
				invitationUrl={invitationUrl ?? ""}
				isOpen={isInvitationOpen}
				setIsOpen={setInvitationOpen}
			/>
			<div className="relative flex h-full flex-col gap-12 px-16 py-24">
				<div className="flex w-full items-center justify-between">
					<h1 className="text-3xl font-medium">Connections</h1>
					<Button variant="secondary" onClick={handleCreateInvitationClick}>
						<p>Create Invitation</p>
						<Plus className="ml-2 h-4 w-4" />
					</Button>
				</div>
				{realtimeData.length > 0 ? (
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
						{realtimeData.map((connection) => (
							<ConnectionCard key={connection.id} queryRef={connection} />
						))}
					</div>
				) : (
					<EmptyConnections />
				)}
			</div>
		</>
	);
}
