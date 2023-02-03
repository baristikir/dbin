import clsx from "clsx";
import { useCallback } from "react";
import { IssueTypes } from ".";

const issueTypes: Record<string, IssueTypes> = {
	business: "BusinessIdentity",
};

interface Props {
	setType(value: IssueTypes): void;
}
export const SelectCredentialTypeToIssue = ({ setType }: Props) => {
	const handleStartBusinessCredentialIssue = useCallback(() => {
		setType(issueTypes.business);
	}, []);

	return (
		<div className="relative grid w-full grid-cols-2 gap-4">
			<button
				type="button"
				onClick={handleStartBusinessCredentialIssue}
				className={clsx(
					"flex w-full max-w-xl flex-col items-start rounded-md bg-gray-50 p-6 outline-none",
					"transition-color duration-150 hover:bg-gray-100/80"
				)}
			>
				<p className="font-medium">Business Credential</p>
				<p>Create new business credential for an agent</p>
			</button>
			<button
				type="button"
				disabled
				onClick={() => null}
				className={clsx(
					"flex w-full max-w-xl flex-col items-start rounded-md bg-gray-50 p-6 outline-none",
					"transition-color duration-150 hover:bg-gray-100/80",
					"disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50 disabled:hover:bg-gray-100"
				)}
			>
				<p className="font-medium">Other Credential</p>
				<p>Create new credential for an agent</p>
			</button>
		</div>
	);
};
