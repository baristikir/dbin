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

interface UseZodFormProps<S extends ZodSchema>
	extends Exclude<UseFormProps<TypeOf<S>>, "resolver"> {
	schema: S;
}

export const useZodForm = <S extends ZodSchema>({
	schema,
	...props
}: UseZodFormProps<S>) =>
	useForm({
		...props,
		resolver: zodResolver(schema),
	});

interface Props<T extends FieldValues>
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
				{/** <fieldset> to pass forms disabled state to all of its element, to enable css styles */}
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
