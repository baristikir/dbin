import { Suspense } from "react";
import { Loading } from "../../components/Loading";
import { Sidebar } from "../../components/Sidebar";

export default function Page() {
	return (
		<div>
			<Sidebar />
			<Suspense fallback={<Loading />}>
				<div className="ml-[30%] flex w-[70%]">
					<div>
						<p>Credentials Schemas</p>
					</div>
				</div>
			</Suspense>
		</div>
	);
}
