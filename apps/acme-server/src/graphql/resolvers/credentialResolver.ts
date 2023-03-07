import { CredentialService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { z } from "zod";
import { builder } from "../builder";

export const CredentialObjectRef =
	builder.objectRef<GraphQLObjects.CredentialObjectType>("Credential");
CredentialObjectRef.implement({
	fields: (t) => ({
		id: t.exposeString("id"),
		threadId: t.exposeString("threadId"),
		state: t.exposeString("state"),
		protocolVersion: t.exposeString("protocolVersion"),
		type: t.exposeString("type"),
		connectionId: t.exposeString("connectionId", {
			nullable: true,
		}),
	}),
});

const ProposeCredentialInput = builder.inputType("ProposeCredentialInput", {
	fields: (t) => ({
		registered_name: t.string(),
		registered_country: t.string(),
		registered_adress: t.string(),
		created_at: t.string(),
	}),
});

const BusinessCredentialSchema = z.object({
	registered_name: z.string().min(1),
	registered_adress: z.string().min(1),
	registered_country: z.string().min(1),
	created_at: z.date().max(new Date()),
});

builder.mutationField("proposeCredential", (t) =>
	t.field({
		type: "Boolean",
		args: {
			input: t.arg({
				type: ProposeCredentialInput,
			}),
		},
		resolve: async (_root, { input }, { agent }) => {
			const credentialServices = new CredentialService(agent);

			const attributes = {
				registered_name: input.registered_name,
				registered_adress: input.registered_adress,
				registered_country: input.registered_country,
				created_at: new Date(input.created_at),
			};

			try {
				// Type checking the keys and value, also checking object key names
				BusinessCredentialSchema.parse(attributes);
			} catch (error) {
				console.log("Arguments do not match with credential definition.");
				throw new Error("Input args do not match with credential definition.");
			}

			// const formatInputForSchema = (
			// 	input: T extends typeof ProposeCredentialInput[infer U] ? U : never
			// ) => {};

			// const {} = await credentialServices.proposeCredential({
			// 	...input,
			// });

			return false;
		},
	})
);
