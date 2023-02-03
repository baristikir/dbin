import { CredentialService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";
import { getCredentialDefinitionId, getSchemaId } from "../../schemas";

const CredentialSchemaRef =
	builder.objectRef<GraphQLObjects.CredentialSchemaObjectType>(
		"CredentialSchema"
	);

CredentialSchemaRef.implement({
	fields: (t) => ({
		id: t.exposeString("id"),
		seqNo: t.exposeInt("seqNo"),
		name: t.exposeString("name"),
		ver: t.exposeString("ver"),
		version: t.exposeString("version"),
		attributes: t.exposeStringList("attrNames"),
	}),
});

builder.queryField("credentialSchemas", (t) =>
	t.field({
		type: CredentialSchemaRef,
		nullable: true,
		resolve: async (_root, _args, { agent }) => {
			const credentialService = new CredentialService(agent);
			const schemaId = getSchemaId();
			if (!schemaId) {
				return null;
			}

			return await credentialService.credentialSchema(schemaId);
		},
	})
);

// const IssueCredentialInput = builder.inputType("IssueCredentialInput", {
// 	fields: (t) => ({
// 		attributes: t.field({
// 			type: [IssueCredentialAttribute],
// 		}),
// 	}),
// });
// const IssueCredentialAttribute = builder.inputType("IssueCredentialAttribute", {
// 	fields: (t) => ({
// 		name: t.string(),
// 		value: t.string(),
// 	}),
// });

// builder.mutationField("issueCredential", (t) =>
// 	t.field({
// 		type: "Boolean",
// 		args: {
// 			input: t.arg({ type: IssueCredentialInput }),
// 		},
// 		resolve: async (_root, { input }, { agent }) => {
// 			const credentialService = new CredentialService(agent);

// 			const credentialDefinitionId = getCredentialDefinitionId();
// 			if (!credentialDefinitionId) {
// 				throw new Error("Credential Definition not set.");
// 			}

// 			await credentialService.issueCredential({
// 				protocolVersion: "v2",
// 				credentialDefinitionId,
// 				attributes: input.attributes,
// 			});

// 			return true;
// 		},
// 	})
// );
