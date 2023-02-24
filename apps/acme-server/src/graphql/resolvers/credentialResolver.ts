import { CredentialService } from "@dbin/afj-services";
import { builder } from "../builder";

const ProposeCredentialInput = builder.inputType("ProposeCredentialInput", {
	fields: (t) => ({
		registered_name: t.string(),
		registered_country: t.string(),
		registered_: t.string(),
		created_at: t.string(),
	}),
});
// builder.mutationField("proposeCredential", (t) =>
// 	t.field({
// 		type: "Boolean",
// 		args: {
// 			input: t.arg({
// 				type: ProposeCredentialInput,
// 			}),
// 		},
// 		resolve: async (_root, {}, { agent }) => {
// 			const credentialServices = new CredentialService(agent);

// 			const formatInputForSchema = (
// 				input: T extends typeof ProposeCredentialInput[infer U] ? U : never
// 			) => {};

// 			const {} = await credentialServices.proposeCredential({
// 				...input,
// 			});

// 			return false;
// 		},
// 	})
// );
