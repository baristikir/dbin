import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";
import { Agent } from "@aries-framework/core";
import { IncomingMessage } from "http";

interface BaseContext {
	req: IncomingMessage;
}
export interface Context extends BaseContext {
	agent?: Agent | null;
}
interface AuthContext {
	agent: Agent;
}
interface SchemaBuilderTypes {
	DefaultFieldNullability: false;
	DefaultInputFieldRequiredness: true;
	Context: Context & AuthContext;
	AuthScopes: {
		withAgent: boolean;
	};
	AuthContexts: {
		withAgent: Context & AuthContext;
	};
	Scalars: {
		DateTime: { Input: Date; Output: Date };
	};
}

// @ts-ignore
export const builder = new SchemaBuilder<SchemaBuilderTypes>({
	defaultInputFieldRequiredness: true,
	plugins: [ScopeAuthPlugin, ValidationPlugin],
	authScopes: ({ agent }) => ({
		withAgent: !!agent,
	}),
});

// Registering schema types for `Query`, `Mutation` and `Subscription`.
// Default authentication rule is set to `withAgent`, which means that
// any resolver that is about to be executed needs to fulfill the
// condition of existing agent instance in the servers GraphQL context.
builder.queryType({
	authScopes: {
		withAgent: true,
	},
});

builder.mutationType({
	authScopes: {
		withAgent: true,
	},
});

builder.scalarType("DateTime", {
	serialize: (date) => date.toISOString(),
	parseValue: (date) => {
		if (typeof date !== "string") {
			throw new Error("Invalid date");
		}

		return new Date(date);
	},
});
