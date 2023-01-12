import { CredentialService } from "@dbin/afj-services";
import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";
import { getSchemaId } from "../../schemas";

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
