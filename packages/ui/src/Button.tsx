import clsx from "clsx";
import { ButtonOrLink, ButtonOrLinkProps } from "./ButtonOrLink";

export interface ButtonProps extends ButtonOrLinkProps {
	variant?:
		| "primary"
		| "secondary"
		| "danger"
		| "agree"
		| "transparent"
		| "transparent-border"
		| "transparent-danger"
		| "system-contrast"
		| "dashed";
	size?: "xs" | "sm" | "base" | "xl";
	underline?: boolean;
	withFullWidth?: boolean;
}

export function Button({
	underline = false,
	type = "button",
	variant = "primary",
	size = "base",
	withFullWidth = false,
	...props
}: ButtonProps) {
	return (
		<ButtonOrLink
			type={type}
			className={clsx(
				"z-20 flex items-center justify-center whitespace-nowrap rounded-lg border font-medium transition-colors duration-100 hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-white disabled:pointer-events-none disabled:opacity-60 dark:focus:ring-offset-black",
				{
					"px-3 py-1 text-xs": size === "xs",
					"px-4 py-2 text-sm": size === "sm",
					"px-5 py-2 text-base": size === "base",
					"px-6 py-2.5 text-base": size === "xl",
				},
				{ "w-full": withFullWidth },
				{
					"bg-radix-indigo-11 border-transparent text-white": variant === "primary",
					"primary-border border-dashed bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-800/50":
						variant === "dashed",
					"focus:ring-radix-blue-10/20 focus:border-radix-blue-10 dark:focus:ring-radix-blue-8/20 dark:focus:border-radix-blue-8 border-transparent bg-gray-50 hover:bg-neutral-100 focus:border-solid focus:ring focus:ring-offset-0 dark:bg-gray-800 dark:hover:bg-gray-700":
						variant === "transparent-border",
					"primary-border bg-gray-50 text-gray-900 hover:bg-gray-50/50 focus:ring-gray-200/50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:focus:ring-offset-white":
						variant === "secondary",
					"border-gray-200 bg-gray-900 text-gray-50 hover:bg-gray-50 hover:text-gray-900 focus:ring-gray-800 dark:bg-neutral-100 dark:text-gray-900 dark:hover:border-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:ring-gray-700 dark:focus:ring-offset-white":
						variant === "system-contrast",
					"bg-radix-red-9 dark:bg-radix-red-11 dark:focus:ring-red-30 border-transparent text-white focus:ring-red-500":
						variant === "danger",
					"bg-[#46954a] text-white focus:ring-green-500 dark:focus:ring-green-300":
						variant === "agree",
					"focus:ring-offset-radix-blue-10 border-transparent bg-transparent hover:bg-gray-50 focus:outline-none dark:hover:bg-gray-700/60":
						variant === "transparent",
					"hover:bg-radix-red-4 focus:ring-radix-red-7 focus:ring-offset-radix-red-10 text-radix-red-9 border-transparent bg-transparent focus:outline-none dark:hover:bg-gray-700/60":
						variant === "transparent-danger",
				},
				{ underline }
			)}
			{...props}
		/>
	);
}
