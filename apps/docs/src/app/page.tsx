import { Button } from "@dbin/ui";
import { Spotlight } from "../components/SearchSpotlight";

export default function Docs() {
	return (
		<div className="h-[4000px] w-full">
			<h1 className="text-5xl">Docs</h1>
			<Spotlight></Spotlight>
			{/* <Button variant="system-contrast">Get Started</Button> */}
		</div>
	);
}
