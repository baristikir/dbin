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
	size?: "xxs" | "xs" | "base" | "xl";
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
				"flex items-center z-20 whitespace-nowrap font-medium transition-colors duration-100 justify-center rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80",
				{
					"px-2 py-1 text-xs": size === "xxs",
					"px-4 py-1 xl:py-2 text-sm": size === "xs",
					"px-6 py-2 text-base": size === "base",
					"px-6 py-2.5 text-base": size === "xl",
				},
				{ "w-full": withFullWidth },
				{
					"bg-radix-indigo-11 text-white": variant === "primary",
					"bg-white border-dashed dark:bg-gray-700 needinvoice-border hover:bg-gray-100 dark:hover:bg-gray-800/50":
						variant === "dashed",
					"bg-gray-50 dark:bg-gray-800 hover:bg-neutral-100 dark:hover:bg-gray-700 border border-transparent focus:ring-radix-blue-10/20 focus:border-radix-blue-10 dark:focus:ring-radix-blue-8/20 dark:focus:border-radix-blue-8 focus:border-solid focus:ring focus:ring-offset-0":
						variant === "transparent-border",
					"bg-white text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:focus:ring-gray-700 dark:focus:ring-offset-white focus:ring-gray-200/50 needinvoice-border hover:bg-gray-50/50":
						variant === "secondary",
					"bg-gray-900 text-gray-50 dark:bg-neutral-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:text-gray-900 dark:focus:ring-gray-700 dark:focus:ring-offset-white focus:ring-gray-800 border border-gray-200 dark:hover:border-gray-100 hover:bg-gray-50 hover:text-gray-900":
						variant === "system-contrast",
					"bg-radix-red-9 dark:bg-radix-red-11 text-white focus:ring-red-500 dark:focus:ring-red-300":
						variant === "danger",
					"bg-[#46954a] text-white focus:ring-green-500 dark:focus:ring-green-300":
						variant === "agree",
					"bg-transparent hover:bg-gray-50 dark:hover:bg-gray-700/60 focus:outline-none focus:ring-offset-radix-blue-10":
						variant === "transparent",
					"bg-transparent hover:bg-radix-red-4 dark:hover:bg-gray-700/60 focus:outline-none focus:ring-radix-red-7 focus:ring-offset-radix-red-10 text-radix-red-9":
						variant === "transparent-danger",
				},
				{ underline }
			)}
			{...props}
		/>
	);
}
