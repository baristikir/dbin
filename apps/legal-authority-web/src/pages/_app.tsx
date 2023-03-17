import { AppProps } from "next/app";
import { RelayEnvironmentProvider } from "react-relay";
import { getCurrentEnvironment } from "../relay/environment";
import "../styles/styles.css";

export default function App({ Component, pageProps }: AppProps) {
	const environment = getCurrentEnvironment();

	return (
		<RelayEnvironmentProvider environment={environment}>
			<noscript>
				<div>
					You dont have javascript enabled. Good luck with that. This application
					requires Javascript to function and behave as expected.
				</div>
			</noscript>
			<Component {...pageProps} />
		</RelayEnvironmentProvider>
	);
}
