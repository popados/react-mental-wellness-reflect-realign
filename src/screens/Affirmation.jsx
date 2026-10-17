import { useState } from "react";
import { AFFIRMATIONS } from "../data/affirmations";
import { COPING_SKILLS } from "../data/coping";
import { dayOfYear } from "../utils/dates";
import Squiggle from "../components/Squiggle";

function CopingDropdown({ group, open, onToggle, usage, onUse }) {
  return (
    <div className={`card coping-dropdown${open ? " open" : ""}`}>
      <div className="coping-dropdown-head" onClick={onToggle}>
        <h3>{group.title}</h3>
        <span className="chev">⌄</span>
      </div>
      <div className={`coping-dropdown-body${open ? " open" : ""}`}>
        <ul className="coping-list">
          {group.items.map((item) => {
            const used = usage.get(item.point) || 0;
            return (
              <li className="coping-item" key={item.point}>
                <div className="coping-text">
                  <div className="coping-point">{item.point}</div>
                  <div className="coping-blurb">{item.blurb}</div>
                  <div className="coping-actions">
                    <button
                      className="coping-use-btn"
                      onClick={() => onUse(item.point, group.title)}
                    >
                      I used this
                    </button>
                    {used > 0 && (
                      <span className="coping-used">
                        Used {used} {used === 1 ? "time" : "times"}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default function Affirmation({
  favorites,
  onToggleFavorite,
  onRemoveFavorite,
  resonance,
  onRevisit,
  copingLog,
  onLogCoping,
}) {
  const [text, setText] = useState(
    () => AFFIRMATIONS[dayOfYear(new Date()) % AFFIRMATIONS.length]
  );
  const [fading, setFading] = useState(false);
  const [openGroups, setOpenGroups] = useState(() => new Set());

  const saved = favorites.includes(text);

  function show(next) {
    setFading(true);
    setTimeout(() => {
      setText(next);
      setFading(false);
    }, 220);
  }

  function newAffirmation() {
    let next;
    do {
      next = AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)];
    } while (next === text && AFFIRMATIONS.length > 1);
    show(next);
  }

  function revisit(fav) {
    onRevisit(fav);
    show(fav);
    document.getElementById("screens")?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function toggleGroup(title) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }

  const usage = new Map();
  for (const l of copingLog) usage.set(l.skill, (usage.get(l.skill) || 0) + 1);

  // Most-revisited first; ties keep the newest save on top.
  const byResonance = favorites
    .map((fav, i) => ({ fav, i, count: resonance[fav] || 0 }))
    .sort((a, b) => b.count - a.count || b.i - a.i);
  const topCount = byResonance[0]?.count || 0;

  return (
    <section className="screen">
      <div className="eyebrow">Daily affirmation</div>
      <h1 className="title">Words for today</h1>
      <Squiggle />

      <div className="card affirm-card">
        <span className="mark">&ldquo;</span>
        <p className={`affirm-text${fading ? " fading" : ""}`}>{text}</p>
      </div>
      <div className="affirm-actions">
        <button className="btn btn-primary" onClick={newAffirmation}>
          New affirmation
        </button>
        <button
          className={`heart-btn${saved ? " saved" : ""}`}
          onClick={() => onToggleFavorite(text)}
          aria-label="Save affirmation"
        >
          <svg viewBox="0 0 24 24">
            <path d="M12 20s-7.5-4.7-10-9.4C.4 6.8 2.4 3.5 6 3.5c2.3 0 3.8 1.3 6 3.7 2.2-2.4 3.7-3.7 6-3.7 3.6 0 5.6 3.3 4 7.1C19.5 15.3 12 20 12 20z" />
          </svg>
        </button>
      </div>

      <div className="section-label">Saved · resonance</div>
      {favorites.length > 0 && (
        <p className="section-intro">
          Tap a saved affirmation to revisit it. The ones you come back to most
          rise to the top — a quiet signal of what you need to hear.
        </p>
      )}
      <div className="fav-list">
        {favorites.length === 0 ? (
          <div className="empty">
            Nothing saved yet — tap the heart on an affirmation you want to keep.
          </div>
        ) : (
          byResonance.map(({ fav, count }) => (
            <div className="fav-item" key={fav}>
              <button className="fav-revisit" onClick={() => revisit(fav)}>
                <p>{fav}</p>
                <span className="resonance">
                  <span className="resonance-track">
                    <span
                      className="resonance-fill"
                      style={{ width: topCount ? `${(count / topCount) * 100}%` : 0 }}
                    />
                  </span>
                  {count === 0
                    ? "Not revisited yet"
                    : `Revisited ${count} ${count === 1 ? "time" : "times"}`}
                </span>
              </button>
              <button
                className="x-btn"
                onClick={() => onRemoveFavorite(fav)}
                aria-label="Remove from saved"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      <div className="section-label">Coping skills</div>
      {COPING_SKILLS.map((group) => (
        <CopingDropdown
          key={group.title}
          group={group}
          open={openGroups.has(group.title)}
          onToggle={() => toggleGroup(group.title)}
          usage={usage}
          onUse={onLogCoping}
        />
      ))}
    </section>
  );
}
