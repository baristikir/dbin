import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { getCurrentEnvironment } from "../relay/environment";
import "@dbin/ui/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	const environment = getCurrentEnvironment();

	return (
		<RelayEnvironmentProvider environment={environment}>
			<Component {...pageProps} />
		</RelayEnvironmentProvider>
	);
}
