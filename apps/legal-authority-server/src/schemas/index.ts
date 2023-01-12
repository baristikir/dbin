import { writeFileSync } from "node:fs";
import schemas from "./schema.json";

let schemaId: string | undefined = schemas.schemaId ?? undefined;
let credentialDefinitionId: string | undefined =
	schemas.credentialDefinitionId ?? undefined;

export function saveSchemaId(newSchemaId: string) {
	schemaId = newSchemaId;
	const updatedSchema = { ...schemas, schemaId };
	writeFileSync("schema.json", JSON.stringify(updatedSchema, null, 2));
}

export function saveCredentialDefinitionId(newCredentialDefinitionId: string) {
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
