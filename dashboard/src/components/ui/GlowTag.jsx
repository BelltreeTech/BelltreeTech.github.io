/**
 * Glow-on-hover tag / pill.
 * Replaces verbose Tailwind class strings like:
 *   "px-5 py-2 rounded-full text-xs sm:text-sm font-mono border
 *    border-[var(--color-border)] text-[var(--color-text-secondary)]
 *    hover:border-[var(--color-cyber-blue)] hover:text-[var(--color-cyber-blue)]
 *    transition-all duration-300 cursor-default bg-[#060608]/30"
 *
 * Usage: <GlowTag text="React" />
 *        <GlowTag text="Python" size="sm" />
 */
export default function GlowTag({ text, size = "md", className = "" }) {
  const sizeClasses = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
    lg: "px-5 py-2 text-sm sm:text-base",
  };

  return (
    <span
      className={`
        ${sizeClasses[size] || sizeClasses.md}
        rounded-full font-mono border border-[var(--color-border)]
        text-[var(--color-text-secondary)] bg-[#060608]/30
        hover:border-[var(--color-cyber-blue)] hover:text-[var(--color-cyber-blue)]
        transition-all duration-300 cursor-default
        ${className}
      `}
    >
      {text}
    </span>
  );
}
