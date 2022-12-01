"use client";
import { Manrope } from "@next/font/google";
import DocsLayout from "../components/DocsLayout";
import RootProviders from "../providers/RootProviders";

import "@dbin/ui/styles";
import { Navbar } from "../components/Navbar";

const manrope = Manrope();

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={manrope.className}>
			<head>
				<title>dbin - Docs</title>
			</head>
			<body>
				<RootProviders>
					<Navbar />
					<div className="z-10">
						<DocsLayout>{children}</DocsLayout>
					</div>
				</RootProviders>
			</body>
		</html>
	);
}
