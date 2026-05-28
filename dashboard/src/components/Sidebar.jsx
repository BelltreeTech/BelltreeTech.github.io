import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  GitBranch,
  Award,
  BookOpen,
  Cpu,
  Rocket,
} from "lucide-react";
import { siteConfig } from "../data/portfolioData";

const iconMap = {
  executive: LayoutDashboard,
  projects: FolderKanban,
  timeline: GitBranch,
  validations: Award,
  domain: BookOpen,
  tech: Cpu,
  roadmap: Rocket,
};

export default function BottomDock({ active, onNavigate }) {
  return (
    <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-3 sm:px-4 md:px-5 py-2.5 md:py-3 rounded-2xl bg-[#060608]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_80px_rgba(0,229,255,0.04)]">
      <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
        {siteConfig.nav.map((item) => {
          const isActive = active === item.id;
          const Icon = iconMap[item.id];
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center gap-1 px-3.5 sm:px-5 md:px-6 py-2.5 md:py-3 rounded-xl transition-colors duration-300 cursor-pointer group ${
                isActive
                  ? "text-[var(--color-cyber-blue)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]"
              }`}
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-xl bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.15)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Active glow dot */}
              {isActive && (
                <motion.div
                  layoutId="dock-glow"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-cyber-blue)] shadow-[0_0_8px_rgba(0,229,255,0.7)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <Icon
                className={`relative z-10 w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
              />
              <span className="relative z-10 text-[10px] sm:text-[11px] md:text-xs font-medium tracking-wider leading-none">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
