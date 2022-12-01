import { zodResolver } from "@hookform/resolvers/zod";
import { Warning } from "phosphor-react";
import { ComponentProps } from "react";
import {
	useForm,
	UseFormProps,
	FormProvider,
	UseFormReturn,
	FieldValues,
	SubmitHandler,
	useFormContext,
} from "react-hook-form";
import { ZodSchema, TypeOf } from "zod";

interface UseZodFormProps<T extends ZodSchema<any>>
	extends UseFormProps<TypeOf<T>> {
	schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>({
	schema,
	...formConfig
}: UseZodFormProps<T>) => {
	return useForm({
		...formConfig,
		resolver: zodResolver(schema),
	});
};

interface FieldErrorProps {
	name?: string;
	nestedNames?: {
		name: string;
		names: string[];
	};
}

export function FieldError({ name }: FieldErrorProps) {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) return null;

	const error = errors[name];
	if (!error) return null;

	return (
		<div className="flex items-start space-x-1 text-sm font-medium text-radix-red-10">
			<Warning className="flex-shrink-0 w-4 h-4 mt-0.5" weight="duotone" />
			<p>{String(error.message)}</p>
		</div>
	);
}

interface Props<T extends FieldValues = any>
	extends Omit<ComponentProps<"form">, "onSubmit"> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	...props
}: Props<T>) => {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
				<fieldset
					className="flex flex-col w-full h-full space-y-4"
					disabled={form.formState.isSubmitting}
				>
					{children}
				</fieldset>
			</form>
		</FormProvider>
	);
};
