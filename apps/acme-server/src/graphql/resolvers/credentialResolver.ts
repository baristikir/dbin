import { V2CredentialPreview } from "@aries-framework/core";
import { ConnectionService, CredentialService } from "@dbin/afj-services";
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
		connectionId: t.string(),
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
			const connectionServices = new ConnectionService(agent);

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

			const connectionRecord = await connectionServices.connectionById(
				input.connectionId
			);
			if (!connectionRecord) {
				throw new Error("No such connection record was found in agents storage.");
			}

			const credentialPreview = V2CredentialPreview.fromRecord({
				company_creation_date: attributes.created_at.toString(),
				company_registered_name: attributes.registered_name,
				company_registered_adress: attributes.registered_adress,
				company_registered_country: attributes.registered_country,
				company_status: "active",
			});

			await credentialServices.proposeCredential({
				connectionId: input.connectionId,
				credentialFormats: {
					indy: {
						attributes: credentialPreview.attributes,
						schemaIssuerDid: "SYiUQo2fGYKkUqk7evkJT1",
						schemaName: "BusinessCredential",
						schemaVersion: "1.0",
						schemaId: "SYiUQo2fGYKkUqk7evkJT1:2:BusinessCredential:1.0",
						issuerDid: "SYiUQo2fGYKkUqk7evkJT1",
						credentialDefinitionId:
							"SYiUQo2fGYKkUqk7evkJT1:3:CL:13157:BusinessCredentialDefinition",
					},
				},
			});

			return true;
		},
	})
);

const PresentProofInput = builder.inputType("PresentProofInput", {
	fields: (t) => ({
		connectionId: t.string(),
		credentialId: t.string(),
	}),
});
builder.mutationField("presentProof", (t) =>
	t.field({
		type: "Boolean",
		args: {
			input: t.arg({ type: PresentProofInput }),
		},
		resolve: async (_root, { input }, { agent }) => {
			const credentialServices = new CredentialService(agent);
			const proof = await credentialServices.presentProof(input);

			return proof ? true : false;
		},
	})
);
