import { writeFileSync } from "node:fs";
import prodSchema from "./schema-prod.json";
import localSchema from "./schema-local.json";

let schemaId: string | undefined = undefined;
let credentialDefinitionId: string | undefined = undefined;

if (process.env.NODE_ENV === "production") {
	schemaId = prodSchema.schemaId;
	credentialDefinitionId = prodSchema.credentialDefinitionId;
} else {
	schemaId = localSchema.schemaId;
	credentialDefinitionId = localSchema.credentialDefinitionId;
}

export function saveSchemaId(newSchemaId: string) {
	let schemas = process.env.NODE_ENV === "production" ? prodSchema : localSchema;

	schemaId = newSchemaId;
	const updatedSchema = { ...schemas, schemaId };
	writeFileSync("schema.json", JSON.stringify(updatedSchema, null, 2));
}

export function saveCredentialDefinitionId(newCredentialDefinitionId: string) {
	let schemas = process.env.NODE_ENV === "production" ? prodSchema : localSchema;

	credentialDefinitionId = newCredentialDefinitionId;
	const updatedSchemas = { ...schemas, credentialDefinitionId };
	writeFileSync("schema.json", JSON.stringify(updatedSchemas, null, 2));
}

export function getSchemaId() {
	return schemaId;
}

export function getCredentialDefinitionId() {
	return credentialDefinitionId;
}
