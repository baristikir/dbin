import clsx from "clsx";

interface Props {
	label: string;
	children: React.ReactNode;
}
export const GridBaseColumn = ({ label, children }: Props) => {
	return (
		<div className="col-span-1 flex w-full flex-col">
			<div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>

			<div className="relative mt-1">
				<div className={clsx("font-medium")}>{children}</div>
			</div>
		</div>
	);
};
