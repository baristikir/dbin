import { useRouter } from "next/router";
import { Suspense } from "react";
import { ConnectionView } from "../../../components/Connection";
import { Loading } from "../../../components/Loading";
import { Sidebar } from "../../../components/Sidebar";

export default function Page() {
	const router = useRouter();

	return (
		<div className="relative flex h-full w-full">
			<Sidebar />
			<Suspense fallback={<Loading />}>
				<div className="ml-[30%] w-[70%]">
					{router.isReady ? <ConnectionView /> : <Loading />}
				</div>
			</Suspense>
		</div>
	);
}
