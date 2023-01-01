"use client";
import { Button, Form, Input, SubmitButton, useZodForm } from "@dbin/ui";
import { z } from "zod";

const testSchema = z.object({
	url: z.string().url(),
});

export default function Web() {
	const form = useZodForm({
		schema: testSchema,
	});

	return (
		<div className="w-screen h-screen flex-col flex items-center justify-center">
			<h1 className="text-5xl font-medium">Web</h1>

			<div className="mt-12 w-full max-w-md">
				<Form
					form={form}
					onSubmit={({ url }) => {
						console.log("submit", { url });

						return new Promise((res) => setTimeout(() => res(true), 2000));
					}}
				>
					<Input label="Url" placeholder="placeholder" {...form.register("url")} />
					<SubmitButton type="submit">Submit</SubmitButton>
				</Form>
			</div>
		</div>
	);
}
