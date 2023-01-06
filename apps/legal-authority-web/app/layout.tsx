import "../src/styles/styles.css";
import { ClientSidebar } from "./ClientSidebar";

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<head />
			<body className="relative flex h-full w-full flex-col xl:flex-row">
				<ClientSidebar />
				<div className="relative ml-[30%] h-full min-h-screen w-[70%]">
					{children}
				</div>
			</body>
		</html>
	);
}
