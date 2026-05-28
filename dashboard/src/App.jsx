import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BottomDock from "./components/Sidebar";
import ExecutiveSummary from "./sections/ExecutiveSummary";
import ProofOfWork from "./sections/ProofOfWork";
import TimelineArbitrage from "./sections/TimelineArbitrage";
import Validations from "./sections/Validations";
import DomainExpertise from "./sections/DomainExpertise";
import TechStackSpec from "./sections/TechStackSpec";
import ResourceRequest from "./sections/ResourceRequest";
import { siteConfig } from "./data/portfolioData";

const sections = {
  executive: ExecutiveSummary,
  projects: ProofOfWork,
  timeline: TimelineArbitrage,
  validations: Validations,
  domain: DomainExpertise,
  tech: TechStackSpec,
  roadmap: ResourceRequest,
};

const pageVariants = {
  initial: { opacity: 0, y: 20, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
};

export default function App() {
  const [active, setActive] = useState("executive");
  const ActiveSection = sections[active];

  useEffect(() => {
    document.title = siteConfig.meta.title;
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Main Content — centered, removed pb-48 in favor of physical spacer */}
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <ActiveSection />
            </motion.div>
          </AnimatePresence>

          {/* 👇 物理的な透明スペーサー。これで絶対にボトムドックと被らない 👇 */}
          <div className="h-20 w-full pointer-events-none flex-shrink-0" aria-hidden="true" />

        </div>
      </main>

      {/* Bottom Dock Navigation */}
      <BottomDock active={active} onNavigate={setActive} />
    </div>
  );
}