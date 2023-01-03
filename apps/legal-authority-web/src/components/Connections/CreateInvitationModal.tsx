import clsx from "clsx";
import { useRef, useState } from "react";
import { Check, Clipboard as ClipboardIcon } from "phosphor-react";
import { Modal } from "@dbin/ui";

interface Props {
	invitationUrl: string;
	isOpen: boolean;
	setIsOpen(value: boolean): void;
}
export const CreateInvitationModal = ({
	isOpen,
	invitationUrl,
	setIsOpen,
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputCopied, setInputCopied] = useState(false);

	const handleCopyToClipboard = async () => {
		if (!invitationUrl || invitationUrl.length === 0) return;
		if ("clipboard" in navigator) {
			setInputCopied(true);
			return await navigator.clipboard.writeText(invitationUrl);
		} else {
			setInputCopied(true);
			return document.execCommand("copy", true, invitationUrl);
		}
	};

	return (
		<Modal
			onExit={() => setInputCopied(false)}
			isOpen={isOpen}
			title="Invitation Details"
			setOpen={setIsOpen}
		>
			<div className="w-full p-5">
				<div className="primary-border w-full rounded-lg bg-black px-3 py-3 text-white">
					<div className="flex w-full items-center justify-between">
						<p className="text-sm font-medium">Invitation URL</p>
						{inputCopied && (
							<div className="text-radix-blue-8 flex items-center gap-2">
								<p className="text-sm">URL Copied to Clipboard</p>
								<Check weight="bold" className="h-4 w-4" />
							</div>
						)}
					</div>
					<div className="relative mt-1">
						<input
							type={"text"}
							ref={inputRef}
							value={invitationUrl}
							contentEditable={false}
							onClick={handleCopyToClipboard}
							className={clsx(
								"focus:ring-radix-blue-8/20 focus:border-radix-blue-8 relative z-40 w-full appearance-none rounded-lg border border-gray-500/40 bg-gray-800 text-sm text-gray-200 outline-none transition duration-300 placeholder:text-gray-400/50 placeholder-shown:text-opacity-25 focus:bg-gray-900 focus:ring  disabled:bg-gray-500/20 disabled:opacity-60",
								"px-4 py-3"
							)}
						/>

						<button
							type="button"
							onClick={handleCopyToClipboard}
							className="absolute top-2 right-2 z-50 flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 outline-none transition-opacity duration-150 hover:bg-gray-600"
						>
							<ClipboardIcon className="h-5 w-5" weight="regular" />
						</button>
					</div>
				</div>

				<div className="mt-4 px-4">
					<ul className="flex list-disc flex-col gap-2">
						<li className="text-sm">
							Die Einladungs URL wird von anderen Agents benötigt, um eine Verbindung
							mit dem <b>Legal Authority Agent</b> herstellen zukönnen.
						</li>
						<li className="text-sm">
							Nur über Verbindungen können{" "}
							<code
								className="text-radix-red-10 rounded-md bg-gray-100 px-2 py-1 font-medium"
								style={{
									fontFamily: "DejaVu Sans Mono, MonoLisa, Consolas, monospace",
								}}
							>
								Credentials
							</code>{" "}
							übertragen, akzeptiert oder vorgestellt werden.
						</li>
					</ul>
				</div>
			</div>
		</Modal>
	);
};
