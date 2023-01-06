import {
	graphql,
	PreloadedQuery,
	useLazyLoadQuery,
	usePreloadedQuery,
} from "react-relay";
import { Button, EmptyConnections } from "@dbin/ui";
import { HomeViewConnectionsQuery } from "../../../__generated__/HomeViewConnectionsQuery.graphql";
import { ConnectWithAgentModal } from "./ConnectWithAgentModal";
import { useCallback, useState } from "react";
import { ConnectionCard } from "./ConnectionCard";
import { atom, useAtom } from "jotai";
import { homeFetchKeyAtom } from "../../../app/ClientView";

interface Props {
	// queryRef: PreloadedQuery<HomeViewConnectionsQuery>;
}

export function HomeView({}: Props) {
	const [fetchKey] = useAtom(homeFetchKeyAtom);
	const data = useLazyLoadQuery<HomeViewConnectionsQuery>(
		graphql`
			query HomeViewConnectionsQuery {
				connections {
					...ConnectionCard_connection
				}
			}
		`,
		{},
		{ fetchKey, fetchPolicy: "store-and-network" }
	);

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleConnectWithAgentClick = useCallback(() => {
		setIsOpen(true);
	}, []);

	return (
		<>
			<ConnectWithAgentModal isOpen={isOpen} setIsOpen={setIsOpen} />
			<div className="mx-auto flex w-full max-w-xl flex-col items-start gap-12 py-12 lg:max-w-2xl 2xl:max-w-5xl">
				<div className="flex w-full items-center justify-between">
					<p className="text-3xl font-medium">Connections</p>
					<Button variant="secondary" onClick={handleConnectWithAgentClick}>
						Connect With Agent
					</Button>
				</div>
				{data.connections.length > 0 ? (
					<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
						{data.connections.map((connection, idx) => {
							return <ConnectionCard key={idx} queryRef={connection} />;
						})}
					</div>
				) : (
					<EmptyConnections />
				)}
			</div>
		</>
	);
}