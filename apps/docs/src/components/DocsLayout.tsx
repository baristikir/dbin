"use client";

import { ReactNode, useState } from "react";
import { Button } from "@dbin/ui";
import { push as Menu } from "react-burger-menu";
import { List, X } from "phosphor-react";
import DocsSidebar from "./DocsSidebar";

interface Props {
	children: ReactNode;
}
export default function DocsLayout({ children }: Props) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div className="flex flex-col items-start w-full sm:flex-row">
			<Menu
				onClose={() => setMenuOpen(false)}
				customBurgerIcon={false}
				isOpen={menuOpen}
				pageWrapId="page-container"
				className="shadow-2xl shadow-black"
			>
				<div className="visible h-screen pb-20 overflow-x-hidden bg-gray-900 custom-scroll doc-sidebar-scroll pt-7 px-7 sm:invisible">
					<Button
						onClick={() => setMenuOpen(!menuOpen)}
						className="!px-1 -ml-0.5 mb-3 !border-none"
					>
						<X weight="bold" className="w-6 h-6" />
					</Button>
					<DocsSidebar />
				</div>
			</Menu>

			<aside className="sticky hidden px-5 mt-32 mb-20 ml-2 mr-0 lg:mr-4 top-32 sm:inline">
				<DocsSidebar />
			</aside>

			<div className="flex flex-col w-full sm:flex-row" id="page-container">
				<div className="h-12 px-5 flex w-full border-t border-gray-600 border-b mt-[65px] sm:hidden items-center ">
					<div className="flex sm:hidden">
						<Button
							onClick={() => setMenuOpen(!menuOpen)}
							className="!px-2 ml-1 !border-none"
						>
							<List weight="bold" className="w-6 h-6" />
						</Button>
					</div>
					{/* {props.doc?.url.split("/").map((item, index) => {
						if (index === 2) return null;
						return (
							<div key={index} className="flex flex-row items-center ml-2">
								<a className="px-1 text-sm">{toTitleCase(item)}</a>
								{index < 1 && <CaretRight className="w-4 h-4 ml-1 -mr-2" />}
							</div>
						);
					})} */}
				</div>
				<div className="w-full p-8 pt-32 overflow-x-hidden bg-white border-l dark:bg-gray-800 dark:border-gray-500/40 border-gray-300/20 sm:mx-auto">
					{children}
				</div>
				{/* <div className="w-0 sm:w-32 lg:w-64" /> */}
			</div>
		</div>
	);
}
