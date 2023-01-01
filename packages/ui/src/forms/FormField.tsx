import { Warning } from "phosphor-react";
import { PropsWithChildren } from "react";
import { FieldError, useFormContext } from "react-hook-form";

export interface UseFormFieldProps extends PropsWithChildren {
	name: string;
	label: string;
}
export const useFormField = <P extends UseFormFieldProps>(props: P) => {
	const { label, name, ...restOfProps } = props;
	const id = name;

	return {
		formFieldProps: { id, name, label },
		childProps: { ...restOfProps, id, name },
	};
};

interface Props extends UseFormFieldProps {
	id: string;
}
export const FormField = ({ children, name, id, label }: Props) => {
	const formContext = useFormContext();
	const fieldState = formContext.getFieldState(name);

	return (
		<label className="w-full space-y-1">
			<div className="flex items-center justify-between w-full">
				<label htmlFor={name} className="text-sm font-normal">
					{label}
				</label>

				{fieldState.error && <FieldError error={fieldState.error} />}
			</div>

			{children}
		</label>
	);
};

interface FieldErrorProps {
	error: FieldError;
}

function FieldError({ error }: FieldErrorProps) {
	return (
		<div className="flex items-start space-x-1 text-sm font-medium text-radix-red-10">
			<Warning className="flex-shrink-0 w-4 h-4 mt-0.5" weight="duotone" />
			<p>{String(error.message)}</p>
		</div>
	);
}
