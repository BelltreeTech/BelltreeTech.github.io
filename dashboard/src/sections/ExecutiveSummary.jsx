import { motion } from "framer-motion";
import { Terminal, ArrowRight, MapPin, BookOpen } from "lucide-react";
import TypeWriter from "../components/TypeWriter";
import GlowTag from "../components/ui/GlowTag";
import { GithubIcon, LinkedinIcon, XIcon } from "../components/icons/BrandIcons";
import { profile, siteConfig } from "../data/portfolioData";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  qiita: BookOpen,
};

const { hero } = siteConfig;

export default function ExecutiveSummary() {
  return (
    <section className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-center items-center px-4 sm:px-6 py-24 overflow-x-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(0,255,170,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

        {/* === TOP SECTION === */}
        <div className="flex flex-col items-center gap-6 mb-12 w-full text-center">
          {/* Name & Handle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col items-center gap-1"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
              {profile.name}
            </h2>
            <span className="text-sm sm:text-base font-mono text-[var(--color-cyber-blue)] tracking-wider opacity-80">
              @{profile.handle}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1]"
          >
            <span className="text-[var(--color-text-primary)]">{hero.titleLine1}</span>
            <br />
            <span className="glow-text text-[var(--color-cyber-blue)]">{hero.titleLine2}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base sm:text-lg text-[var(--color-text-secondary)] font-light max-w-2xl px-4 leading-relaxed"
          >
            {hero.subtitle}
          </motion.p>

          {/* Affiliation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md"
          >
            <MapPin size={16} className="text-[var(--color-neon-purple)]" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              {profile.affiliation}
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-4 mt-2"
          >
            {Object.entries(profile.socials).map(([platform, url]) => {
              const Icon = socialIcons[platform];
              if (!Icon) return null;
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-300 hover:border-[var(--color-cyber-blue)] hover:bg-[rgba(0,229,255,0.05)] hover:-translate-y-1 shadow-lg"
                >
                  <div className="absolute inset-0 rounded-xl bg-[var(--color-cyber-blue)] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
                  <Icon size={22} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-cyber-blue)] transition-colors duration-300 relative z-10" />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* === TERMINAL === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="w-full glass-card p-6 sm:p-8 max-w-3xl text-left mb-12 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-5">
            <Terminal size={16} className="text-[var(--color-cyber-blue)]" />
            <span className="text-sm font-mono text-[var(--color-text-muted)] tracking-wider">
              {hero.terminalFile}
            </span>
            <div className="flex gap-2 ml-auto">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
          </div>
          <div className="font-mono text-sm sm:text-base leading-relaxed break-words">
            <span className="text-[var(--color-neon-emerald)] mr-2">$</span>
            <TypeWriter
              text={profile.statement}
              speed={35}
              delay={1200}
              className="text-[var(--color-text-primary)]"
            />
          </div>
        </motion.div>

        {/* === STATUS BADGES === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Main Status */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--color-border-bright)] bg-[#060608]/50 backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-neon-emerald)] animate-pulse shadow-[0_0_8px_var(--color-neon-emerald)]" />
            <span className="text-xs sm:text-sm font-mono text-[var(--color-text-secondary)] tracking-widest uppercase">
              {hero.statusBadge}
            </span>
          </div>

          {/* Info Chips — now using GlowTag */}
          <div className="flex flex-wrap justify-center gap-3">
            {hero.chips.map((label) => (
              <GlowTag key={label} text={label} size="lg" />
            ))}
          </div>
        </motion.div>

        {/* === NAVIGATE HINT === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col items-center gap-2 mt-16 pb-8 text-[var(--color-text-muted)]"
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase">{hero.navigateHint}</span>
          <ArrowRight size={16} className="animate-bounce rotate-90" />
        </motion.div>

      </div>
    </section>
  );
}
