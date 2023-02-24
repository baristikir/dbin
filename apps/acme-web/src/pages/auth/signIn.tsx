import { GetServerSideProps } from "next";
import { SignInPage } from "../../components/Auth/SignIn";
import { unauthenticatedRoute } from "../../utils/authRoutes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const authentication = await unauthenticatedRoute(ctx);

	if ("redirect" in authentication) {
		return authentication;
	}

	return { props: {} };
};

export default SignInPage;
