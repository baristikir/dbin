export function isNullish<T>(
	val: T
): val is typeof val extends undefined
	? T
	: typeof val extends null
	? T
	: never {
	return val === null || val === undefined;
}
