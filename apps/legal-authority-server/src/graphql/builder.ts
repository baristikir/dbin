import SchemaBuilder from "@pothos/core";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ValidationPlugin from "@pothos/plugin-validation";
import SmartSubscription, {
	subscribeOptionsFromIterator,
} from "@pothos/plugin-smart-subscriptions";
import { Agent } from "@aries-framework/core";
import { pubsub } from "../utils/pubsub";

interface BaseContext {
	req: Request;
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

// GraphQL library for developing GrahQL schemas,
// with a code-first approach and focusing on typesafety resulting
// in better developer experience.
export const builder = new SchemaBuilder<SchemaBuilderTypes>({
	defaultInputFieldRequiredness: true,
	plugins: [ScopeAuthPlugin, ValidationPlugin, SmartSubscription],
	authScopes: ({ agent }) => ({
		withAgent: !!agent,
	}),
	smartSubscriptions: {
		...subscribeOptionsFromIterator((name, ctx) => {
			return pubsub.subscribe(name);
		}),
	},
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
builder.subscriptionType({
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
