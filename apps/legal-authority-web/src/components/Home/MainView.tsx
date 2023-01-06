import {
	graphql,
	PreloadedQuery,
	useLazyLoadQuery,
	usePreloadedQuery,
} from "react-relay";
// import { AgentStatus } from "./AgentStatus";
// import { AgentConnections } from "./AgentConnections";
import { MainViewQuery } from "../../../__generated__/MainViewQuery.graphql";

interface Props {
	// queryRef: PreloadedQuery<MainViewQuery>;
}

export function MainView({}: Props) {
	const data = useLazyLoadQuery<MainViewQuery>(
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
		{}
	);

	return (
		<div className="relative ml-[30%] grid h-full min-h-screen w-[70%] place-items-center">
			{/* <AgentStatus queryRef={data.agentStatus} />
			<AgentConnections queryRef={data.connections} /> */}
			<p>{data.agent.label}</p>
		</div>
	);
}
