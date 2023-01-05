import { useMemo } from "react";

// Utility to extract type of connections nodes.
// Simply for making it simpler to use.
type Connection<T> = {
	readonly edges: readonly ({
		readonly node?: T | null;
		readonly cursor?: string;
	} | null)[];
};
export default function useConnection<T>(
	connection?: Connection<T> | null
): T[] {
	return useMemo(
		() =>
			connection
				? (connection.edges
						.filter((edge) => !!edge?.node)
						.map((edge) => edge!.node) as T[])
				: [],
		[connection?.edges]
	);
}
