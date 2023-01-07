import { LoadingSpinner } from "@dbin/ui";

export function LoadingSection() {
	return (
		<div className="flex h-screen w-full items-center justify-center">
			<LoadingSpinner size="md" />
		</div>
	);
}
