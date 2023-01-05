"use client";
import { LoadingSpinner } from "@dbin/ui";

export default function Loading() {
	return (
		<div className="relative flex h-full w-full items-center justify-center">
			<LoadingSpinner size="md" />
		</div>
	);
}
