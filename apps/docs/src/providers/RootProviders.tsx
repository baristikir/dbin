"use client";

import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}

export default function RootProviders({ children }: Props) {
	return (
		<ThemeProvider storageKey="preferred-theme" attribute="class">
			{children}
		</ThemeProvider>
	);
}
