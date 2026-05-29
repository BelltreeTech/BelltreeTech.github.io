import { motion } from "framer-motion";
import { siteConfig } from "../../data/portfolioData";

/**
 * Consistent section header: number // slug + title + gradient underline.
 * Eliminates the ~20-line header pattern duplicated across 6 sections.
 *
 * Usage: <SectionHeader sectionKey="projects" />
 *        <SectionHeader sectionKey="domain" description />
 */
export default function SectionHeader({ sectionKey, children }) {
  const sec = siteConfig.sections[sectionKey];
  if (!sec) return null;

  return (
    <div className="mb-16">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase block mb-3"
      >
        {`${sec.number} // ${sec.slug}`}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)]"
      >
        {sec.title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-cyber-blue)] to-transparent mt-4 origin-left"
      />
      {sec.description && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-[var(--color-text-secondary)] mt-4 max-w-2xl text-sm leading-relaxed"
        >
          {sec.description}
        </motion.p>
      )}
      {children}
    </div>
  );
}
