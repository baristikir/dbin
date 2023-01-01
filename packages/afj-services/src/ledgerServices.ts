import { RequestInfo, ResponseInit } from "node-fetch";

// For network request purposes only.
const fetch = (url: RequestInfo, init?: ResponseInit) =>
	import("node-fetch").then(({ default: fetch }) => fetch(url, init));

// Hyperledger Indy networks will return the genesis file as a plaintext response
export async function fetchGenesisTransaction(
	ledgerUrl: string
): Promise<string> {
	console.log(
		"[ledger.services] Fetching Genesis Transaction for Indy Ledger.."
	);
	const res = await fetch(ledgerUrl);
	return await res.text();
}
