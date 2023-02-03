import { z } from "zod";
import { Form, Input, SubmitButton, useZodForm } from "@dbin/ui";
import { graphql, useMutation } from "react-relay";
import { useRouter } from "next/router";
import { IssueBusinessCredentialFormMutation } from "../../../../__generated__/IssueBusinessCredentialFormMutation.graphql";

const businessCredentialSchema = z.object({
	name: z.string().min(2),
	adress: z.string().min(2),
	country: z.string().min(2),
	status: z.string().min(2),
	created_at: z.string().datetime({}),
});

interface Props {
	connId: string;
}
export const IssueBusinessCredentialForm = ({ connId }: Props) => {
	const form = useZodForm({
		schema: businessCredentialSchema,
	});

	const [issueBusiness, isInFlight] =
		useMutation<IssueBusinessCredentialFormMutation>(
			graphql`
				mutation IssueBusinessCredentialFormMutation(
					$input: IssueCredentialInput!
				) {
					issueCredential(input: $input) {
						status
						payload
					}
				}
			`
		);

	return (
		<Form
			form={form}
			onSubmit={(values) => {
				issueBusiness({
					variables: {
						input: {
							connectionId: connId,
							attributes: [
								...Object.entries(values).map(([key, value]) => ({
									name: key,
									value,
								})),
							],
						},
					},
				});
			}}
		>
			<div className="flex flex-col gap-2">
				<Input
					label="Company Name"
					placeholder="Registered Company Name"
					{...form.register("name")}
				/>
				<Input
					label="Company Adress"
					placeholder="Registered Company Adress"
					{...form.register("adress")}
				/>
				<Input
					label="Country"
					placeholder="Registered Country"
					{...form.register("country")}
				/>
				<Input
					type={"date"}
					min={new Date().toDateString()}
					label="Creation Date"
					placeholder="Creation Date of Company"
					{...form.register("country")}
				/>
			</div>
			<div className="mt-4">
				<SubmitButton variant="system-contrast">Create Credential</SubmitButton>
			</div>
		</Form>
	);
};
