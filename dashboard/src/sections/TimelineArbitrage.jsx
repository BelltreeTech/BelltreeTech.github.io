import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { timeline } from "../data/portfolioData";

const nodeVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function TimelineArbitrage() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase block mb-3"
          >
            03 // Timeline of Arbitrage
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
          >
            Leverage Accumulation
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-cyber-blue)] to-transparent mt-4 origin-left"
          />
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-10 sm:pl-14">
          {/* Timeline Line */}
          <div className="absolute left-[15px] sm:left-[23px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[var(--color-cyber-blue)] via-[var(--color-cyber-blue)]/30 to-transparent" />

          <div className="space-y-10">
            {timeline.map((node, i) => (
              <motion.div
                key={`${node.year}-${node.title}`}
                custom={i}
                variants={nodeVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className={`absolute -left-10 sm:-left-14 top-1 w-[16px] h-[16px] sm:w-[18px] sm:h-[18px] rounded-full border-[3px] z-10 ${
                    node.active
                      ? "border-[var(--color-cyber-blue)] bg-[var(--color-cyber-blue)] shadow-[0_0_12px_rgba(0,229,255,0.5)]"
                      : "border-[var(--color-border-bright)] bg-[var(--color-bg-primary)]"
                  }`}
                />

                {/* Card */}
                <div className="glass-card p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-xs font-mono text-[var(--color-cyber-blue)] tracking-wider">
                        {node.year}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mt-1">
                        {node.title}
                      </h3>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-0.5">
                        {node.subtitle}
                      </p>
                    </div>
                    {node.active && (
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded-full border border-[var(--color-neon-emerald)]/30 text-[var(--color-neon-emerald)] bg-[rgba(0,255,170,0.05)]">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Acquired Capital */}
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Sparkles size={12} className="text-[var(--color-neon-emerald)]" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-neon-emerald)]">
                        Acquired Capital
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {node.acquiredCapital.map((capital) => (
                        <li
                          key={capital}
                          className="text-sm text-[var(--color-text-secondary)] flex items-start gap-2"
                        >
                          <span className="text-[var(--color-cyber-blue)] mt-1.5 w-1 h-1 rounded-full bg-[var(--color-cyber-blue)] flex-shrink-0" />
                          {capital}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
