import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { fetchQuery, graphql } from "relay-runtime";
import { getCurrentEnvironment } from "../relay/environment";
import { authRoutesMeQuery } from "../../__generated__/authRoutesMeQuery.graphql";

export async function fetchAuthenticationState(
	ctx: GetServerSidePropsContext,
	variables?: Record<string, any>
) {
	const cookies = ctx.req.cookies;
	const serverEnvironment = getCurrentEnvironment(cookies);
	const query = await fetchQuery<authRoutesMeQuery>(
		serverEnvironment,
		graphql`
			query authRoutesMeQuery {
				me
			}
		`,
		variables ?? {}
	).toPromise();

	return {
		session: query ? query.me : false,
	};
}

export async function authenticatedRoute(
	ctx: GetServerSidePropsContext,
	redirect: string = "/auth/signIn"
): Promise<GetServerSidePropsResult<{}>> {
	const { session } = await fetchAuthenticationState(ctx);

	if (!session) {
		// Server-Side Redirect to login handled by Next.js
		return {
			redirect: {
				destination: `${redirect}`,
				permanent: false,
			},
		};
	}

	// Since its called in the server-side cycle and will be serialized into JSON for the pages source
	// to improve initial html render including any data, we return an empty JSON
	return {
		props: {},
	};
}

export async function unauthenticatedRoute(
	ctx: GetServerSidePropsContext,
	redirect: string = "/"
): Promise<GetServerSidePropsResult<{}>> {
	const { session } = await fetchAuthenticationState(ctx);

	if (session) {
		// Server-Side Redirect to login handled by Next.js
		// Redirecting to '/' route if user is authorized
		return {
			redirect: {
				destination: `${redirect}`,
				permanent: false,
			},
		};
	}

	// Since its called in the server-side cycle and will be serialized into JSON for the pages source
	// to improve initial html render including any data, we return an empty JSON
	return {
		props: {},
	};
}
