import { LoadingSection } from "@dbin/ui";
import { GetServerSideProps } from "next";
import { Suspense } from "react";
import { HomeView } from "../components/Home";
import { authenticatedRoute } from "../utils/authRoutes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const authentication = await authenticatedRoute(ctx);

	if ("redirect" in authentication) {
		return authentication;
	}

	return { props: {} };
};

export default function Page() {
	return (
		<div className="relative h-full w-full p-4">
			<Suspense fallback={<LoadingSection />}>
				<HomeView />
			</Suspense>
		</div>
	);
}
