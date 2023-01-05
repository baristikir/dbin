import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { ComponentProps, forwardRef } from "react";
import { FormField, useFormField, UseFormFieldProps } from "./FormField";

interface Props extends UseFormFieldProps, Omit<InputElementProps, "hasError"> {
	name: string;
	placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { formFieldProps, childProps } = useFormField(props);
	const { formState } = useFormContext();
	const errors = props.name ? !!formState.errors[props.name] : false;

	return (
		<FormField {...formFieldProps}>
			<InputElement {...childProps} ref={ref} hasError={errors} />
		</FormField>
	);
});

interface InputElementProps extends ComponentProps<"input"> {
	name: string;
	hasError: boolean;
}

const InputElement = forwardRef<HTMLInputElement, InputElementProps>(
	({ id, type = "text", hasError, ...props }, ref) => {
		return (
			<input
				ref={ref}
				id={id}
				type={type}
				className={clsx(
					"focus:ring-radix-blue-10/20 focus:border-radix-blue-10 dark:focus:ring-radix-blue-8/20 dark:focus:border-radix-blue-8 w-full appearance-none rounded-lg border px-4 py-3 text-sm text-gray-800 transition duration-300 placeholder:text-gray-400/50 placeholder-shown:text-opacity-25 focus:bg-gray-50 focus:ring disabled:bg-gray-500/20 disabled:opacity-60 dark:text-gray-200 dark:focus:bg-gray-900",
					{
						"border-radix-red-8 dark:border-radix-red-11/80 bg-radix-red-8/10 dark:bg-radix-red-12/20":
							hasError,
						"border-gray-500/20 bg-white dark:bg-gray-800": !hasError,
					}
				)}
				{...props}
			/>
		);
	}
);
