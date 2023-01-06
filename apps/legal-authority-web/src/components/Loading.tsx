import { LoadingSpinner } from "@dbin/ui";

export function Loading() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<LoadingSpinner size="md" />
		</div>
	);
}
