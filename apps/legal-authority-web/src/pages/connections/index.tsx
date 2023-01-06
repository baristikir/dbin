import { Suspense } from "react";
import { ConnectionsView } from "../../components/Connections";
import { Loading } from "../../components/Loading";
import { Sidebar } from "../../components/Sidebar";

export default function Page() {
	return (
		<div className="relative flex h-full w-full">
			<Sidebar />
			<Suspense fallback={<Loading />}>
				<div className="ml-[30%] w-[70%]">
					<ConnectionsView />
				</div>
			</Suspense>
		</div>
	);
}
