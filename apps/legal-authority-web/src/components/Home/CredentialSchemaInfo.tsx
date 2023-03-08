import Link from "next/link";
import { graphql, useFragment } from "react-relay";
import { ArrowSquareOut } from "phosphor-react";
import { GridTitle, GridValue } from "./GridInfo";
import { CredentialSchemaInfo_schema$key } from "../../../__generated__/CredentialSchemaInfo_schema.graphql";

interface Props {
	queryRef: CredentialSchemaInfo_schema$key;
}
export const CredentialSchemaInfo = ({ queryRef }: Props) => {
	const data = useFragment(
		graphql`
			fragment CredentialSchemaInfo_schema on CredentialSchema {
				id
				attributes
				name
				ver
				seqNo
				version
			}
		`,
		queryRef
	);

	if (!data || !queryRef) {
		return null;
	}

	return (
		<div className="w-full">
			<p className="text-xl font-semibold">Credential Schema Status </p>
			<div className="mt-2 grid w-full grid-cols-3">
				<GridTitle>Schema ID:</GridTitle>
				<GridValue>{data.id}</GridValue>
				<GridTitle>Credential Name:</GridTitle>
				<GridValue>{data.name}</GridValue>
				<GridTitle>Version</GridTitle>
				<GridValue>{data.version}</GridValue>
				<GridTitle>Sequence No.:</GridTitle>
				<GridValue>{data.seqNo}</GridValue>
				<GridTitle>Attributes:</GridTitle>
				<div className="col-span-2 flex w-full flex-col rounded-md bg-gray-50 px-3 py-1.5 font-medium dark:bg-gray-700">
					{data.attributes.map((attr, idx) => (
						<code key={idx} className="text-radix-red-10 text-sm font-medium">
							{attr + (data.attributes.length - 1 !== idx ? ", " : "")}
						</code>
					))}
				</div>

				<div className="col-span-1"></div>
				<Link
					target={"_blank"}
					referrerPolicy="no-referrer"
					href={`http://greenlight.bcovrin.vonx.io/browse/domain/${data.id}`}
					className="col-span-2 mt-2 flex w-full items-center font-medium"
				>
					<p>View Transaction on Domain Ledger</p>
					<ArrowSquareOut weight="bold" className="ml-1 h-4 w-4" />
				</Link>
			</div>
		</div>
	);
};
