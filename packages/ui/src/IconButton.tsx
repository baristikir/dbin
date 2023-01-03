import clsx from "clsx";
import { ButtonOrLink, ButtonOrLinkProps } from "./ButtonOrLink";
import { Tooltip } from "./Tooltip";

export interface IconButtonProps extends ButtonOrLinkProps {
	icon: JSX.Element;
	size?: "base" | "sm" | "lg";
	variant?: "default" | "border" | "system-contrast" | "danger";
	tooltip?: boolean;
	spotlight?: { id: string; label?: string };
	withDropdown?: boolean;
	onClick?(): void;
}
export function IconButton({
	children,
	icon,
	size = "base",
	variant = "system-contrast",
	tooltip,
	spotlight,
	withDropdown,
	...props
}: IconButtonProps) {
	const button = (
		<ButtonOrLink
			className={clsx(
				"z-40 flex items-center justify-center rounded-lg border disabled:opacity-30",
				{
					"p-1": size === "sm",
					"p-2": size === "base",
					"p-3": size === "lg",
					"border-transparent bg-gray-200/30 hover:bg-gray-300/20 dark:bg-gray-700 dark:hover:bg-gray-600":
						variant === "default",
					"border-gray-300/20 dark:border-gray-500/40": variant === "border",
					"border border-gray-200 bg-gray-900 text-gray-50 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-800 dark:bg-neutral-100 dark:text-gray-900 dark:hover:border-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-700 dark:focus:ring-offset-white":
						variant === "system-contrast",
					"text-radix-red-5 dark:text-radix-red-10 border-transparent bg-red-600 dark:bg-red-500/20 dark:hover:bg-red-500/40":
						variant === "danger",
				}
			)}
			{...props}
		>
			{icon}
			<span className="sr-only">{children}</span>
		</ButtonOrLink>
	);

	if (tooltip) {
		return (
			<Tooltip tooltip={children}>
				<div>{button}</div>
			</Tooltip>
		);
	}

	return button;
}
