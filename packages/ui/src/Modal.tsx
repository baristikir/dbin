import clsx from "clsx";
import { useCallback } from "react";
import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";
import { IconButton } from "./IconButton";

export interface BaseModalProps {
	isOpen: boolean;
	setOpen(value: boolean): void;
	onExit?(): void;
}
interface Props extends BaseModalProps {
	title: string;
	children: React.ReactNode;
	size?: "base" | "xl";
}
export function Modal({
	title,
	children,
	isOpen,
	setOpen,
	onExit,
	size = "base",
}: Props) {
	const closeModal = useCallback(() => setOpen(false), [isOpen]);

	return (
		<AnimatePresence key={`modal.${title}`} onExitComplete={onExit}>
			{isOpen && (
				<Dialog
					static
					as={motion.div}
					open={isOpen}
					onClose={closeModal}
					className="fixed inset-0 z-50 overflow-y-auto"
				>
					<div className="relative flex h-screen w-screen items-end justify-center text-center md:items-center">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1, transition: { ease: "easeOut", duration: 0.1 } }}
							exit={{ opacity: 0, transition: { ease: "easeIn", duration: 0.1 } }}
							style={{ zIndex: 99 }}
						>
							<Dialog.Overlay className="fixed inset-0 bg-gray-100/80 backdrop-blur-sm dark:bg-black/50" />
						</motion.div>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{
								opacity: 1,
								scale: 1,
								transition: { ease: "easeIn", duration: 0.2 },
							}}
							exit={{
								opacity: 0,
								scale: 0.95,
								transition: { ease: "easeOut", duration: 0.1 },
							}}
							style={{ zIndex: 100, paddingBottom: "env(safe-area-inset-bottom)" }}
							className={clsx(
								"primary-border relative w-full transform rounded-t-2xl bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 md:rounded-2xl md:align-middle",
								{
									"max-w-xl": size === "base",
									"max-w-2xl": size === "xl",
								}
							)}
						>
							<>
								<div className="flex w-full items-center justify-between border-b border-gray-300/20 px-5 py-3 dark:border-gray-500/40">
									<Dialog.Title
										as="h5"
										className="text-base font-medium leading-tight text-gray-900 dark:text-white"
									>
										{title}
									</Dialog.Title>
									<IconButton
										tooltip
										icon={<X className="h-4 w-4" />}
										type="button"
										variant="default"
										size="sm"
										onClick={closeModal}
									>
										Close
									</IconButton>
								</div>
								{children}
							</>
						</motion.div>
					</div>
				</Dialog>
			)}
		</AnimatePresence>
	);
}
