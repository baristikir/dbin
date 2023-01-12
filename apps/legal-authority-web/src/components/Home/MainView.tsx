import { graphql, useLazyLoadQuery } from "react-relay";
import { MainViewQuery } from "../../../__generated__/MainViewQuery.graphql";

interface Props {}
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
		<div className="relative m-0 grid h-full min-h-screen w-full place-items-center md:ml-[30%] md:w-[70%]">
			<p>{data.agent.label}</p>
		</div>
	);
}
