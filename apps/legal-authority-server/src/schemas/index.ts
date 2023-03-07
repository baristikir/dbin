import { writeFileSync } from "node:fs";
import prodSchema from "./schema-prod.json";
import localSchema from "./schema-local.json";

let schemaId: string | undefined = undefined;
let credentialDefinitionId: string | undefined = undefined;

schemaId = prodSchema.schemaId;
credentialDefinitionId = prodSchema.credentialDefinitionId;

export function saveSchemaId(newSchemaId: string) {
	let schemas = prodSchema;

	schemaId = newSchemaId;
	const updatedSchema = { ...schemas, schemaId };
	writeFileSync("schema.json", JSON.stringify(updatedSchema, null, 2));
}

export function saveCredentialDefinitionId(newCredentialDefinitionId: string) {
	let schemas = prodSchema;

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
