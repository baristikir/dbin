import "../src/styles/styles.css";
import { ClientSidebar } from "./ClientSidebar";

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<head />
			<body className="relative h-full w-full">
				<ClientSidebar />
				<div className="relative ml-[30%] h-full min-h-screen w-[70%] bg-white dark:bg-gray-700">
					{children}
				</div>
			</body>
		</html>
	);
}
