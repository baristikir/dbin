"use client";
import clsx from "clsx";
import { Command } from "cmdk";
import { atom, useAtom } from "jotai";
import { MagnifyingGlass } from "phosphor-react";
import { ReactNode, useEffect, useRef } from "react";
import "../../../styles/cmdk.scss";

const spotlightAtom = atom<boolean>(false);
export const getSpotlightState = atom((get) => get(spotlightAtom));
export const handleSpotlightStateChange = atom(
	null,
	(get, set, update: boolean) => {
		set(spotlightAtom, update);
	}
);

interface Props {}
export function Spotlight({}: Props) {
	const [isOpen, setOpen] = useAtom(spotlightAtom);

	useEffect(() => {
		const listener = (event: KeyboardEvent) => {
			if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
				setOpen(!isOpen);
			}
		};
		document.addEventListener("keydown", listener);

		return () => document.removeEventListener("keydown", listener);
	}, [isOpen]);

	return (
		<Command.Dialog
			open={isOpen}
			onOpenChange={setOpen}
			label="Search Command Menu"
			className="fixed w-full h-full inset-0 overflow-hidden z-[1000]"
		>
			<div className="md:w-3/4 relative mx-auto w-full h-1/2 max-w-2xl z-[60] min-w-[300px] my-8 text-left align-middle transform">
				<div className="relative overflow-y-auto text-gray-800 bg-white shadow-xl h-96 dark:text-white dark:bg-gray-800 primary-border rounded-xl">
					<div className="flex items-center px-4 py-1 border-b dark:border-gray-500/40 border-gray-300/20">
						<span className="sr-only">Search</span>
						<MagnifyingGlass className="w-5 h-4" />
						<Command.Input
							placeholder="Search.."
							className="w-full text-xl bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-gray-400 outline-0"
							autoComplete="off"
							autoFocus
						/>
					</div>
					<Command.List className="overflow-x-hidden">
						<Command.Empty>No results found.</Command.Empty>
						<Command.Group>
							<CustomCommandItem>a</CustomCommandItem>
							<CustomCommandItem>b</CustomCommandItem>
							<Command.Separator />
							<CustomCommandItem>c</CustomCommandItem>
						</Command.Group>
					</Command.List>
				</div>
			</div>
		</Command.Dialog>
	);
}

interface ItemProps {
	children: ReactNode;
}
const CustomCommandItem = ({ children }: ItemProps) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<Command.Item
			ref={ref}
			className={clsx(
				"relative flex cursor-pointer items-center justify-start",
				"w-full px-4 py-3 border-b border-gray-300/20 dark:border-gray-500/40",
				"transition duration-100"
			)}
		>
			{children}
		</Command.Item>
	);
};
