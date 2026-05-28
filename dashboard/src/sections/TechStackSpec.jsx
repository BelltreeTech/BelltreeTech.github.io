import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills, siteConfig } from "../data/portfolioData";
import RadarChart from "../components/RadarChart";

function AnimatedBar({ name, level, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setAnimatedLevel(level), delay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, level, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-cyber-blue)] transition-colors">
          {name}
        </span>
        <span className="font-mono text-lg font-bold text-[var(--color-cyber-blue)]">
          {animatedLevel}
          <span className="text-xs text-[var(--color-text-muted)]">%</span>
        </span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </div>
  );
}

export default function TechStackSpec() {
  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-[var(--color-text-muted)] tracking-[0.2em] uppercase block mb-3"
          >
            {`${siteConfig.sections.tech.number} // ${siteConfig.sections.tech.slug}`}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]"
          >
            {siteConfig.sections.tech.title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-[var(--color-cyber-blue)] to-transparent mt-4 origin-left"
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="text-sm font-mono text-[var(--color-text-muted)] tracking-wider uppercase mb-6 text-center">
              {siteConfig.sections.tech.labels.radarTitle}
            </h3>
            <RadarChart />
          </motion.div>

          {/* Progress Bars */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass-card p-6 sm:p-8"
          >
            <h3 className="text-sm font-mono text-[var(--color-text-muted)] tracking-wider uppercase mb-8 text-center">
              {siteConfig.sections.tech.labels.barsTitle}
            </h3>
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <AnimatedBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={i * 150}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 pt-4 border-t border-[var(--color-border)] flex flex-wrap gap-4">
              {siteConfig.sections.tech.legend.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
