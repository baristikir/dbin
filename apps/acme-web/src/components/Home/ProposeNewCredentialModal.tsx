import { z } from "zod";
import { graphql, useFragment, useMutation } from "react-relay";
import { Form, Input, Modal, Select, SubmitButton, useZodForm } from "@dbin/ui";
import { ProposeNewCredentialModalMutation } from "../../../__generated__/ProposeNewCredentialModalMutation.graphql";
import { ProposeNewCredentialModal_connection$key } from "../../../__generated__/ProposeNewCredentialModal_connection.graphql";

const proposeCredentialSchema = z.object({
	connectionId: z.string().min(1),
	registered_name: z.string().min(1),
	registered_adress: z.string().min(1),
	registered_country: z.string().min(1),
	created_at: z
		.date()
		.max(new Date(), { message: "Business can only be created in the past!" }),
});

interface Props {
	queryRef: ProposeNewCredentialModal_connection$key;
	isOpen: boolean;
	setIsOpen(value: boolean): void;
}
export const ProposeNewCredentialModal = ({
	queryRef,
	isOpen,
	setIsOpen,
}: Props) => {
	const data = useFragment(
		graphql`
			fragment ProposeNewCredentialModal_connection on Connection
			@relay(plural: true) {
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
	const form = useZodForm({
		schema: proposeCredentialSchema,
	});

	const [proposeCredential, isInFlight] =
		useMutation<ProposeNewCredentialModalMutation>(
			graphql`
				mutation ProposeNewCredentialModalMutation(
					$input: ProposeCredentialInput!
				) {
					proposeCredential(input: $input)
				}
			`
		);

	return (
		<Modal isOpen={isOpen} title="Connect With Other Agent" setOpen={setIsOpen}>
			<div className="w-full p-5">
				<div className="w-full rounded-lg  bg-gray-50 px-3 py-3 dark:bg-gray-700">
					<div className="relative mt-1">
						<Form
							form={form}
							onSubmit={(values) => {
								console.log(values);
								return new Promise((res, rej) => {
									proposeCredential({
										variables: {
											input: {
												...values,
												created_at: values.created_at.toISOString(),
											},
										},
										updater: (cache, data) => {
											res(data.proposeCredential);
										},
									});
								});
							}}
						>
							<Select
								placeholder="Select a connection"
								label="Connection"
								{...form.register("connectionId")}
							>
								<option
									value={undefined}
									hidden
									className="text-gray-300 placeholder:text-gray-300"
								>
									Select a connection
								</option>
								{data.map((connection, idx) => (
									<option key={connection.id} selected={false} value={connection.id}>
										{connection.theirLabel +
											` (id: ${connection.id.substring(0, 10)}...)`}
									</option>
								))}
							</Select>
							<Input
								label="Business Registered Name"
								placeholder="ACME Corporation Inc."
								{...form.register("registered_name")}
							/>
							<Input
								label="Business Registered Adress"
								placeholder="Example Street 123"
								{...form.register("registered_adress")}
							/>
							<Input
								label="Business Registered Country"
								placeholder="Germany"
								{...form.register("registered_country")}
							/>
							<Input
								label="Registration Date"
								type={"date"}
								placeholder="01.01.2023"
								max={new Date().toDateString()}
								{...form.register("created_at", { valueAsDate: true })}
							/>

							<SubmitButton variant="system-contrast">Propose Credential</SubmitButton>
						</Form>
					</div>
				</div>
			</div>
		</Modal>
	);
};
