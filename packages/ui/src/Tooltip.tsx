import Tippy from "@tippyjs/react";
import { motion, useSpring } from "framer-motion";
import { ReactElement } from "react";
import { ReactNode } from "react";

interface Props {
	tooltip: ReactNode;
	children: ReactElement;
}

export function Tooltip({ tooltip, children }: Props) {
	const springConfig = { damping: 50, stiffness: 500 };
	const initialScale = 0.95;
	const opacity = useSpring(0, springConfig);
	const scale = useSpring(initialScale, springConfig);

	return (
		<Tippy
			render={(attrs) => (
				<motion.div
					className="primary-border bg-radix-gray-1 rounded-lg p-2 text-sm font-medium shadow-lg dark:bg-gray-700"
					style={{ scale, opacity }}
					tabIndex={-1}
					{...attrs}
				>
					{tooltip}
				</motion.div>
			)}
			animation={true}
			onMount={() => {
				scale.set(1);
				opacity.set(1);
			}}
			onHide={({ unmount }) => {
				const cleanup = scale.onChange((value) => {
					if (value <= initialScale) {
						cleanup();
						unmount();
					}
				});

				scale.set(initialScale);
				opacity.set(0);
			}}
		>
			{children}
		</Tippy>
	);
}
