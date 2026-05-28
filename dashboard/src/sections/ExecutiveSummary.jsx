import { motion } from "framer-motion";
import { Terminal, ArrowRight, MapPin, BookOpen } from "lucide-react";
import TypeWriter from "../components/TypeWriter";
import { profile, siteConfig } from "../data/portfolioData";

/* Inline SVG brand icons */
const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const XIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

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

      {/* Content Container (Flex column) */}
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

        {/* === MIDDLE SECTION (Terminal) === */}
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

        {/* === BOTTOM SECTION (Status Badges) === */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Main Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[var(--color-border-bright)] bg-[#060608]/50 backdrop-blur-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-neon-emerald)] animate-pulse shadow-[0_0_8px_var(--color-neon-emerald)]" />
            <span className="text-xs sm:text-sm font-mono text-[var(--color-text-secondary)] tracking-widest uppercase">
              {hero.statusBadge}
            </span>
          </div>

          {/* Info Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {hero.chips.map((label) => (
              <span
                key={label}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-mono border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-cyber-blue)] hover:text-[var(--color-cyber-blue)] transition-all duration-300 cursor-default bg-[#060608]/30"
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* === FOOTER (Navigate Hint) === */}
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
