import Link from "next/link";
import { graphql, useFragment } from "react-relay";
import { ArrowSquareOut } from "phosphor-react";
import { GridTitle, GridValue } from "./GridInfo";
import { CredentialDefinitionInfo_definition$key } from "../../../__generated__/CredentialDefinitionInfo_definition.graphql";

interface Props {
	queryRef: CredentialDefinitionInfo_definition$key;
}
export const CredentialDefinitionInfo = ({ queryRef }: Props) => {
	const data = useFragment(
		graphql`
			fragment CredentialDefinitionInfo_definition on CredentialDefinition {
				id
				schemaId
				type
				tag
				ver
			}
		`,
		queryRef
	);

	return (
		<div className="w-full">
			<p className="text-xl font-semibold">Credential Definition Status</p>
			<div className="mt-2 grid w-full grid-cols-3">
				<GridTitle>Credential Definition ID:</GridTitle>
				<GridValue>{data.id}</GridValue>
				<GridTitle>Corresponding Schema ID:</GridTitle>
				<GridValue>{data.schemaId}</GridValue>
				<GridTitle>Type:</GridTitle>
				<GridValue>{data.type}</GridValue>
				<GridTitle>Tag:</GridTitle>
				<GridValue>{data.tag}</GridValue>
				<GridTitle>Version:</GridTitle>
				<GridValue>{data.ver}</GridValue>
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
