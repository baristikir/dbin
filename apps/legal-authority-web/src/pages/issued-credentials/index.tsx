import { Suspense } from "react";
import { Loading } from "../../components/Loading";
import { Sidebar } from "../../components/Sidebar";

export default function Page() {
	return (
		<div className="relative flex h-full w-full">
			<Sidebar />
			<Suspense fallback={<Loading />}>
				<div className="ml-[30%] flex w-[70%] flex-col p-4">
					<h1 className="text-3xl font-medium">Issue Credentials Page</h1>
				</div>
			</Suspense>
		</div>
	);
}
