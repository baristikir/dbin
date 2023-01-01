import { GraphQLUtils } from "@dbin/server-lib";
import { builder } from "./builder";
import "./resolvers";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const schema = builder.toSchema({});

if (!IS_PRODUCTION) {
	// Generating GraphQL schema at compile time and only in development mode, in root directory of this project.
	// Shared utility, for server projects only via `@dbin/server-lib`
	GraphQLUtils.writeSchema(schema, "schema.graphql");
}
