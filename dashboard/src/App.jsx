import { useEffect, useState } from "react";
import SiteHeader from "./components/SiteHeader";
import {
  Profile,
  Research,
  Internships,
  Achievements,
  Approach,
  Contact,
} from "./sections/PortfolioSections";

const sectionIds = [
  "profile",
  "research",
  "internships",
  "achievements",
  "approach",
  "contact",
];

export default function App() {
  const [active, setActive] = useState("profile");

  useEffect(() => {
    let focusFrame;
    const focusHash = () => {
      let id;
      try {
        id = decodeURIComponent(window.location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      if (target instanceof HTMLDetailsElement) target.open = true;
      const section = target.closest("section[id]");
      if (sectionIds.includes(section?.id)) setActive(section.id);
      cancelAnimationFrame(focusFrame);
      focusFrame = requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
        const focusTarget =
          target.querySelector("h1, h2, h3, h4, summary") || target;
        if (
          !focusTarget.matches(
            "a, button, input, select, textarea, summary, [tabindex]",
          )
        )
          focusTarget.tabIndex = -1;
        focusTarget.focus({ preventScroll: true });
      });
    };
    // A repeated anchor does not emit hashchange; it must still restore focus.
    const focusCurrentLink = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !link
      )
        return;
      if (link.hash === window.location.hash) {
        event.preventDefault();
        focusHash();
      }
    };
    focusHash();
    window.addEventListener("hashchange", focusHash);
    document.addEventListener("click", focusCurrentLink);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-12% 0px -70% 0px" },
    );
    sectionIds.forEach((id) => observer.observe(document.getElementById(id)));
    return () => {
      window.removeEventListener("hashchange", focusHash);
      document.removeEventListener("click", focusCurrentLink);
      cancelAnimationFrame(focusFrame);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        本文へ移動
      </a>
      <div className="portfolio-shell">
        <SiteHeader active={active} />
        <main id="main-content" tabIndex={-1}>
          <Profile />
          <Research />
          <Internships />
          <Achievements />
          <Approach />
          <Contact />
        </main>
      </div>
    </>
  );
}
