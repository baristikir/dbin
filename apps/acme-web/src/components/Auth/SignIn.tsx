import { z } from "zod";
import { useRouter } from "next/router";
import { graphql, useMutation } from "react-relay";
import { Form, Input, SubmitButton, useZodForm } from "@dbin/ui";
import { SignInMutation } from "../../../__generated__/SignInMutation.graphql";

const signInSchema = z.object({
	email: z.string().email().min(1),
	password: z.string().min(1),
});

export function SignInPage() {
	const router = useRouter();
	const form = useZodForm({
		schema: signInSchema,
	});

	const [signIn, isInFlight] = useMutation<SignInMutation>(
		graphql`
			mutation SignInMutation($input: SignInInput!) {
				signIn(input: $input)
			}
		`
	);

	return (
		<div className="grid h-full min-h-screen w-full min-w-max place-items-center">
			<div className="w-full max-w-lg rounded-xl border border-gray-300/20 bg-white p-8 dark:border-gray-500/40 dark:bg-gray-900">
				<Form
					form={form}
					onSubmit={({ email, password }) => {
						signIn({
							variables: {
								input: {
									email,
									password,
								},
							},
							onCompleted(data) {
								if (data.signIn === true) {
									router.push("/");
								}
							},
						});
					}}
				>
					<Input
						label="E-Mail Adress"
						placeholder="htw@example.com"
						disabled={isInFlight}
						{...form.register("email")}
					/>
					<Input
						type="password"
						label="Password"
						placeholder="**********"
						disabled={isInFlight}
						{...form.register("password")}
					/>
					<SubmitButton
						size="xl"
						disabled={isInFlight}
						variant="system-contrast"
						withFullWidth
					>
						Sign In
					</SubmitButton>
				</Form>
			</div>
		</div>
	);
}
