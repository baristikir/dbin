import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { FieldError } from "./Form";

interface Props extends ComponentProps<"input"> {
	placeholder: string;
	inputSize?: "base" | "sm";
	withCurrency?: boolean;
	label?: string;
	required?: boolean;
	optional?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
	{
		placeholder,
		inputSize = "base",
		withCurrency = false,
		required = false,
		optional = false,
		type = "text",
		label,
		...props
	},
	ref
) {
	const { formState } = useFormContext();
	const errors = props.name ? !!formState.errors[props.name] : false;

	if (required && optional) optional = false;

	return (
		<label className="w-full">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center">
					<label htmlFor={props.name} className="text-sm font-normal">
						{label}
					</label>
					{required && (
						<div className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-medium text-blue-500 rounded bg-blue-500/5">
							required
						</div>
					)}
					{optional && (
						<div className="inline-flex items-center justify-center px-2 py-1 ml-2 text-xs font-medium text-yellow-500 rounded bg-yellow-500/5">
							optional
						</div>
					)}
				</div>
				<FieldError name={props.name} />
			</div>
			<div className="relative mt-1">
				<input
					className={clsx(
						"w-full rounded-lg text-sm placeholder:text-gray-400/50 placeholder-shown:text-opacity-25 border text-gray-800 transition duration-300 focus:ring appearance-none dark:text-gray-200 focus:ring-radix-blue-10/20 focus:border-radix-blue-10 dark:focus:ring-radix-blue-8/20 dark:focus:border-radix-blue-8 focus:bg-gray-50 dark:focus:bg-gray-900 disabled:opacity-60 disabled:bg-gray-500/20",
						{
							"pl-7 pr-12": withCurrency,
							"px-4 py-3": inputSize === "base",
							"px-2 py-2": inputSize === "sm",
						},
						{
							"border-radix-red-8 dark:border-radix-red-11/80 bg-radix-red-8/10 dark:bg-radix-red-12/20":
								errors === true,
							"border-gray-500/40 bg-white dark:bg-gray-900": errors === false,
						}
					)}
					type={type}
					ref={ref}
					placeholder={placeholder}
					{...props}
				/>
			</div>
		</label>
	);
});
