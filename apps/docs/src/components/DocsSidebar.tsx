"use client";

import clsx from "clsx";
import { useAtom } from "jotai";
import { MagnifyingGlass } from "phosphor-react";
import { useCallback } from "react";
import {
	getSpotlightState,
	handleSpotlightStateChange,
} from "./SearchSpotlight";

interface Props {}

export default function DocsSidebar({}: Props) {
	const [isOpen] = useAtom(getSpotlightState);
	const [, setOpen] = useAtom(handleSpotlightStateChange);
	const handleTriggerModal = useCallback(() => setOpen(true), [isOpen]);

	return (
		<nav className="flex flex-col w-full mr-8 sm:w-52 md:w-56 lg:w-64 xl:w-72 2xl:w-80">
			<button
				type="button"
				onClick={handleTriggerModal}
				className="relative flex items-center justify-between w-full h-10 px-2 transition-colors duration-100 rounded-md bg-gray-50 md:px-4 dark:hover:bg-gray-700 dark:bg-gray-800 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-900 focus:ring-gray-50 dark:focus:ring-offset-gray-100 dark:focus:ring-gray-800"
			>
				<div className="flex items-center gap-2 text-gray-400">
					<MagnifyingGlass className="w-3 h-3" />
					<span className="text-sm">Search</span>
				</div>
				<div className="relative items-center hidden gap-1 ml-4 md:flex">
					<kbd className="relative flex items-center justify-center px-2 text-sm rounded-md bg-neutral-100 needinvoice-border dark:bg-gray-700">
						⌘
					</kbd>
					<kbd className="relative flex items-center justify-center px-2 text-sm rounded-md bg-neutral-100 needinvoice-border dark:bg-gray-700">
						k
					</kbd>
				</div>
			</button>
			{/* <div className="flex flex-col mb-6">
				{props.navigation.map((section) => {
					const isActive = section.slug === activeSection;
					const Icon = config.sections.find((s) => s.slug === section.slug)?.icon;
					return (
						<a
							href={`/docs/${section.section[0].category[0].url}`}
							key={section.slug}
							className={clsx(
								`flex font-semibold text-[14px] items-center py-1.5 doc-sidebar-button`,
								section.slug,
								isActive && "nav-active"
							)}
						>
							<div
								className={clsx(
									`p-1 mr-4 bg-gray-500 border-t rounded-lg border-gray-400/20`
								)}
							>
								<Icon weight="bold" className="w-4 h-4 text-white opacity-80" />
							</div>
							{section.title}
						</a>
					);
				})}
			</div> 

            {activeSectionData?.section.map((category) => {
				return (
					<div className="mb-5" key={category.title}>
						<h2 className="font-semibold no-underline">{category.title}</h2>
						<ul className="mt-3">
							{category.category.map((page) => {
								const active = props.activePath === page.url;
								return (
									<li
										className={clsx(
											"flex border-l border-gray-600",
											active && "border-l-2 border-primary"
										)}
										key={page.title}
									>
										<a
											href={`/docs/${page.url}`}
											className={clsx(
												"font-normal w-full rounded px-3 py-1 hover:text-gray-50 no-underline text-[14px] text-gray-350",
												active && "!text-white !font-medium "
											)}
										>
											{page.title}
										</a>

										{active && <div />}
									</li>
								);
							})}
						</ul>
					</div>
				);
			})} */}
		</nav>
	);
}
