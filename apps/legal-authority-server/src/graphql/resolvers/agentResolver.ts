import { GraphQLObjects } from "@dbin/server-lib";
import { CredentialSchemaRef } from "./schemaResolver";
import { getSchemaId, getCredentialDefinitionId } from "../../schemas";
import { builder } from "../builder";
import { CredentialDefinitionObjectRef } from "./schemaResolver";

const AgentObjectRef =
	builder.objectRef<GraphQLObjects.AgentObjectType>("Agent");
AgentObjectRef.implement({
	fields: (t) => ({
		label: t.string({ resolve: (parent) => parent.config.label }),
		isInitialized: t.exposeBoolean("isInitialized"),
		credentialDefinition: t.field({
			type: CredentialDefinitionObjectRef,
			nullable: true,
			resolve: async (_root, _args, { agent }) => {
				const credentialDefinitionId = getCredentialDefinitionId();
				if (!credentialDefinitionId) {
					console.log(
						"[error]: Credential definition is missing or not configured correctly."
					);
					return null;
				}

				try {
					const credDefinition = await agent.ledger.getCredentialDefinition(
						credentialDefinitionId
					);
					console.log({
						credDefinition,
					});
					return credDefinition ? credDefinition : null;
				} catch (error) {
					console.log("[error]: Credential definition not found on ledger.");
					return null;
				}
			},
		}),
		credentialSchema: t.field({
			type: CredentialSchemaRef,
			description:
				"This field resolves the BusinessCredential schema from the ledger.",
			nullable: true,
			resolve: async (_root, _args, { agent }) => {
				const schemaId = getSchemaId();
				if (!schemaId) {
					console.log(
						"[error]: Credential schema is missing or not configured correctly."
					);
					return null;
				}

				try {
					const schema = await agent.ledger.getSchema(schemaId);
					return schema ? { ...schema, attrNames: schema.attrNames.sort() } : null;
				} catch (error) {
					console.log("[error]: Credential schema not found on ledger.");
					return null;
				}
			},
		}),
	}),
});

builder.queryField("agent", (t) =>
	t.field({
		type: AgentObjectRef,
		resolve: async (_root, _args, { agent }) => {
			return agent;
		},
	})
);
