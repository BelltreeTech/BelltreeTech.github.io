import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";

/**
 * Glassmorphism card wrapper.
 * Encapsulates the glass-card base + hover glow + Framer Motion fade-in.
 *
 * @param {string}  className  - Additional Tailwind classes (padding, etc.)
 * @param {boolean} animate    - Enable stagger animation (default: true)
 * @param {React.ReactNode} children
 */
export default function GlassCard({ children, className = "", animate = true, ...rest }) {
  const Comp = animate ? motion.div : "div";
  const motionProps = animate ? { variants: fadeInUp } : {};

  return (
    <Comp
      className={`glass-card ${className}`}
      {...motionProps}
      {...rest}
    >
      {children}
    </Comp>
  );
}
