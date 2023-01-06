"use client";
import Link from "next/link";
import { ComponentProps, Fragment } from "react";
import { useRouter } from "next/router";

export type ButtonOrLinkCompProps = ComponentProps<"button"> &
	ComponentProps<"a">;

export interface ButtonOrLinkProps extends ButtonOrLinkCompProps {
	/**
	 * If the link should preserve the `redirect` parameter, set this to `true.
	 */
	preserveRedirect?: boolean;
}

/**
 * This is a base component that will render either a button or a link,
 * depending on the props that are passed to it. The link rendered will
 * also correctly get wrapped in a next/link component to ensure ideal
 * page-to-page transitions.
 */
export function ButtonOrLink({
	href,
	preserveRedirect,
	...props
}: ButtonOrLinkProps) {
	const router = useRouter();
	// const params = useSearchParams();
	const isLink = typeof href !== "undefined";
	const ButtonOrLink = isLink ? Fragment : "button";

	let content = <ButtonOrLink {...props} />;

	if (isLink) {
		const finalHref =
			preserveRedirect && router.query.redirect
				? `${href}?redirect=${encodeURIComponent(String(router.query.redirect))}`
				: href;

		return (
			<Link href={finalHref} prefetch={false}>
				{content}
			</Link>
		);
	}

	return content;
}
