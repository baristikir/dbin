import { Schema } from "indy-sdk";
import { Agent } from "@aries-framework/core";
import {
	getCredentialDefinitionId,
	getSchemaId,
	saveCredentialDefinitionId,
	saveSchemaId,
} from "./schemas";
import { isNullish } from "./utils/checkNullish";

export async function checkRegistrationOnLedger(agent: Agent) {
	if (agent.isInitialized !== true) {
		// Temporary sleeping till agent is initialized fully, which is a async process.
		// It requires connecting to ledger pools, resulting in network latency and timeouts sometimes,
		// and setting up the internal infrastructure.
		setTimeout(() => checkRegistrationOnLedger(agent), 2500);
	}

	let schemaId = getSchemaId();
	let credentialDefinitionId = getCredentialDefinitionId();
	if (isNullish(schemaId) || schemaId.length <= 0) {
		const credentialSchema = await registerBusinessCredentialSchema(agent);
		schemaId = credentialSchema.id;
		saveSchemaId(schemaId);
	}

	if (
		(isNullish(credentialDefinitionId) || credentialDefinitionId.length <= 0) &&
		schemaId.length > 0
	) {
		const credentialDefinition = await registerBusinessCredentialDefinition(
			agent,
			schemaId
		);
		credentialDefinitionId = credentialDefinition.id;
		saveCredentialDefinitionId(credentialDefinitionId);
	}
}

export async function registerBusinessCredentialSchema(agent: Agent) {
	console.log("[info] Registering BusinessCredential schema to ledger");
	const credentialSchema = await agent.ledger.registerSchema({
		name: "BusinessCredential",
		version: "1.0",
		attributes: [
			"company_registered_name",
			"company_registered_adress",
			"company_registered_country",
			"company_status",
			"company_creation_date",
		],
	});

	return credentialSchema;
}
export async function registerBusinessCredentialDefinition(
	agent: Agent,
	credentialSchemaOrId: Schema | string
) {
	console.log("[info] Registering BusinessCredential definition to ledger");

	let credentialSchema: Schema;
	if (typeof credentialSchemaOrId === "string") {
		credentialSchema = await agent.ledger.getSchema(credentialSchemaOrId);
	} else {
		credentialSchema = credentialSchemaOrId;
	}

	const credentialDefinition = await agent.ledger.registerCredentialDefinition({
		schema: credentialSchema,
		supportRevocation: true,
		tag: "BusinessCredentialDefinition",
	});

	return credentialDefinition;
}
