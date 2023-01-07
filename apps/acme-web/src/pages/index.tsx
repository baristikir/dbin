import { LoadingSection } from "@dbin/ui";
import { Suspense } from "react";
import { HomeView } from "../components/Home";

export default function Page() {
	return (
		<div className="relative h-full w-full p-4">
			<Suspense fallback={<LoadingSection />}>
				<HomeView />
			</Suspense>
		</div>
	);
}
