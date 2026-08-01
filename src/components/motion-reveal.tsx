import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Props for a restrained, one-time viewport reveal.
 */
export type MotionRevealProps = {
	readonly children: ReactNode;
	readonly className?: string;
	readonly delay?: number;
};

/**
 * Reveal content once when it enters the viewport while honoring reduced motion.
 *
 * @param props - Content, class name, and optional delay.
 * @returns A motion-enabled wrapper.
 */
export function MotionReveal({
	children,
	className,
	delay = 0,
}: MotionRevealProps) {
	const reduceMotion = useReducedMotion();

	return (
		<m.div
			className={className}
			initial={reduceMotion ? false : { opacity: 0, y: 28 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.2 }}
			transition={{
				duration: reduceMotion ? 0 : 0.65,
				delay: reduceMotion ? 0 : delay,
				ease: [0.16, 1, 0.3, 1],
			}}
		>
			{children}
		</m.div>
	);
}
