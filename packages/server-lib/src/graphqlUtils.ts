import path from "node:path";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { GraphQLSchema, lexicographicSortSchema, printSchema } from "graphql";

export function writeSchema(schema: GraphQLSchema, pathTo: string) {
	const schemaAsString = printSchema(lexicographicSortSchema(schema));
	const schemaPath = path.join(process.cwd(), pathTo);

	const existingSchema =
		existsSync(schemaPath) && readFileSync(schemaPath, "utf-8");

	if (existingSchema !== schemaAsString) {
		writeFileSync(schemaPath, schemaAsString);
	}
}
