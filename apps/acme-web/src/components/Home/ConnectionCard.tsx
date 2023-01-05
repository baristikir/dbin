import { Button } from "@dbin/ui";
import { Info } from "phosphor-react";
import { useCallback, useState } from "react";
import { graphql, useFragment } from "react-relay";
import { ConnectionCard_connection$key } from "../../../__generated__/ConnectionCard_connection.graphql";
import { ConnectionDetailsModal } from "./ConnectionDetailsModal";

interface Props {
	queryRef: ConnectionCard_connection$key;
}

export function ConnectionCard({ queryRef }: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const data = useFragment(
		graphql`
			fragment ConnectionCard_connection on Connection {
				id
				theirDid
				theirLabel
				state
				role
				...ConnectionDetailsModal_connection
			}
		`,
		queryRef
	);

	const handleDetailsClick = useCallback(() => setIsOpen(true), []);

	return (
		<>
			<ConnectionDetailsModal
				queryRef={data}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
			<div className="col-span-1 flex flex-col items-start justify-start gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
				<div className="flex w-full items-center justify-end">
					<Button size="xs" variant="primary" onClick={handleDetailsClick}>
						<p className="text-sm">Details</p>
						<Info className="ml-2 h-4 w-4" />
					</Button>
				</div>
				<div className="relative flex w-full flex-col">
					<p className="text-xs text-gray-500">Agent's Label</p>
					<div className="">
						<p className="text-sm font-medium">{data?.theirLabel}</p>
					</div>
				</div>
				<div className="relative flex w-full flex-col ">
					<p className="text-xs text-gray-500">State</p>
					<div className="">
						<p className="text-sm font-medium">{data?.state}</p>
					</div>
				</div>
			</div>
		</>
	);
}
