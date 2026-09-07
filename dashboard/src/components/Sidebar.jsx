import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile, contact } from "../data/portfolioData";

const navigation = [
  { id: "profile", label: "プロフィール", en: "Profile" },
  { id: "research", label: "研究・制作", en: "Research & Projects" },
  { id: "internships", label: "インターン", en: "Experience" },
  { id: "achievements", label: "大会・受賞等", en: "Achievements" },
  { id: "approach", label: "考え方・技術", en: "Approach & Skills" },
  { id: "contact", label: "連絡先", en: "Contact" },
];

export default function Sidebar({ active }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  const header = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height}px`,
      );
    });
    observer.observe(header.current);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--header-height");
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    // CSS owns layout. This subscription only clears the mobile disclosure state.
    const desktop = window.matchMedia("(min-width: 960px)");
    const closeDesktopMenu = (event) => {
      if (!event.matches) return;
      setOpen(false);
      document
        .getElementById(active)
        ?.querySelector("h1, h2")
        ?.focus({ preventScroll: true });
    };
    const closeOutsideMenu = (event) => {
      if (!header.current.contains(event.target)) setOpen(false);
    };
    desktop.addEventListener("change", closeDesktopMenu);
    document.addEventListener("pointerdown", closeOutsideMenu);
    return () => {
      desktop.removeEventListener("change", closeDesktopMenu);
      document.removeEventListener("pointerdown", closeOutsideMenu);
    };
  }, [open, active]);

  function closeOnEscape(event) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      menuButton.current.focus();
    }
  }

  return (
    <header
      className="site-header"
      ref={header}
      onKeyDown={closeOnEscape}
      onBlur={(event) => {
        // WebKit reports null before a pointer-activated link's click fires.
        // Outside pointer activation is handled separately without hiding that link.
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <a
        className="wordmark"
        href="#profile"
        onClick={() => setOpen(false)}
        aria-label="鈴木真理 プロフィール"
      >
        <span className="brand-mark" aria-hidden="true">
          s.
        </span>
        <span>
          {profile.nameEn}
          <small>{profile.role}</small>
        </span>
      </a>
      <button
        className="menu-toggle"
        ref={menuButton}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={(event) => {
          // WebKit does not focus buttons on pointer activation by default.
          event.currentTarget.focus({ preventScroll: true });
          setOpen(!open);
        }}
      >
        {open ? (
          <X size={20} aria-hidden="true" />
        ) : (
          <Menu size={20} aria-hidden="true" />
        )}
        <span>メニュー</span>
      </button>
      <nav
        className={`primary-navigation${open ? " is-open" : ""}`}
        id="primary-navigation"
        aria-label="主要ナビゲーション"
      >
        <span className="nav-caption">INDEX</span>
        {navigation.map((item, index) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active === item.id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            <span className="nav-number" aria-hidden="true">
              0{index + 1}
            </span>
            <span>
              {item.label}
              <small>{item.en}</small>
            </span>
            <span className="nav-indicator" aria-hidden="true" />
          </a>
        ))}
      </nav>
      <div className="sidebar-footer">
        <p>
          情報科学から、
          <br />
          人と社会へ。
        </p>
        <a href={`mailto:${contact.email}`} className="sidebar-contact">
          メールで連絡する <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <small>SHINRI SUZUKI © 2026</small>
      </div>
    </header>
  );
}
