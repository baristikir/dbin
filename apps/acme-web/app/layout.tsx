import "@dbin/ui/styles/globals.css";
import "../src/styles/styles.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<title>ACME Platform</title>
			</head>
			<body>{children}</body>
		</html>
	);
}
