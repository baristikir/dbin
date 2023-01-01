import "./styles.css";

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<head />
			<body>{children}</body>
		</html>
	);
}
