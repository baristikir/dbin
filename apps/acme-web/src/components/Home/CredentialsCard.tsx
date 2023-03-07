import { Button } from "@dbin/ui";
import { Info } from "phosphor-react";

interface Props {
	queryRef: unknown;
}

export function CredentialsCard(props: Props) {
	const handleDetailsClick = () => {};

	return (
		<>
			<div className="col-span-1 flex flex-col items-start justify-start gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
				<div className="flex w-full items-center justify-end">
					<Button size="sm" variant="primary" onClick={handleDetailsClick}>
						<p className="text-sm">Details</p>
						<Info className="ml-2 h-4 w-4" />
					</Button>
				</div>
				<div className="relative flex w-full flex-col">
					<p className="text-xs text-gray-500">Credential ID</p>
					<div className="">
						<p className="text-sm font-medium">{"credential_id"}</p>
					</div>
				</div>
				<div className="relative flex w-full flex-col ">
					<p className="text-xs text-gray-500">Credential State</p>
					<div className="">
						<p className="text-sm font-medium">{"credential_state"}</p>
					</div>
				</div>
			</div>
		</>
	);
}
