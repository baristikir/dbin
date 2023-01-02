import { GraphQLObjects } from "@dbin/server-lib";
import { builder } from "../builder";
import { createSeed } from "../../utils/wallet";

const DidObjectRef =
	builder.objectRef<GraphQLObjects.DidObjectType>("Did");

DidObjectRef.implement({
	fields: (t) => ({
		did: t.exposeString("did"),
		verkey: t.exposeString("verkey"),
	}),
});

builder.mutationField("createDid", (t) =>
	t.field({
		type: DidObjectRef,
		deprecationReason:
			"Not compatible with afj-0.3.x version",
		resolve: async (_root, _args, { agent }) => {
			const didAndSeed = await createSeed(agent);
			console.log(
				"secret seed: ",
				didAndSeed.seed,
				"\n for did: ",
				didAndSeed.did
			);
			return didAndSeed;
		},
	})
);
