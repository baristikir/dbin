import { useFormContext } from "react-hook-form";
import { LoadingSpinner } from "./LoadingSpinner";
import { Button, ButtonProps } from "./Button";

export function SubmitButton({
	isSubmitting,
	children,
	...props
}: ButtonProps & { isSubmitting?: boolean }) {
	const { formState } = useFormContext();
	return (
		<Button
			type="submit"
			disabled={formState.isSubmitting || isSubmitting}
			{...props}
		>
			<>{children}</>
			{(formState.isSubmitting || isSubmitting) && (
				<div className="ml-2">
					<LoadingSpinner size="xxs" />
				</div>
			)}
		</Button>
	);
}
