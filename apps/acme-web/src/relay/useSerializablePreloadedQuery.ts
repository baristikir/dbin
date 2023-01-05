// Source code from the Next.js 13 Relay Example
// License: MIT
// Link to License: https://github.com/relayjs/relay-examples/blob/main/LICENSE
// Link to Source:  https://github.com/relayjs/relay-examples/blob/main/issue-tracker-next-v13/src/relay/useSerializablePreloadedQuery.ts

// Convert preloaded query object (with raw GraphQL Response) into
// Relay's PreloadedQuery.

import { useMemo } from "react";
import { PreloadedQuery, PreloadFetchPolicy } from "react-relay";
import { ConcreteRequest, IEnvironment, OperationType } from "relay-runtime";
import { responseCache } from "./environment";
import { SerializablePreloadedQuery } from "./loadSerializableQuery";

// This hook convert serializable preloaded query
// into Relay's PreloadedQuery object.
// It is also writes this serializable preloaded query
// into QueryResponseCache, so we the network layer
// can use these cache results when fetching data
// in `usePreloadedQuery`.
export default function useSerializablePreloadedQuery<
	TRequest extends ConcreteRequest,
	TQuery extends OperationType
>(
	environment: IEnvironment,
	preloadQuery: SerializablePreloadedQuery<TRequest, TQuery>,
	fetchPolicy: PreloadFetchPolicy = "store-or-network",
	setFetchKey: (key: string) => void
): PreloadedQuery<TQuery> {
	useMemo(() => {
		writePreloadedQueryToCache(preloadQuery);
		setFetchKey(preloadQuery.params.id ?? preloadQuery.params.cacheID);
	}, [preloadQuery]);

	return {
		environment,
		fetchKey: preloadQuery.params.id ?? preloadQuery.params.cacheID,
		fetchPolicy,
		isDisposed: false,
		name: preloadQuery.params.name,
		kind: "PreloadedQuery",
		variables: preloadQuery.variables,
		dispose: () => {
			return;
		},
	};
}

function writePreloadedQueryToCache<
	TRequest extends ConcreteRequest,
	TQuery extends OperationType
>(preloadedQueryObject: SerializablePreloadedQuery<TRequest, TQuery>) {
	const cacheKey =
		preloadedQueryObject.params.id ?? preloadedQueryObject.params.cacheID;
	responseCache?.set(
		cacheKey,
		preloadedQueryObject.variables,
		preloadedQueryObject.response
	);
}
