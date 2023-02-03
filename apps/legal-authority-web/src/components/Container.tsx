import { ReactNode } from "react";

interface Props {
	children: ReactNode;
}
export const Container = ({ children }: Props) => {
	return <div className="m-0 w-full md:ml-[30%] md:w-[70%]">{children}</div>;
};
