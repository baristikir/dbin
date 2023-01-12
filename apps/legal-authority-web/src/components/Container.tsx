import { ReactNode } from "react"

interface Props {
    children: ReactNode
}
export const Container = ({children}:Props) => {
    return (
        <div className="w-full m-0 md:ml-[30%] md:w-[70%]">
            {children}
        </div>
    )
}