import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// `primary` tabs live in the mobile/tablet bottom bar; the rest go behind
// "More". The desktop sidebar shows everything.
const TABS = [
  {
    id: "home",
    label: "Home",
    fullLabel: "Home",
    primary: true,
    icon: (
      <>
        <path d="M4 11.5 12 4l8 7.5" />
        <path d="M6 10v9h5v-6h2v6h5v-9" />
      </>
    ),
  },
  {
    id: "checks",
    label: "Body",
    fullLabel: "Body Awareness",
    primary: true,
    icon: (
      <>
        <circle cx="12" cy="4.8" r="2.3" />
        <path d="M12 8.5v6.5M6.5 10.5 12 9l5.5 1.5M9 21l3-6 3 6" />
      </>
    ),
  },
  {
    id: "habits",
    label: "Habits",
    fullLabel: "Habits",
    primary: true,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.3l2.3 2.3L16 9" />
      </>
    ),
  },
  {
    id: "emotions",
    label: "Emotions",
    fullLabel: "Emotions",
    primary: true,
    icon: (
      <>
        <path d="M12 20s-7.5-4.7-10-9.4C.4 6.8 2.4 3.5 6 3.5c2.3 0 3.8 1.3 6 3.7 2.2-2.4 3.7-3.7 6-3.7 3.6 0 5.6 3.3 4 7.1C19.5 15.3 12 20 12 20z" />
      </>
    ),
  },
  {
    id: "affirmation",
    label: "Affirm",
    fullLabel: "Affirmation",
    icon: (
      <>
        <circle cx="12" cy="12" r="4.3" />
        <path d="M12 2.5v3M12 18.5v3M4.5 4.5l2.1 2.1M17.4 17.4l2.1 2.1M2.5 12h3M18.5 12h3M4.5 19.5l2.1-2.1M17.4 6.6l2.1-2.1" />
      </>
    ),
  },
  {
    id: "grounding",
    label: "Ground",
    fullLabel: "Grounding",
    icon: (
      <>
        <circle cx="12" cy="12" r="2.6" />
        <circle cx="12" cy="12" r="6" opacity="0.65" />
        <circle cx="12" cy="12" r="9.4" opacity="0.4" />
      </>
    ),
  },
  {
    id: "events",
    label: "Events",
    fullLabel: "Events & Behaviors",
    icon: (
      <>
        <path d="M1 4v6h6" />
        <path d="M23 20v-6h-6" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </>
    ),
  },
  {
    id: "digest",
    label: "Digest",
    fullLabel: "Weekly Digest",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4M8 14h3M8 17h6" />
      </>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    fullLabel: "Insights",
    icon: (
      <>
        <path d="M4 20h16" />
        <path d="M7 16v-4M12 16V7M17 16v-6" />
      </>
    ),
  },
];

const SECONDARY = TABS.filter((t) => !t.primary);

function MoreSheet({ current, onNavigate, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="modal-overlay sheet-overlay" onClick={onClose}>
      <div
        className="more-sheet"
        role="dialog"
        aria-label="More screens"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="more-sheet-head">
          <span>More</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        {SECONDARY.map((t) => (
          <button
            key={t.id}
            className={`more-item${current === t.id ? " active" : ""}`}
            onClick={() => {
              onNavigate(t.id);
              onClose();
            }}
          >
            <svg viewBox="0 0 24 24">{t.icon}</svg>
            <span>{t.fullLabel}</span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}

export default function TabBar({ current, onNavigate }) {
  const [expanded, setExpanded] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const onSecondary = SECONDARY.some((t) => t.id === current);

  return (
    <nav className={`tabbar${expanded ? " expanded" : ""}`}>
      <div className="sidebar-brand" aria-label="Reflect & Realign">
        <span className="brand-dot" />
        <span className="brand-full">
          <span className="brand-script">
            Reflect
            <br />
            &amp; Realign
          </span>
          <span className="brand-rule" />
          <span className="brand-tag">Mental Wellness</span>
        </span>
        <span className="brand-mono">R&amp;R</span>
      </div>
      <div className="sidebar-menubar">
        <span className="menubar-label">Menu</span>
        <button
          className="sidebar-toggle"
          onClick={() => setExpanded((e) => !e)}
          aria-label={expanded ? "Collapse menu" : "Expand menu"}
          aria-expanded={expanded}
        >
          <svg viewBox="0 0 24 24">
            {expanded ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <div className="tabbar-inner">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`tab${t.primary ? "" : " secondary"}${current === t.id ? " active" : ""}`}
            onClick={() => onNavigate(t.id)}
          >
            <svg viewBox="0 0 24 24">{t.icon}</svg>
            <span className="tab-label-short">{t.label}</span>
            <span className="tab-label-full">{t.fullLabel}</span>
          </button>
        ))}
        <button
          className={`tab tab-more${onSecondary ? " active" : ""}`}
          onClick={() => setMoreOpen(true)}
          aria-haspopup="dialog"
        >
          <svg viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="1.4" />
            <circle cx="12" cy="12" r="1.4" />
            <circle cx="19" cy="12" r="1.4" />
          </svg>
          <span className="tab-label-short">More</span>
        </button>
      </div>
      {moreOpen && (
        <MoreSheet
          current={current}
          onNavigate={onNavigate}
          onClose={() => setMoreOpen(false)}
        />
      )}
    </nav>
  );
}
