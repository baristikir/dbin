"use client";

import clsx from "clsx";
import { GithubLogo } from "phosphor-react";
import { useEffect, useState } from "react";

interface Props {}

export function Navbar({}: Props) {
	const [isAtTop, setIsAtTop] = useState(true);

	if (typeof window === "undefined") {
		return null;
	}

	function onScroll() {
		if ((window.pageYOffset || 0) < 20) setIsAtTop(true);
		else if (isAtTop) setIsAtTop(false);
	}

	useEffect(() => {
		if (!window) return;
		setTimeout(onScroll, 0);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={clsx(
				"fixed items-center justify-between flex transition px-7 py-2 z-[55] w-full h-16 border-b",
				{
					"bg-transparent border-transparent": isAtTop,
					"border-gray-300/20 dark:border-gray-500/40 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur":
						!isAtTop,
				}
			)}
		>
			<div className="relative flex items-center h-full">
				<a href="/" className="flex flex-row items-center ">
					<h3 className="text-xl text-white">Decentralized Business Identity</h3>
				</a>
			</div>
			<div className="flex">
				<a
					href="https://github.com/spacedriveapp/spacedrive"
					target="_blank"
					rel="noreferrer"
				>
					<GithubLogo weight="fill" className="text-white" />
				</a>
			</div>
		</div>
	);
}
