import { ReactNode } from "react";

export const GridTitle = ({ children }: { children: ReactNode }) => {
	return (
		<div className="col-span-1">
			<p>{children}</p>
		</div>
	);
};

export const GridValue = ({ children }: { children: ReactNode }) => {
	return (
		<div className="col-span-2">
			<p>{children}</p>
		</div>
	);
};
