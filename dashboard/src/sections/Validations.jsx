import { motion } from "framer-motion";
import { Trophy, Newspaper, Calendar, ExternalLink } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import { staggerContainer, fadeInUp } from "../utils/animations";
import { validations } from "../data/portfolioData";

const typeConfig = {
  Award: {
    icon: Trophy,
    color: "var(--color-neon-emerald)",
    bgColor: "rgba(0,255,170,0.08)",
    borderColor: "rgba(0,255,170,0.15)",
  },
  Press: {
    icon: Newspaper,
    color: "var(--color-cyber-blue)",
    bgColor: "rgba(0,229,255,0.08)",
    borderColor: "rgba(0,229,255,0.15)",
  },
};

export default function Validations() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 dot-matrix opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader sectionKey="validations" />

        {/* Validation Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {validations.map((item) => {
            const config = typeConfig[item.type] || typeConfig.Award;
            const Icon = config.icon;
            return (
              <motion.article
                key={item.id}
                variants={fadeInUp}
                className="glass-card p-6 sm:p-7 relative overflow-hidden group hover:border-[var(--color-cyber-blue)] transition-all duration-500"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(to right, ${config.color}, transparent)`,
                  }}
                />

                {/* Type Badge & Date */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border"
                      style={{
                        background: config.bgColor,
                        borderColor: config.borderColor,
                      }}
                    >
                      <Icon size={20} style={{ color: config.color }} />
                    </div>
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border"
                      style={{
                        color: config.color,
                        borderColor: config.borderColor,
                        background: config.bgColor,
                      }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[var(--color-text-muted)]">
                    <Calendar size={12} />
                    <span className="text-xs font-mono tracking-wider">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Issuer */}
                {item.issuer && (
                  <p
                    className="text-xs font-mono tracking-wider mb-4"
                    style={{ color: config.color }}
                  >
                    {item.issuer}
                  </p>
                )}

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Link */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg text-xs font-mono border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-cyber-blue)] hover:border-[var(--color-cyber-blue)] hover:bg-[rgba(0,229,255,0.05)] hover:shadow-[0_0_12px_rgba(0,229,255,0.15)] transition-all duration-300"
                  >
                    <ExternalLink size={13} />
                    View Details
                  </a>
                )}

                {/* Decorative glow */}
                <div
                  className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
                  style={{ background: config.color }}
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
