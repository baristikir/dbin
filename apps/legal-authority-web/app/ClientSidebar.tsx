"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Browsers, LockKey, ShieldCheck, Wallet } from "phosphor-react";
import { useMemo } from "react";

export function ClientSidebar() {
	return (
		<div className="fixed flex h-screen w-[30%] flex-col items-center justify-center bg-gray-900">
			<nav className="flex w-64 flex-col gap-2">
				<h6 className="text-lg font-medium text-white">Navigation</h6>
				<NavigationLink href="/">
					{(state) => (
						<>
							<Wallet
								weight={state === true ? "duotone" : "regular"}
								className="mr-4 h-5 w-5"
							/>
							<p>Agent</p>
						</>
					)}
				</NavigationLink>
				<NavigationLink href="/connections">
					{(state) => (
						<>
							<Browsers
								weight={state === true ? "duotone" : "regular"}
								className="mr-4 h-5 w-5"
							/>
							<p>Connections</p>
						</>
					)}
				</NavigationLink>
				<NavigationLink href="/credentials">
					{(state) => (
						<>
							<ShieldCheck
								weight={state === true ? "duotone" : "regular"}
								className="mr-4 h-5 w-5"
							/>
							<p>Credentials</p>
						</>
					)}
				</NavigationLink>
				<NavigationLink href="/issued-credentials">
					{(state) => (
						<>
							<LockKey
								weight={state === true ? "duotone" : "regular"}
								className="mr-4 h-5 w-5"
							/>
							<p>Issued Credentials</p>
						</>
					)}
				</NavigationLink>
			</nav>
		</div>
	);
}

interface NavigationLinkProps {
	href: string;
	children(state: boolean): React.ReactNode;
}
const NavigationLink = ({ href, children }: NavigationLinkProps) => {
	const pathname = usePathname();
	const state: boolean = useMemo(
		() => (pathname ? pathname === href : false),
		[pathname]
	);

	console.log({ pathname });

	return (
		<Link
			href={href}
			className={clsx(
				"flex w-full items-center justify-start rounded-lg px-4 py-2.5",
				"transition-colors duration-200 hover:bg-gray-700 hover:text-white",
				{ "font-medium text-white": state, "font-normal text-gray-300": !state }
			)}
		>
			{children(state)}
		</Link>
	);
};
