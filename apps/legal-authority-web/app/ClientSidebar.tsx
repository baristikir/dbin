"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
	Browsers,
	ListDashes,
	LockKey,
	ShieldCheck,
	Wallet,
} from "phosphor-react";
import { IconButton } from "@dbin/ui";

export function ClientSidebar() {
	const [toggle, setToggle] = useState(false);
	const handleToggleMenuClick = useCallback(() => {
		setToggle(!toggle);
	}, [toggle]);

	return (
		<div className="fixed flex h-12 w-full flex-col items-center justify-between bg-black xl:h-screen xl:w-[30%]">
			<header className="flex w-full items-center justify-between place-self-start px-8 py-4">
				<h3 className="text-sm font-medium text-white">
					Decentralized Business Identity (DBIN)
				</h3>

				<div className="">
					<IconButton
						variant="default"
						onClick={handleToggleMenuClick}
						icon={<ListDashes className="h-5 w-5" />}
					/>
				</div>
			</header>
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
				<NavigationLink href="/connections" additionalKeys={["/connection"]}>
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
			<footer></footer>
		</div>
	);
}

interface NavigationLinkProps {
	href: string;
	additionalKeys?: string[];
	children(state: boolean): React.ReactNode;
}
const NavigationLink = ({
	href,
	additionalKeys,
	children,
}: NavigationLinkProps) => {
	const pathname = usePathname();

	const state: boolean = useMemo(() => {
		if (!pathname) {
			return false;
		}

		if (pathname === href) {
			return true;
		} else if (additionalKeys) {
			const matches = additionalKeys.map((key) => pathname.startsWith(key));
			return matches.includes(true);
		} else {
			return false;
		}
	}, [pathname]);

	return (
		<Link
			href={href}
			className={clsx(
				"flex w-full items-center justify-start rounded-lg px-4 py-2.5",
				"transition-colors duration-200 hover:bg-gray-700 hover:text-white",
				{ "bg-gray-800": state },
				{ "font-medium text-white": state, "font-normal text-gray-300": !state }
			)}
		>
			{children(state)}
		</Link>
	);
};
