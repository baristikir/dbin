import SchemaBuilder from "@pothos/core";
import { Agent } from "@aries-framework/core";

interface BaseContext {
	req: Request;
}
export interface Context extends BaseContext {
	agent?: Agent | null;
}
interface SchemaBuilderTypes {
	DefaultFieldNullability: false;
	DefaultInputFieldRequiredness: true;
	Context: Context;
	Scalars: {
		DateTime: { Input: Date; Output: Date };
	};
}

// GraphQL library for developing GrahQL schemas,
// with a code-first approach and focusing on typesafety resulting
// in better developer experience.
export const builder = new SchemaBuilder<SchemaBuilderTypes>({
	defaultInputFieldRequiredness: true,
});

// Registering schema types for `Query`, `Mutation` and `Subscription`
builder.queryType({});

builder.scalarType("DateTime", {
	serialize: (date) => date.toISOString(),
	parseValue: (date) => {
		if (typeof date !== "string") {
			throw new Error("Invalid date");
		}

		return new Date(date);
	},
});
