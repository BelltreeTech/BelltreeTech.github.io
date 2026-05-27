import { motion } from "framer-motion";
import { Terminal, ArrowRight } from "lucide-react";
import TypeWriter from "../components/TypeWriter";
import { profile } from "../data/portfolioData";

export default function ExecutiveSummary() {
  return (
    <section className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-center items-center px-6 py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,255,170,0.05)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border-bright)] mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-neon-emerald)] animate-pulse" />
          <span className="text-xs font-mono text-[var(--color-text-secondary)] tracking-wider uppercase">
            System Online — Portfolio v2.0
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-[var(--color-text-primary)]">Hybrid</span>
          <br />
          <span className="glow-text text-[var(--color-cyber-blue)]">Architect</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg text-[var(--color-text-secondary)] font-light mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          AI Implementation × Law & Psychology Domain
        </motion.p>

        {/* Terminal Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass-card p-6 sm:p-8 max-w-3xl mx-auto text-left"
        >
          <div className="flex items-center gap-2 mb-4">
            <Terminal size={14} className="text-[var(--color-cyber-blue)]" />
            <span className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider">
              value_proposition.sh
            </span>
            <div className="flex gap-1.5 ml-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>
          <div className="font-mono text-sm sm:text-base leading-relaxed">
            <span className="text-[var(--color-neon-emerald)]">$ </span>
            <TypeWriter
              text={profile.statement}
              speed={35}
              delay={1200}
              className="text-[var(--color-text-primary)]"
            />
          </div>
        </motion.div>

        {/* Info Chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {["SFC '26", "東大松尾研", "AI Engineer", "法 × 心理 × AI"].map((label) => (
            <span
              key={label}
              className="px-4 py-1.5 rounded-full text-xs font-mono border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyber-blue)] hover:text-[var(--color-cyber-blue)] transition-all duration-300 cursor-default"
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)]"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">Navigate</span>
          <ArrowRight size={14} className="animate-bounce rotate-90" />
        </motion.div>
      </div>
    </section>
  );
}
