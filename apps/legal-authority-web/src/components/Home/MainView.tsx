import { graphql, PreloadedQuery, usePreloadedQuery } from "react-relay";
// import { AgentStatus } from "./AgentStatus";
// import { AgentConnections } from "./AgentConnections";
import { MainViewQuery } from "../../../__generated__/MainViewQuery.graphql";

interface Props {
	queryRef: PreloadedQuery<MainViewQuery>;
}

export function MainView({ queryRef }: Props) {
	const data = usePreloadedQuery(
		graphql`
			query MainViewQuery {
				connections {
					id
				}
				agent {
					label
					isInitialized
				}
			}
		`,
		queryRef
	);

	return (
		<div className="relative grid h-full min-h-screen place-items-center">
			{/* <AgentStatus queryRef={data.agentStatus} />
			<AgentConnections queryRef={data.connections} /> */}
			<p>{data.agent.label}</p>
		</div>
	);
}
