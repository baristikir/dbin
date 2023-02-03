import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
export const Title = ({ children }: Props) => {
	return <h1 className="text-3xl font-medium">{children}</h1>;
};
