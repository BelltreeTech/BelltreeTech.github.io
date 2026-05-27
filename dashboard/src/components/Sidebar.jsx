import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  GitBranch,
  BookOpen,
  Cpu,
  Rocket,
} from "lucide-react";

/* Inline SVG brand icons (lucide-react doesn't ship brand icons) */
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

const navItems = [
  { id: "executive", label: "Executive Summary", icon: LayoutDashboard },
  { id: "projects", label: "Proof of Work", icon: FolderKanban },
  { id: "timeline", label: "Timeline", icon: GitBranch },
  { id: "domain", label: "Domain Expertise", icon: BookOpen },
  { id: "tech", label: "Tech Stack", icon: Cpu },
  { id: "roadmap", label: "Roadmap & CTA", icon: Rocket },
];

const socials = [
  { icon: GithubIcon, href: "https://github.com/BelltreeTech", label: "GitHub" },
  {
    icon: LinkedinIcon,
    href: "https://www.linkedin.com/in/shinri-suzuki-605475312/",
    label: "LinkedIn",
  },
  { icon: XIcon, href: "https://x.com/BelltreeTech82", label: "X" },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-[72px] hover:w-[240px] flex-col justify-between py-6 px-3 z-50 bg-[#060608]/97 backdrop-blur-xl border-r border-[var(--color-border)] transition-all duration-500 group overflow-hidden">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-10 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center flex-shrink-0">
            <span className="text-[#060608] font-bold text-sm">BT</span>
          </div>
          <span className="font-semibold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[var(--color-text-primary)]">
            BelltreeTech
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 cursor-pointer min-w-0 ${
                  isActive
                    ? "text-[var(--color-cyber-blue)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: "rgba(0, 229, 255, 0.08)",
                      border: "1px solid rgba(0, 229, 255, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className="relative z-10 flex-shrink-0" />
                <span className="relative z-10 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="flex flex-col gap-2 pt-4 border-t border-[var(--color-border)]">
          {socials.map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors min-w-0"
              >
                <Icon size={16} className="flex-shrink-0" />
                <span className="text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {s.label}
                </span>
              </a>
            );
          })}
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-[var(--color-border)]">
        <div className="flex justify-around items-center py-2 px-1">
          {navItems.map((item) => {
            const isActive = active === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isActive
                    ? "text-[var(--color-cyber-blue)]"
                    : "text-[var(--color-text-muted)]"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-active"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-[var(--color-cyber-blue)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} />
                <span className="text-[9px] font-medium tracking-wider">
                  {item.label.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
