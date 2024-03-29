import { Button } from "@dbin/ui";
import Link from "next/link";
import { Info, Trash } from "phosphor-react";
import { useCallback } from "react";
import { graphql, useFragment, useMutation } from "react-relay";
import { ConnectionCardDeleteMutation } from "../../../__generated__/ConnectionCardDeleteMutation.graphql";
import { ConnectionCard_connection$key } from "../../../__generated__/ConnectionCard_connection.graphql";

interface Props {
	queryRef: ConnectionCard_connection$key;
}

export function ConnectionCard({ queryRef }: Props) {
	const data = useFragment(
		graphql`
			fragment ConnectionCard_connection on Connection {
				id
				theirDid
				theirLabel
				state
				role
				# ...ConnectionDetailsModal_connection
			}
		`,
		queryRef
	);

	const [deleteConnection, isInFlight] =
		useMutation<ConnectionCardDeleteMutation>(
			graphql`
				mutation ConnectionCardDeleteMutation($input: RemoveConnectionInput!) {
					removeConnection(input: $input)
				}
			`
		);

	const handleDeleteConnectionClick = useCallback(() => {
		deleteConnection({
			variables: {
				input: {
					connectionId: data.id,
				},
			},
		});
	}, []);

	return (
		<div className="col-span-1 flex flex-col items-start justify-start gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
			<div className="flex w-full items-center justify-end gap-4">
				<Button
					size="xs"
					variant="transparent-danger"
					disabled={isInFlight}
					onClick={handleDeleteConnectionClick}
				>
					<p className="text-sm">Delete</p>
					<Trash className="ml-2 h-4 w-4" />
				</Button>
				<Link
					href={`/connections/${data.id}`}
					// size="xs"
					// variant="system-contrast"
					// disabled={isInFlight}
					className="flex items-center"
				>
					<p className="text-sm">Details</p>
					<Info className="ml-2 h-4 w-4" />
				</Link>
			</div>
			<div className="relative flex w-full flex-col">
				<p className="text-xs text-gray-500">Agent&rsquo;s Label</p>
				<div className="">
					<p className="text-sm font-medium">{data.theirLabel}</p>
				</div>
			</div>
			<div className="relative flex w-full flex-col ">
				<p className="text-xs text-gray-500">State</p>
				<div className="">
					<p className="text-sm font-medium">{data.state}</p>
				</div>
			</div>
		</div>
	);
}
