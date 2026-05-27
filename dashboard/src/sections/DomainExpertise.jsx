import { motion } from "framer-motion";
import { Brain, Scale, ChevronRight } from "lucide-react";
import { domains } from "../data/portfolioData";

const iconMap = { brain: Brain, scale: Scale };

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.2, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function DomainExpertise() {
  const pillars = [domains.psychology, domains.governance];

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 dot-matrix opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase block mb-3"
          >
            04 // Domain Expertise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
          >
            Two Pillars of Knowledge
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-cyber-blue)] to-transparent mt-4 origin-left"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[var(--color-text-secondary)] mt-4 max-w-2xl text-sm leading-relaxed"
          >
            単なるコーダーではなく「思想家」として、技術と人間社会の接点を設計する。
          </motion.p>
        </div>

        {/* Two Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon] || Brain;
            const isFirst = i === 0;
            return (
              <motion.div
                key={pillar.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card p-6 sm:p-8 relative overflow-hidden"
              >
                {/* Gradient Accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${
                    isFirst
                      ? "from-[var(--color-cyber-blue)] to-[var(--color-neon-emerald)]"
                      : "from-[var(--color-neon-purple)] to-[var(--color-cyber-blue)]"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                    isFirst
                      ? "bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)]"
                      : "bg-[rgba(168,85,247,0.08)] border border-[rgba(168,85,247,0.15)]"
                  }`}
                >
                  <Icon
                    size={22}
                    className={
                      isFirst ? "text-[var(--color-cyber-blue)]" : "text-[var(--color-neon-purple)]"
                    }
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                  {pillar.title}
                </h3>
                <p
                  className={`text-xs font-mono tracking-wider mb-4 ${
                    isFirst ? "text-[var(--color-cyber-blue)]" : "text-[var(--color-neon-purple)]"
                  }`}
                >
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {pillar.description}
                </p>

                {/* Key Points */}
                <ul className="space-y-3">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <ChevronRight
                        size={14}
                        className={`mt-0.5 flex-shrink-0 ${
                          isFirst
                            ? "text-[var(--color-cyber-blue)]"
                            : "text-[var(--color-neon-purple)]"
                        }`}
                      />
                      <span className="text-sm text-[var(--color-text-secondary)]">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative Corner */}
                <div
                  className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full opacity-5 ${
                    isFirst
                      ? "bg-[var(--color-cyber-blue)]"
                      : "bg-[var(--color-neon-purple)]"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Intersection Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="glass-card inline-flex items-center gap-4 px-6 py-4 sm:px-8 sm:py-5">
            <Brain size={20} className="text-[var(--color-cyber-blue)] flex-shrink-0" />
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <span className="text-sm sm:text-base font-mono text-[var(--color-text-secondary)]">
              Psychology × AI × Law = <span className="text-[var(--color-neon-emerald)] font-bold">Unique Position</span>
            </span>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <Scale size={20} className="text-[var(--color-neon-purple)] flex-shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
