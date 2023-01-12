import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
export const Layout = ({ children }: Props) => {
	return <div className="relative flex h-full w-full flex-col">{children}</div>;
};
