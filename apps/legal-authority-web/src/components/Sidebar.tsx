import clsx from "clsx";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
	Browsers,
	ListDashes,
	LockKey,
	ShieldCheck,
	Wallet,
} from "phosphor-react";
import { IconButton } from "@dbin/ui";

export function Sidebar() {
	const [toggle, setToggle] = useState(false);
	const handleToggleMenuClick = useCallback(() => {
		setToggle(!toggle);
	}, [toggle]);

	return (
		<div className="fixed flex h-16 w-full flex-col items-center justify-between bg-black lg:h-screen lg:w-[30%]">
			<header className="flex w-full items-center justify-between px-8 lg:place-self-start lg:py-4">
				<h3 className="text-sm font-medium text-white">
					Decentralized Business Identity (DBIN)
				</h3>

				<div className="block lg:hidden">
					<IconButton
						variant="danger"
						onClick={handleToggleMenuClick}
						icon={<ListDashes className="h-5 w-5" />}
					/>
				</div>
			</header>
			<nav className={clsx("w-full flex-col gap-2 lg:w-64")}>
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
				<NavigationLink href="/credentials-schemas">
					{(state) => (
						<>
							<ShieldCheck
								weight={state === true ? "duotone" : "regular"}
								className="mr-4 h-5 w-5"
							/>
							<p>Credentials Schemas</p>
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
	const router = useRouter();
	const { pathname } = router;

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
