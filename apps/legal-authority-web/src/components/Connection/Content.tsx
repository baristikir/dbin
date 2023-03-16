import clsx from "clsx";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useRef, useState } from "react";
import { graphql, useFragment, useMutation } from "react-relay";
import {
	Check,
	Trash,
	Clipboard as ClipboardIcon,
	ArrowLeft,
} from "phosphor-react";
import { Button, GridBaseColumn, LoadingSpinner } from "@dbin/ui";
import { ContentConnectionDeleteMutation } from "../../../__generated__/ContentConnectionDeleteMutation.graphql";
import { Content_connection$key } from "../../../__generated__/Content_connection.graphql";

interface Props {
	queryRef: Content_connection$key;
}
export const ConnectionDetailContent = ({ queryRef }: Props) => {
	const router = useRouter();
	const data = useFragment(
		graphql`
			fragment Content_connection on Connection {
				id
				state
				rawState
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
		useMutation<ContentConnectionDeleteMutation>(
			graphql`
				mutation ContentConnectionDeleteMutation($input: RemoveConnectionInput!) {
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
			updater: (cache, _data) => {
				const connectionRecord = cache.get(data.id);
				connectionRecord?.invalidateRecord();
				return router.push("/connections");
			},
		});
	}, []);

	const handleBackToConnections = () => {
		router.push("/connections");
	};

	return (
		<div className="flex flex-col">
			<div className="my-2 -ml-2">
				<button
					type="button"
					onClick={handleBackToConnections}
					className="relative flex flex-shrink-0 items-center justify-center gap-2 rounded-md bg-transparent px-3 py-1 font-medium transition-colors duration-100 hover:bg-gray-50"
				>
					<ArrowLeft weight="bold" className="h-4 w-4" />
					<p>Back</p>
				</button>
			</div>
			<div className="flex w-full flex-col items-stretch justify-start gap-2 2xl:flex-row 2xl:items-center 2xl:justify-between">
				<h1 className="text-3xl font-medium">Connection Details</h1>
				<div className="flex items-center gap-4">
					<Button
						disabled={isInFlight}
						size="sm"
						variant="danger"
						onClick={handleDeleteConnectionClick}
					>
						<Trash className="mr-2 h-4 w-4" />
						<p>Delete Connection</p>
					</Button>
				</div>
			</div>

			<div className="mt-8 flex flex-col">
				<h3 className="text-xl font-medium">Connection Data</h3>
				<div className="mt-2 grid w-full grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
					<GridBaseColumn label="Other Agent's Label">
						<p>{data.theirLabel}</p>
					</GridBaseColumn>
					<GridBaseColumn label="Connection Role">
						<p>{data.role}</p>
					</GridBaseColumn>

					<GridBaseColumn label="State">
						<div className="flex items-center gap-2">
							{data.isReady === false && <LoadingSpinner size="xxs" />}{" "}
							<div>
								<p>{data.state}</p>
								<code
									className="text-radix-red-10 dark:text-radix-red-9 rounded-md bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800"
									style={{
										fontFamily: "DejaVu Sans Mono, MonoLisa, Consolas, monospace",
									}}
								>
									protocol state: {data.rawState}
								</code>
							</div>
						</div>
					</GridBaseColumn>

					<GridBaseColumn label="DIDComm Protocol">
						<p>{data.protocolVersion}</p>
					</GridBaseColumn>

					<GridBaseColumn label="Ready for Communication">
						<p>{data.isReady === true ? "Yes" : "No"}</p>
					</GridBaseColumn>
					{data.did && (
						<div className="col-span-2 row-span-1 w-full">
							<ColumnWithInput value={data.did}>
								Connection DID (did:peer)
							</ColumnWithInput>
						</div>
					)}
					{data.theirDid && (
						<div className="col-span-2 row-span-1 w-full">
							<ColumnWithInput value={data.theirDid}>
								Other Agent&rsquo;s DID (did:peer)
							</ColumnWithInput>
						</div>
					)}
				</div>
			</div>
		</div>
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
				<label className="text-sm text-gray-500 dark:text-gray-300">
					{children}
				</label>
				{inputCopied && (
					<div className="text-radix-blue-11 flex items-center gap-2">
						<p className="text-sm">DID Copied to Clipboard</p>
						<Check weight="bold" className="h-4 w-4" />
					</div>
				)}
			</div>

			<div className="relative mt-1">
				<input
					type="text"
					ref={inputRef}
					value={value}
					contentEditable={false}
					readOnly={true}
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
