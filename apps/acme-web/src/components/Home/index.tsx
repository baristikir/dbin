import { useCallback, useReducer } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";
import { atom, useAtom } from "jotai";
import { Button, EmptyConnections, EmptyCredentials } from "@dbin/ui";
import { ConnectionCard } from "./ConnectionCard";
import { ConnectWithAgentModal } from "./ConnectWithAgentModal";
import { HomeViewConnectionsQuery } from "../../../__generated__/HomeViewConnectionsQuery.graphql";
import { CredentialsCard } from "./CredentialsCard";
import { ProposeNewCredentialModal } from "./ProposeNewCredentialModal";

// JSX Component Props
interface Props {}

// Atomic statemanagement with library called Jotai.
export const homeFetchKeyAtom = atom<number>(0);
export const readHomeFetchKeyAtom = atom<number>((get) =>
	get(homeFetchKeyAtom)
);
export const handleHomeFetchKeyUpdateAtom = atom(
	null,
	(_, set, update: number) => {
		set(homeFetchKeyAtom, update);
	}
);

type ModalStates = {
	isConnectOpen: boolean;
	isProposeOpen: boolean;
};
// Handling state changes for modals and ensuring only one modal at a time being active
function modalStateReducer(prev: ModalStates, next: ModalStates): ModalStates {
	let mergedState = { ...prev, ...next };
	if (prev.isConnectOpen === true) {
		if (next.isProposeOpen === true) {
			mergedState.isConnectOpen = false;
		}
	} else if (prev.isProposeOpen) {
		if (next.isConnectOpen) {
			mergedState.isProposeOpen = false;
		}
	}

	return mergedState;
}

export function HomeView({}: Props) {
	const [fetchKey] = useAtom(homeFetchKeyAtom);
	const data = useLazyLoadQuery<HomeViewConnectionsQuery>(
		graphql`
			query HomeViewConnectionsQuery {
				agent {
					connections {
						...ConnectionCard_connection
						...ProposeNewCredentialModal_connection
					}
					credentials {
						id
					}
				}
			}
		`,
		{},
		{ fetchKey, fetchPolicy: "store-and-network" }
	);

	const [state, dispatch] = useReducer(modalStateReducer, {
		isConnectOpen: false,
		isProposeOpen: false,
	});

	const handleModalStateChange = useCallback(
		(type: "connect_with_agent" | "propose_credential", value: boolean) => {
			dispatch({
				isConnectOpen: type === "connect_with_agent" ? value : state.isConnectOpen,
				isProposeOpen: type === "propose_credential" ? value : state.isProposeOpen,
			});
		},
		[state]
	);

	return (
		<>
			<ConnectWithAgentModal
				isOpen={state.isConnectOpen}
				setIsOpen={(value) => handleModalStateChange("connect_with_agent", value)}
			/>
			<ProposeNewCredentialModal
				queryRef={data.agent.connections}
				isOpen={state.isProposeOpen}
				setIsOpen={(value) => handleModalStateChange("propose_credential", value)}
			/>

			<div className="mx-auto flex w-full max-w-xl flex-col items-start gap-12 py-12 lg:max-w-2xl 2xl:max-w-5xl">
				<div className="flex w-full items-center justify-between">
					<p className="text-3xl font-medium">Connections</p>
					<Button
						size="sm"
						variant="system-contrast"
						onClick={() => handleModalStateChange("connect_with_agent", true)}
					>
						Connect With Agent
					</Button>
				</div>
				{data.agent.connections.length > 0 ? (
					<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
						{data.agent.connections.map((connection, idx) => {
							return <ConnectionCard key={idx} queryRef={connection} />;
						})}
					</div>
				) : (
					<EmptyConnections />
				)}
			</div>

			<div className="mx-auto flex w-full max-w-xl flex-col items-start gap-12 py-12 lg:max-w-2xl 2xl:max-w-5xl">
				<div className="flex w-full items-center justify-between">
					<p className="text-3xl font-medium">Credentials</p>
					<Button
						size="sm"
						variant="system-contrast"
						onClick={() => handleModalStateChange("propose_credential", true)}
					>
						Propose New Credential
					</Button>
				</div>
				{data.agent.credentials.length > 0 ? (
					<div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
						{data.agent.credentials.map((credentialInfo, idx) => {
							return <CredentialsCard key={idx} queryRef={credentialInfo} />;
						})}
					</div>
				) : (
					<EmptyCredentials />
				)}
			</div>
		</>
	);
}
