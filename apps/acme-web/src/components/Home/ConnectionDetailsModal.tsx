import clsx from "clsx";
import { ReactNode, useCallback, useRef, useState } from "react";
import { useAtom } from "jotai";
import { graphql, useFragment, useMutation } from "react-relay";
import { Button, LoadingSpinner, Modal } from "@dbin/ui";
import {
	ArrowClockwise,
	Check,
	Clipboard as ClipboardIcon,
	Trash,
} from "phosphor-react";
import {
	handleHomeFetchKeyUpdateAtom,
	readHomeFetchKeyAtom,
} from "../../../app/ClientView";
import { ConnectionDetailsModal_connection$key } from "../../../__generated__/ConnectionDetailsModal_connection.graphql";
import { ConnectionDetailsModalDeleteMutation } from "../../../__generated__/ConnectionDetailsModalDeleteMutation.graphql";

interface Props {
	queryRef: ConnectionDetailsModal_connection$key;
	isOpen: boolean;
	setIsOpen(value: boolean): void;
}

export const ConnectionDetailsModal = ({
	queryRef,
	isOpen,
	setIsOpen,
}: Props) => {
	const [fetchKey] = useAtom(readHomeFetchKeyAtom);
	const [, setFetchKey] = useAtom(handleHomeFetchKeyUpdateAtom);
	const data = useFragment(
		graphql`
			fragment ConnectionDetailsModal_connection on Connection {
				id
				state
				isStateCompleted
				role
				protocol
				protocolVersion
				did
				theirDid
				theirLabel
				threadId
				invitationDid
				oobId
				mediatorId
				isReady
				isRequester
				autoAcceptConnection
				errMessage
			}
		`,
		queryRef
	);

	const [deleteConnection, isInFlight] =
		useMutation<ConnectionDetailsModalDeleteMutation>(
			graphql`
				mutation ConnectionDetailsModalDeleteMutation(
					$input: RemoveConnectionInput!
				) {
					removeConnection(input: $input)
				}
			`
		);

	const handleRemoveConnectionClick = () => {
		deleteConnection({
			variables: {
				input: {
					id: data.id,
				},
			},
			updater: (cache, _data) => {
				if (_data.removeConnection === true) {
					const connectionRecord = cache.get(data.id);
					connectionRecord?.invalidateRecord();

					setFetchKey(fetchKey + 1);
					setIsOpen(false);
				}
			},
		});
	};

	const handleRefreshConnectionClick = useCallback(() => {
		setFetchKey(fetchKey + 1);
	}, [data, fetchKey]);

	return (
		<Modal title="Connection Details" isOpen={isOpen} setOpen={setIsOpen}>
			<div className="relative w-full p-4">
				<div className="flex flex-col gap-y-4 rounded-md bg-gray-50 p-2 dark:bg-gray-700 xl:p-4">
					<div className="grid grid-cols-2 gap-2">
						{data.theirLabel && (
							<Column label="Other Agent's Label">
								<>{data.theirLabel}</>
							</Column>
						)}
						<Column label="Connection Role">
							<>{data.role}</>
						</Column>
					</div>
					<div className="grid grid-cols-2 gap-2">
						{data.protocolVersion && (
							<Column label="DIDComm Protocol">
								<>{data.protocolVersion}</>
							</Column>
						)}

						<Column label="State">
							<div className="flex items-center gap-2">
								{(data.isReady === false || data.isStateCompleted === false) && (
									<LoadingSpinner size="xxs" />
								)}{" "}
								{data.state}
							</div>
						</Column>
					</div>
					<div className="grid grid-cols-2 gap-2">
						{data.isReady && (
							<Column label="Ready for Communication">
								<>
									{data.isReady === true || data.isStateCompleted === true
										? "Yes"
										: "No"}
								</>
							</Column>
						)}
					</div>
					<div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />
					{data.did && (
						<ColumnWithInput value={data.did}>
							<>Connection DID (did:peer)</>
						</ColumnWithInput>
					)}
					{data.theirDid && (
						<ColumnWithInput value={data.theirDid}>
							<>Other Agent's DID (did:peer)</>
						</ColumnWithInput>
					)}
				</div>

				<div className="mt-6 flex items-center gap-4">
					{!data.isReady && (
						<Button
							disabled={isInFlight}
							variant="system-contrast"
							onClick={handleRefreshConnectionClick}
						>
							<ArrowClockwise className="mr-2 h-4 w-4" />
							<p>Refresh Data</p>
						</Button>
					)}
					<Button
						disabled={isInFlight}
						variant="transparent-danger"
						onClick={handleRemoveConnectionClick}
					>
						<Trash className="mr-2 h-4 w-4" />
						<p>Delete Connection</p>
					</Button>
				</div>
			</div>
		</Modal>
	);
};

interface ColumnWithInputProps {
	value: string;
	children: ReactNode;
}
const ColumnWithInput = ({ children, value }: ColumnWithInputProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [inputCopied, setInputCopied] = useState(false);

	const handleCopyToClipboard = async () => {
		if (!value || value.length === 0) return;
		if ("clipboard" in navigator) {
			setInputCopied(true);
			return await navigator.clipboard.writeText(value);
		} else {
			setInputCopied(true);
			return document.execCommand("copy", true, value);
		}
	};

	return (
		<div className="flex flex-col">
			<div className="flex w-full items-center justify-between">
				<p className="text-sm text-gray-500 dark:text-gray-300">{children}</p>
				{inputCopied && (
					<div className="text-radix-blue-11 flex items-center gap-2">
						<p className="text-sm">URL Copied to Clipboard</p>
						<Check weight="bold" className="h-4 w-4" />
					</div>
				)}
			</div>

			<div className="relative mt-1">
				<input
					type={"text"}
					ref={inputRef}
					value={value}
					contentEditable={false}
					onClick={handleCopyToClipboard}
					className={clsx(
						"border border-gray-300/50 bg-white text-sm font-normal text-black placeholder:text-gray-400/50 placeholder-shown:text-opacity-25 focus:bg-gray-50 dark:border-gray-500/40 dark:bg-gray-800 dark:text-white dark:focus:bg-gray-800",
						"focus:ring-radix-blue-8/20 focus:border-radix-blue-8 relative z-40 w-full appearance-none rounded-lg outline-none transition duration-300 focus:ring",
						"px-4 py-3",
						"disabled:bg-gray-500/20 disabled:opacity-60"
					)}
				/>
				<button
					type="button"
					onClick={handleCopyToClipboard}
					className="absolute top-2 right-2 z-50 flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 outline-none transition-opacity duration-150 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500"
				>
					<ClipboardIcon className="h-5 w-5" weight="regular" />
				</button>
			</div>
		</div>
	);
};

interface ColumnProps {
	label: string;
	children: ReactNode;
}
const Column = ({ label, children }: ColumnProps) => {
	return (
		<div className="col-span-1 flex w-full flex-col">
			<p className="text-sm text-gray-500 dark:text-gray-300">{label}</p>

			<div className="relative mt-1">
				<p className={clsx("font-medium")}>{children}</p>
			</div>
		</div>
	);
};
