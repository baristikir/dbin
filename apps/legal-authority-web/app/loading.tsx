"use client";
import { LoadingSpinner } from "@dbin/ui";

export default function Loading() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<LoadingSpinner size="md" />
		</div>
	);
}
